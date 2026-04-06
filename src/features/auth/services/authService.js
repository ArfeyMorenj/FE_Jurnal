import apiClient from "../../../lib/axios";
import { Toasts } from "../../../utils/Toast";

const STORAGE_KEYS = {
  token: "token",
  user: "user",
  rememberedEmail: "remembered_email",
  rememberedCredentials: "remembered_credentials",
};

const readFromStorages = (key) => {
  // Semua session selalu di localStorage
  return localStorage.getItem(key);
};

const getActiveSessionStorage = () => {
  if (typeof window === "undefined") return null;
  // Semua session selalu di localStorage
  if (localStorage.getItem(STORAGE_KEYS.token) || localStorage.getItem(STORAGE_KEYS.user)) {
    return localStorage;
  }
  return null;
};

const writeSessionData = (payload, targetStorage) => {
  if (!payload || typeof window === "undefined") return;
  const storage = targetStorage || getActiveSessionStorage();
  if (!storage) return;

  if (payload.token) {
    storage.setItem(STORAGE_KEYS.token, payload.token);
  }
  storage.setItem(STORAGE_KEYS.user, JSON.stringify(payload));
};

export const login = async ({ email, password, loginType = "admin" }) => {
  const endpoint = loginType === "school" ? "/auth/login-school" : "/auth/login";
  const response = await apiClient.post(endpoint, { email, password });
  return response.data;
};

const persistSession = (payload, remember) => {
  if (!payload?.token) return;

  // Semua session selalu disimpan di localStorage (tidak ada sessionStorage)
  localStorage.setItem(STORAGE_KEYS.token, payload.token);
  localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(payload));

  // Hapus dari sessionStorage jika ada (untuk cleanup)
  sessionStorage.removeItem(STORAGE_KEYS.token);
  sessionStorage.removeItem(STORAGE_KEYS.user);
};

export const clearSession = () => {
  // Semua session di localStorage, hapus dari localStorage dan sessionStorage (untuk cleanup)
  localStorage.removeItem(STORAGE_KEYS.token);
  localStorage.removeItem(STORAGE_KEYS.user);
  sessionStorage.removeItem(STORAGE_KEYS.token);
  sessionStorage.removeItem(STORAGE_KEYS.user);
};

export const saveRememberedEmail = (email) => {
  if (typeof window === "undefined" || !email) return;
  localStorage.setItem(STORAGE_KEYS.rememberedEmail, email);
};

export const getRememberedEmail = () => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(STORAGE_KEYS.rememberedEmail) || null;
};

export const clearRememberedEmail = () => {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEYS.rememberedEmail);
};

export const saveRememberedCredentials = (email, password) => {
  if (typeof window === "undefined" || !email || !password) return;
  const credentials = { email, password };
  localStorage.setItem(STORAGE_KEYS.rememberedCredentials, JSON.stringify(credentials));
  // Tetap simpan email untuk backward compatibility
  saveRememberedEmail(email);
};

export const getRememberedCredentials = () => {
  if (typeof window === "undefined") return null;
  const stored = localStorage.getItem(STORAGE_KEYS.rememberedCredentials);
  if (!stored) return null;
  
  try {
    return JSON.parse(stored);
  } catch (error) {
    console.error("Failed to parse remembered credentials", error);
    return null;
  }
};

export const clearRememberedCredentials = () => {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEYS.rememberedCredentials);
  clearRememberedEmail();
};

export const getStoredUser = () => {
  const raw = readFromStorages(STORAGE_KEYS.user);
  if (!raw) return null;

  try {
    return JSON.parse(raw);
  } catch (error) {
    console.error("Failed to parse stored user", error);
    clearSession();
    return null;
  }
};

//  untuk ambil role dari response
export const extractUserRole = (data) => {
  if (data?.profile?.user?.role) {
    return data.profile.user.role;
  }
  
  if (data?.roles && data.roles.length > 0) {
    return data.roles[0].name;
  }
  
  return null;
};

export const getCurrentUser = async () => {
  return getStoredUser();
};

/**
 * Update session user data (e.g., after profile update)
 * @param {Object} updatedProfile - Updated profile data
 */
export const updateSessionUser = (updatedProfile) => {
  if (!updatedProfile || typeof window === "undefined") return;

  const storage = getActiveSessionStorage();
  if (!storage) return;

  const currentUser = getStoredUser();
  if (!currentUser) return;

  // Update profile data in user object
  const updatedUser = {
    ...currentUser,
    profile: {
      ...currentUser.profile,
      ...updatedProfile,
    },
  };

  // Save updated user to storage
  storage.setItem(STORAGE_KEYS.user, JSON.stringify(updatedUser));

  // Trigger storage event to notify subscribers
  // Note: storage event only fires in other tabs/windows, so we'll dispatch a custom event
  window.dispatchEvent(new Event("storage"));
  
  // Also manually trigger the update for same-tab listeners
  // We'll use a custom event for this
  window.dispatchEvent(new CustomEvent("sessionUserUpdated", { detail: updatedUser }));
};

export const subscribeToSessionUser = (callback) => {
  if (typeof window === "undefined" || typeof callback !== "function") {
    return () => {};
  }

  let isActive = true;

  const emit = (user) => {
    if (isActive) {
      callback(user);
    }
  };

  emit(getStoredUser());

  getCurrentUser()
    .then((user) => emit(user))
    .catch((error) => console.error("Failed to initialize session user:", error));

  const handleStorage = () => emit(getStoredUser());
  const handleSessionUpdate = (event) => {
    // Handle custom event for same-tab updates
    if (event.detail) {
      emit(event.detail);
    } else {
      emit(getStoredUser());
    }
  };

  window.addEventListener("storage", handleStorage);
  window.addEventListener("sessionUserUpdated", handleSessionUpdate);

  return () => {
    isActive = false;
    window.removeEventListener("storage", handleStorage);
    window.removeEventListener("sessionUserUpdated", handleSessionUpdate);
  };
};

const extractErrorMessage = (error) => {
  return (
    error?.response?.data?.meta?.message ||
    error?.response?.data?.message ||
    error?.message ||
    "Terjadi kesalahan saat masuk. Silakan coba lagi."
  );
};

export const handleLoginFlow = async ({ credentials, remember, redirectPath, navigate, loginType = "admin" }) => {
  try {
    const { data, meta } = await login({ ...credentials, loginType });
    persistSession(data, remember);

    // Simpan email dan password jika "Ingat Saya" dicentang
    if (remember && credentials.email && credentials.password) {
      saveRememberedCredentials(credentials.email, credentials.password);
    } else {
      // Hapus credentials yang tersimpan jika "Ingat Saya" tidak dicentang
      clearRememberedCredentials();
    }

    const welcomeName = data?.profile?.name;
    
    // ambil role untuk redirect logic
    const userRole = extractUserRole(data);

    Toasts(
      "success",
      3000,
      meta?.message || "Login berhasil",
      welcomeName ? `Selamat datang, ${welcomeName}!` : undefined
    );

    // redirect berdasarkan role
    let finalRedirectPath = redirectPath;
    
    if (userRole === "school") {
      finalRedirectPath = "/sekolah/dashboard";
    } else if (userRole === "admin") {
      finalRedirectPath = "/admin/dashboard";
    }

    navigate(finalRedirectPath, { replace: true });

    return { success: true, data, meta, role: userRole };
  } catch (error) {
    const message = extractErrorMessage(error);
    Toasts("error", 4000, "Login gagal", message);
    return { success: false, message };
  }
};

export const logout = async ({ remember } = {}) => {
  // Default behavior: jika ada remembered credentials, keep them kecuali diminta wipe
  const hasRemembered = !!getRememberedCredentials();
  const keepRemembered = remember === true || (remember === undefined && hasRemembered);

  try {
    const response = await apiClient.post("/auth/logout");
    const message = response?.data?.meta?.message || response?.data?.message || "Logout berhasil";

    // Hapus sesuai opsi remember
    clearSession();
    if (!keepRemembered) {
      clearRememberedCredentials();
    }

    Toasts("success", 3000, "Sesi berakhir", message);

    return { success: true, message };
  } catch (error) {
    const status = error?.response?.status;
    const isUnauthorized = status === 401;
    const message = extractErrorMessage(error);

    // Tetap hapus sesuai opsi meskipun error
    clearSession();
    if (!keepRemembered) {
      clearRememberedCredentials();
    }

    Toasts(
      isUnauthorized ? "success" : "error",
      3000,
      isUnauthorized ? "Sesi berakhir" : "Logout gagal",
      isUnauthorized ? "Sesi kamu sudah tidak aktif. Silakan login kembali." : message
    );
    return { success: isUnauthorized ? true : false, message };
  }
};

export default {
  login,
  handleLoginFlow,
  logout,
  getStoredUser,
  getCurrentUser,
  subscribeToSessionUser,
  updateSessionUser,
  clearSession,
  saveRememberedEmail,
  getRememberedEmail,
  clearRememberedEmail,
  extractUserRole,
  saveRememberedCredentials,
  getRememberedCredentials,
  clearRememberedCredentials,
};


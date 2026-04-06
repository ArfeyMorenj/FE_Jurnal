// Helper function untuk mendapatkan nilai dari env dengan fallback
const getEnvOrDefault = (envKey, defaultValue) => {
  const envValue = import.meta.env?.[envKey];
  return envValue && envValue.trim() !== "" ? envValue.trim() : defaultValue;
};

// Section IDs - bisa dioverride via environment variables
export const SECTION_IDS = {
  LANDING_PAGE: getEnvOrDefault(
    "VITE_SECTION_ID_LANDING_PAGE",
    "a0a183e2-0d9e-4808-ac2d-ac98c4be289e"
  ),
  JURNAL_MENGAJAR: getEnvOrDefault(
    "VITE_SECTION_ID_JURNAL_MENGAJAR",
    "a06e1872-e2af-429f-90d8-974c79a967bf"
  ),
  JURNAL_SISWA: getEnvOrDefault(
    "VITE_SECTION_ID_JURNAL_SISWA",
    "a06e65ec-d6b0-4945-bca4-943b4ab489b3"
  ),
  APPLICATION: getEnvOrDefault(
    "VITE_SECTION_ID_APPLICATION",
    "a0a183e2-0f43-4896-be54-04b42d27d023"
  ),
  TENTANG_KAMI: getEnvOrDefault(
    "VITE_SECTION_ID_TENTANG_KAMI",
    "a0a183e2-1266-4143-9beb-4f2575640cc2"
  ),
  BERITA: getEnvOrDefault(
    "VITE_SECTION_ID_BERITA",
    "a0a183e2-10b0-4cb6-9efb-6223a709b41b"
  ),
  FAQ: getEnvOrDefault(
    "VITE_SECTION_ID_FAQ",
    "a07c1027-4204-4d76-ba59-3aba3be74659"
  ),
};

// Banner IDs - bisa dioverride via environment variables
export const BANNER_IDS = {
  LIST_APPS: getEnvOrDefault(
    "VITE_BANNER_ID_LIST_APPS",
    "a0839a9a-9970-4b5b-bf2e-a08787ef6c8f"
  ),
};
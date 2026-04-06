import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import InputField from "../../../components/common/InputField";
import { highlightMiJurnal } from "../../../utils/highlightMiJurnal";
import Button from "../../../components/common/Button";
import { handleLoginFlow, getRememberedCredentials, getStoredUser, extractUserRole } from "../services/authService";
import { loginSchema } from "../schema/loginSchema";

export default function LoginPage() {
  const rememberedCredentials = getRememberedCredentials();
  
  const [loginType, setLoginType] = useState("admin"); // "admin" atau "school"
  
  const [formData, setFormData] = useState({
    email: rememberedCredentials?.email || "",
    password: rememberedCredentials?.password || "",
  });

  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [remember, setRemember] = useState(!!rememberedCredentials);
  const [isLoading, setIsLoading] = useState(false);
  const [touched, setTouched] = useState({}); 
  
  const navigate = useNavigate();
  const location = useLocation();
  const redirectPath = location.state?.from || "/admin/dashboard";

  // Auto-redirect jika user sudah login
  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = getStoredUser();
    
    if (token && user) {
      const userRole = extractUserRole(user);
      
      // Redirect ke dashboard sesuai role
      if (userRole === "school") {
        navigate("/sekolah/dashboard", { replace: true });
      } else if (userRole === "admin") {
        navigate("/admin/dashboard", { replace: true });
      }
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    if (errors[name] && value.trim()) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
    
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    
    const fieldData = { [name]: formData[name] };
    const fieldSchema = loginSchema.pick({ [name]: true });
    const validation = fieldSchema.safeParse(fieldData);
    
    if (!validation.success) {
      const fieldError = validation.error.errors[0]?.message;
      if (fieldError) {
        setErrors((prev) => ({ ...prev, [name]: fieldError }));
      }
    } else {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setErrorMessage("");
    setErrors({});

    const validation = loginSchema.safeParse(formData);
    
    if (!validation.success) {
      const fieldErrors = {};
      
      validation.error.issues.forEach((issue) => {
        const fieldName = issue.path[0];
        if (fieldName) {
          fieldErrors[fieldName] = issue.message;
        }
      });
      
      setErrors(fieldErrors);
      return;
    }

    setIsLoading(true);

    const result = await handleLoginFlow({
      credentials: formData,
      remember,
      redirectPath,
      navigate,
      loginType, 
    });

    if (!result.success) {
      setErrorMessage(result.message);
    }

    setIsLoading(false);
  };

  return (
    <div className="relative md:h-screen bg-white px-6 md:px-12 py-10 flex flex-col items-center justify-center">
      <div className="absolute top-8 left-6 md:left-12">
        <img src="/images/logo.png" alt="Logo" className="w-[180px] h-full object-contain" />
      </div>

      <div className="w-full max-w-6xl flex flex-col md:flex-row items-center justify-between gap-10">
        <div className="w-full md:w-1/2 max-w-2xl">
          {errorMessage ? (
            <div className="my-16 md:my-10 rounded-2xl border border-red-200 bg-red-50 px-6 py-5 text-[#B42318] shadow-sm">
              <h2 className="text-[22px] md:text-[24px] font-semibold leading-snug tracking-[0.1em] mb-2">
                <span className="text-primary-orange">Oops!</span> Terjadi{" "}
                <span className="text-primary-red">kesalahan</span> saat login.
              </h2>
              <p className="text-sm md:text-base tracking-wide">{errorMessage}</p>
            </div>
          ) : (
            <h2 className="text-[22px] md:text-[28px] text-[#444B59] font-semibold my-16 md:my-10 leading-snug tracking-[0.1em]">
              {highlightMiJurnal("Mari mulai perjalanan produktif bersama MiJurnal")}
            </h2>
          )}

          <div className="flex gap-2 mb-6">
            <button
              type="button"
              onClick={() => setLoginType("admin")}
              className={`flex-1 py-3 px-4 rounded-lg font-semibold tracking-[0.1em] transition-all ${
                loginType === "admin"
                  ? "bg-gradient-to-r from-primary-orange to-primary-red text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              Admin
            </button>
            <button
              type="button"
              onClick={() => setLoginType("school")}
              className={`flex-1 py-3 px-4 rounded-lg font-semibold tracking-[0.1em] transition-all ${
                loginType === "school"
                  ? "bg-gradient-to-r from-primary-orange to-primary-red text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              Sekolah
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <InputField
              label="Email"
              type="email"
              name="email"
              placeholder="Masukkan email Anda"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              styleLabel='text-[16px] text-[#444B59] tracking-[0.1em]'
              styleInput='px-4 py-2'
              error={errors.email}
              required
            />

            <InputField
              label="Password"
              type="password"
              name="password"
              placeholder="Masukkan password Anda"
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
              styleLabel='text-[16px] text-[#444B59] tracking-[0.1em]'
              styleInput='px-4 py-2'
              styleButton='top-3 right-4'
              error={errors.password}
              required
            />

            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="peer hidden"
              />
              <div className="w-5 h-5 rounded-full border-2 border-primary-orange flex items-center justify-center my-6">
                <div
                  className={`w-3 h-3 rounded-full bg-primary-orange transition-opacity ${
                    remember ? "opacity-100" : "opacity-0"
                  }`}
                />
              </div>
              <span className="text-[#444B59] text-sm md:text-base tracking-[0.1em]">Ingat Saya</span>
            </label>

            <Button
              type="submit"
              loading={isLoading}
              loadingText="Memproses..."
              disabled={isLoading}
              fullWidth
              className="md:text-base font-extrabold rounded-full bg-gradient-to-r from-primary-orange to-primary-red text-white hover:opacity-90 transition tracking-[0.1em]"
            >
              LOGIN
            </Button>
          </form>
        </div>

        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src="/images/bro.png"
            alt="Login illustration"
            className="max-w-xl w-[400px] h-auto"
          />
        </div>
      </div>
    </div>
  );
}
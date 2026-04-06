import { useNavigate } from "react-router-dom";
import { getStoredUser, extractUserRole } from "../../features/auth/services/authService";
import Button from "./Button";

const LoginButton = ({ className, children = "Masuk", ...rest }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    // Cek jika user sudah login
    const token = localStorage.getItem("token");
    const user = getStoredUser();
    
    if (token && user) {
      const userRole = extractUserRole(user);
      
      // Redirect ke dashboard sesuai role
      if (userRole === "school") {
        navigate("/sekolah/dashboard", { replace: true });
      } else if (userRole === "admin") {
        navigate("/admin/dashboard", { replace: true });
      } else {
        // Jika role tidak diketahui, tetap ke halaman login
        navigate("/login");
      }
    } else {
      // Jika belum login, redirect ke halaman login
      navigate("/login");
    }
  };

  return (
    <Button
      onClick={handleClick}
      className={className}
      {...rest}
    >
      {children}
    </Button>
  );
};

export default LoginButton;


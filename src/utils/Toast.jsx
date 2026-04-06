import { createRoot } from "react-dom/client";
import ToastCustom from "../components/modals/ToastCustom";

// Route yang buat nampilin toast
const TOAST_ALLOWED_ROUTES = [
  '/admin',
  '/sekolah',
  '/kontak',
  '/contact', 
];

const isToastAllowed = () => {
  const path = window.location.pathname;
  
  return TOAST_ALLOWED_ROUTES.some(route => path.startsWith(route));
};

export const Toasts = (type = "success", duration = 3000, title, description) => {
  if (!isToastAllowed()) {
    if (type === 'error' || type === 'warning') {
      console.error(`[Silent] ${title}: ${description}`);
      return;
    }
  }

  let container = document.getElementById("toast-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "toast-container";
    document.body.appendChild(container);
  }

  const div = document.createElement("div");
  container.appendChild(div);

  const root = createRoot(div);

  const removeToast = () => {
    root.unmount();
    container.removeChild(div);
  };

  root.render(
    <ToastCustom
      type={type}
      title={title}
      description={description}
      duration={duration}
      onClose={removeToast}
      position="top-right"
    />
  );
};
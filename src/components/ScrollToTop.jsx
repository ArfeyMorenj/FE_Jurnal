import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { animate } from "framer-motion";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    animate(window.scrollY, 0, {
      duration: 0.5,
      ease: "easeOut",
      onUpdate: (latest) => window.scrollTo(0, latest),
    });
  }, [pathname]);

  return null;
}
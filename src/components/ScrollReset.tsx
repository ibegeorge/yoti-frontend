import { useEffect } from "react";
import { useLocation } from "react-router-dom";
export function ScrollReset() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    document.getElementById("main")?.focus();
  }, [pathname]);
  return null;
}

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

//information taken from the official documentation https://v5.reactrouter.com/web/guides/scroll-restoration
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
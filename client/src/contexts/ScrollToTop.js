import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop({ children }) {
  const { path } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: "0",
      behavior: "smooth",
    });
    // eslint-disable-next-line
  }, [path, []]);

  return <>{children}</>;
}

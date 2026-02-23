import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted">
      {/* Logo */}
      <a href="/" className="mb-10 flex items-center gap-2.5 group">
        <img
          src="/app_icon.png"
          alt="GupShupGo logo"
          className="h-10 w-10 rounded-xl shadow-md transition-transform duration-300 group-hover:scale-110"
        />
        <span className="text-2xl font-bold tracking-tight text-foreground">GupShupGo</span>
      </a>

      <div className="text-center">
        <h1 className="mb-4 text-6xl font-bold text-foreground">404</h1>
        <p className="mb-6 text-xl text-muted-foreground">Oops! Page not found</p>
        <a
          href="/"
          className="inline-block rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow transition-opacity hover:opacity-90"
        >
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;

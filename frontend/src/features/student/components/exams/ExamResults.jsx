import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LoginForm from "./LoginForm";

export default function LoginPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const userType = searchParams.get("type");

  useEffect(() => {
    if (!userType) {
      navigate("/");
    }
  }, [userType, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-secondary/5 to-primary/5">
      <div className="max-w-md w-full space-y-8 p-8 bg-card rounded-xl shadow-lg border">
        <div className="text-center">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-01-19%20at%201.45.07%20PM-jUKot8NDAX8QZ3lN1DoHbpVWmcwghI.jpeg"
            alt="LearnSphere Logo"
            width={128}
            height={128}
            className="mx-auto rounded-full"
          />
          <h2 className="mt-6 text-3xl font-extrabold">LearnSphere</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Sign in as {userType ? userType.charAt(0).toUpperCase() + userType.slice(1) : "User"}
          </p>
        </div>
        <LoginForm userType={userType} />
      </div>
    </div>
  );
}

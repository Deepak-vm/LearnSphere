import { useSearchParams, useNavigate, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import LoginForm from './LoginForm';
import logo from "@/assets/images/learnsphere-logo.png";

export default function LoginPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const userType = searchParams.get('type');

  useEffect(() => {
    if (!userType) {
      navigate('/');
    }
  }, [userType, navigate]);

  if (!userType) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="max-w-md w-full space-y-8 p-8 bg-gray-900 rounded-xl shadow-lg border border-gray-700">
        <div className="text-center">
          <img
            src={logo}
            alt="LearnSphere Logo"
            width={128}
            height={128}
            className="mx-auto rounded-full"
          />
          <h2 className="mt-6 text-3xl font-extrabold text-white">LearnSphere</h2>
          <p className="mt-2 text-sm text-gray-400">
            Sign in as {userType.charAt(0).toUpperCase() + userType.slice(1)}
          </p>
        </div>
        <LoginForm userType={userType} />
      </div>
    </div>
  );
}

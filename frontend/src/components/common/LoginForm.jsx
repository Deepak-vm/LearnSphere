import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AlertCircle } from "lucide-react";

export default function LoginForm({ userType }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validCredentials = {
    student: [
      { email: "riyansh@learnsphere.edu", password: "student123" },
      { email: "deepak@learnsphere.edu", password: "student123" },
      { email: "nikhil@learnsphere.edu", password: "student123" }
    ],
    teacher: [
      { email: "amitsinhal@learnsphere.edu", password: "teacher123" },
    ],
    admin: [
      { email: "admin@learnsphere.edu", password: "admin123" }
    ]
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const foundUser = validCredentials[userType]?.find(
      user => user.email === email && user.password === password
    );

    if (foundUser) {
      switch (userType) {
        case "admin":
          // Redirect to external URL (same tab)
          window.location.href = "https://kzmg8c4p39jbpnov2hbn.lite.vusercontent.net/admin/dashboard";
          break;
        case "teacher":
          navigate("/teacher/dashboard");
          break;
        default:
          navigate("/student/dashboard");
      }
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium">Email address</label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="password" className="block text-sm font-medium">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <input
            id="remember-me"
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="h-4 w-4"
          />
          <label htmlFor="remember-me" className="text-sm font-medium">
            Remember me
          </label>
        </div>
        <Link to="/forgot-password" className="text-sm font-medium text-blue-600 hover:text-blue-500">
          Forgot password?
        </Link>
      </div>
      {error && (
        <div className="flex items-center space-x-2 text-red-600">
          <AlertCircle size={20} />
          <span className="text-sm">{error}</span>
        </div>
      )}
      <button type="submit" className="w-full py-2 px-4 bg-white text-black rounded-md">
        Sign in
      </button>
      <div className="text-center">
        <Link to="/" className="text-sm font-medium text-white hover:text-blue-500">
          Back to Profile Selection
        </Link>
      </div>
    </form>
  );
}

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/Login";
import Dashboard from "./features/student/pages/Dashboard";
import HomePage from "./features/student/pages/HomePage";
import TeacherDashboard from "../src/features/teacher/pages/TeacherDashboard";
import AdminDashboard from "./features/admin/pages/AdminDashboard";
import ProfileSelectionPage from './pages/ProfileSelectionPage';
import FeePayment from './features/student/pages/FeePage';

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Home/Profile Selection */}
        <Route path="/" element={<ProfileSelectionPage />} />
        
        {/* Login Routes */}
        <Route path="/login" element={<LoginPage />} />
        
        {/* Student Dashboard Routes */}
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<HomePage />} />
          <Route path="fees" element={<FeePayment />} />
          
          {/* Add additional student routes here */}
        </Route>
        
        {/* Teacher and Admin Routes */}
        <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        
        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}
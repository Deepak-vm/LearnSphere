import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/Login";
import Dashboard from "./features/student/pages/Dashboard";
import HomePage from "./features/student/pages/HomePage";
import TeacherDashboard from "../src/features/teacher/pages/TeacherDashboard";
import AdminDashboard from "./features/admin/pages/AdminDashboard";
import ProfileSelectionPage from './pages/ProfileSelectionPage';
import FeePayment from './features/student/pages/FeePage';
import CourseRegistration from './features/student/pages/CourseRegistrationPage';
import FeedbackPage from "./features/student/pages/FeedbackPage";
import ExamResultsPage from "./features/student/pages/ExamResultsPages"; 
import ProfilePage from "./features/student/pages/ProfilePage";

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
          <Route path="FeePayment" element={<FeePayment />} />
          <Route path="CourseRegistration" element={<CourseRegistration />} />
          <Route path="feedback" element={<FeedbackPage />} />
          <Route path="ExamResults" element={<ExamResultsPage />} />
          <Route path="profile" element={<ProfilePage />} />
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
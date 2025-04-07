import { BrowserRouter as Router, Routes } from "react-router-dom";
import { Route, Navigate } from "react-router-dom";
import LoginPage from "./components/common/Login";
import ProfileSelectionPage from './components/common/ProfileSelectionPage';
import {StudentRoutes} from "./features/student/routes/StudentRoutes";
import {TeacherRoutes} from "./features/teacher/routes/TeacherRoutes";
import {AdminRoutes} from "./features/admin/routes/AdminRoutes";



export default function App() {
  return (
    <Router>
      <Routes>
        {/* Home/Profile Selection */}
        <Route path="/" element={<ProfileSelectionPage />} />
        
        {/* Login Routes */}
        <Route path="/login" element={<LoginPage />} />
        
        {StudentRoutes}
        {TeacherRoutes}
        {AdminRoutes}
        
        
        
        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}
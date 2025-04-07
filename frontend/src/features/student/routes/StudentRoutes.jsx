import { Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import HomePage from "../pages/HomePage";
import FeePayment from "../pages/FeePage";
import CourseRegistration from "../pages/CourseRegistrationPage";
import FeedbackPage from "../pages/FeedbackPage";
import ExamResultsPage from "../pages/ExamResultsPages";
import ProfilePage from "../pages/ProfilePage";
import CoursePage from "../pages/CoursePage";

export const StudentRoutes = (
  <Route path="/student/dashboard" element={<Dashboard />}>
    <Route index element={<HomePage />} />
    <Route path="FeePayment" element={<FeePayment />} />
    <Route path="CourseRegistration" element={<CourseRegistration />} />
    <Route path="feedback" element={<FeedbackPage />} />
    <Route path="ExamResults" element={<ExamResultsPage />} />
    <Route path="profile" element={<ProfilePage />} />
    <Route path="courses/:courseId" element={<CoursePage />} />
  </Route>
);

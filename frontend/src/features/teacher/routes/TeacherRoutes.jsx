import { Route } from "react-router-dom";
import Dashboard from "../pages/HomePageHeader";
import {HomePage} from "../pages/HomePage";   

export const TeacherRoutes = (
    <Route path="/teacher/dashboard" element={<Dashboard />}>
        <Route index element={<HomePage />} />
  </Route>
);

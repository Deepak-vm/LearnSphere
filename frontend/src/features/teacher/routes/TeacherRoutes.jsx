import { Route } from "react-router-dom";
import Dashboard from "../pages/HomePageHeader";
import {HomePage} from "../pages/HomePage";  
import { CourseCreation } from "../components/courses/CourseCreation"; 

export const TeacherRoutes = (
    <Route path="/teacher/dashboard" element={<Dashboard />}>
        <Route index element={<HomePage />} />
        <Route path="createcourse" element={<CourseCreation />} />
    </Route>
);

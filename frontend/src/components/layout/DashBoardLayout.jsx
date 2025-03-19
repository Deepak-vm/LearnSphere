import { Link } from "react-router-dom";

const DashboardLayout = ({ children }) => {
  return (
    <div>
      <nav>
        <ul>
          <li><Link to="/student">Student</Link></li>
          <li><Link to="/teacher">Teacher</Link></li>
          <li><Link to="/admin">Admin</Link></li>
        </ul>
      </nav>
      <main>{children}</main>
    </div>
  );
};

export default DashboardLayout;

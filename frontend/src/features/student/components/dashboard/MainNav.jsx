import { Link, useLocation } from "react-router-dom";

export function MainNav() {
  const location = useLocation();

  const navItems = [
    {
      name: "Home",
      path: "/dashboard",
    },
    {
      name: "Course Registration",
      path: "/dashboard/CourseRegistration",
    },
    {
      name: "Fee Payment",
      path: "/dashboard/FeePayment",
    },
    {
      name: "Attendance",
      path: "/dashboard/attendance",
    },
    {
      name: "Profile",
      path: "/dashboard/profile",
    },
  ];

  return (
    <nav className="flex items-center space-x-4 lg:space-x-6">
      {navItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={`text-sm font-medium transition-colors hover:text-primary ${
            (location.pathname === item.path || 
             (location.pathname === "/dashboard" && item.path === "/dashboard"))
              ? "text-primary"
              : "text-muted-foreground"
          }`}
        >
          {item.name}
        </Link>
      ))}
    </nav>
  );
}
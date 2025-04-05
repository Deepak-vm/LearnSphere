import { Link, Outlet } from "react-router-dom";
import { UserCircle } from "lucide-react";
import logo from "../../../assets/images/learnsphere-logo.png";
import {MainNav} from '../components/dashboard/MainNav';
import { ThemeToggle } from "../../../components/ui/ThemeToggle";


export default function Dashboard() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto flex h-16 items-center px-10">
          <Link to="/dashboard" className="flex items-center space-x-2">
            <img
              src={logo}
              alt="LearnSphere Logo"
              width={40}
              height={40}
              className="rounded-full"
            />
            <span className="text-xl font-bold">LearnSphere</span>
          </Link>
          <div className="hidden lg:flex ml-6">
            <MainNav />
          </div>
          
          <div className="ml-auto flex items-center space-x-4">
            <a
              href="https://lrc.jklu.edu.in"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:block text-sm font-medium text-muted-foreground hover:text-primary"
            >
              Library
            </a>
            <ThemeToggle />
            <UserCircle className="h-8 w-8 text-gray-600" />
            <div className="lg:hidden">
              <MainNav />
            </div>
          </div>
        </div>
      </header>
      <main className="flex-1 container mx-auto py-6 px-4">
        <Outlet />
      </main>
    </div>
  );
}
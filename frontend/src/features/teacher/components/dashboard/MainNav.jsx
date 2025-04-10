import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { cn } from "../../../../lib/utils";
import teacherImage from "@/assets/images/teacherImage.jpg";
import { Bell, Menu, UserCircle, LogOut, Laptop, Lock } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogTrigger, 
  DialogHeader, 
  DialogTitle, 
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetTrigger
} from "@/components/ui/sheet";
import AcademicCalender from "@/assets/images/AcademicCalender.png";

// --- Main Header Component ---
const TeacherHeader = () => {
  const navigate = useNavigate();
  
  const navItems = [
    { name: "Home", path: "/teacher/dashboard" },
    { name: "Add Course", path: "/teacher/dashboard/createcourse" }, 
    { name: "Applications", path: "/teacher/applications" },
  ];

 
  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden lg:flex items-center space-x-4">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => cn(
              "text-sm font-medium transition-colors hover:text-primary",
              isActive ? "text-primary" : "text-muted-foreground",
            )}
          >
            {item.name}
          </NavLink>
        ))}
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="link"
              className={cn("text-sm font-medium transition-colors hover:text-primary p-0", "text-muted-foreground")}
            >
              Academic Calendar
            </Button>
          </DialogTrigger>
          <DialogContent>
            <CalendarDialog />
          </DialogContent>
        </Dialog>
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="link"
              className={cn("text-sm font-medium transition-colors hover:text-primary p-0", "text-muted-foreground")}
            >
              Time Table
            </Button>
          </DialogTrigger>
          <DialogContent>
            <TimeTable />
          </DialogContent>
        </Dialog>
      </nav>

      {/* Mobile Navigation */}
      <Sheet>
        <SheetTrigger asChild className="lg:hidden">
          <Button variant="ghost" size="icon" className="ml-2">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[240px] sm:w-[300px]">
          <nav className="flex flex-col gap-2 mt-4">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => cn(
                  "text-sm font-medium transition-colors hover:text-primary p-2 rounded-lg hover:bg-accent",
                  isActive ? "text-primary bg-accent" : "text-muted-foreground",
                )}
              >
                {item.name}
              </NavLink>
            ))}
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary justify-start p-2 h-auto w-full text-left",
                    "text-muted-foreground",
                  )}
                >
                  Academic Calendar
                </Button>
              </DialogTrigger>
              <DialogContent>
                <CalendarDialog />
              </DialogContent>
            </Dialog>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary justify-start p-2 h-auto w-full text-left",
                    "text-muted-foreground",
                  )}
                >
                  Time Table
                </Button>
              </DialogTrigger>
              <DialogContent>
                <TimeTable />
              </DialogContent>
            </Dialog>
          </nav>
        </SheetContent>
      </Sheet>
    </>
  );
};

// --- Notification Dropdown Component ---
const NotificationDropdown = () => {
  const notifications = [
    {
      id: 1,
      title: "New Assignment Submission",
      message: "Deepak submitted Assignment 3",
      time: "5 minutes ago",
    },
    {
      id: 2,
      title: "Student Query",
      message: "Nikhil has a question about the midterm",
      time: "30 minutes ago",
    },
    {
      id: 3,
      title: "Student Query",
      message: "Riyansh submitted assignment",
      time: "25 minutes ago",
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5 text-gray-300" />
          <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-[10px] font-bold text-white flex items-center justify-center">
            {notifications.length}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 bg-zinc-900 border-zinc-800 text-white">
        <DropdownMenuLabel>Notifications</DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-zinc-800" />
        <div className="max-h-80 overflow-auto">
          {notifications.map((notification) => (
            <DropdownMenuItem
              key={notification.id}
              className="flex flex-col items-start cursor-pointer hover:bg-zinc-800"
            >
              <div className="font-medium">{notification.title}</div>
              <div className="text-sm text-gray-400">{notification.message}</div>
              <div className="text-xs text-gray-500 mt-1">{notification.time}</div>
            </DropdownMenuItem>
          ))}
        </div>
        <DropdownMenuSeparator className="bg-zinc-800" />
        <DropdownMenuItem className="text-center cursor-pointer hover:bg-zinc-800">
          <span className="text-primary mx-auto">View all notifications</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

// --- Profile Dropdown Component ---
const ProfileDropdown = () => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    // Add any logout logic here
    navigate("/login");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={teacherImage}
              alt="Dr. Amit Sinhal"
            />
            <AvatarFallback>AS</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 bg-zinc-900 border-zinc-800 text-white">
        <div className="flex items-center p-2">
          <Avatar className="h-10 w-10 mr-2">
            <AvatarImage
              src={teacherImage}
              alt="Dr. Amit Sinhal"
            />
            <AvatarFallback>AS</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium">Dr. Amit Sinhal</p>
            <p className="text-xs text-gray-400">AmitSinhal@learnsphere.edu</p>
          </div>
        </div>
        <DropdownMenuSeparator className="bg-zinc-800" />
        <DropdownMenuItem>
          <Link to="/teacher/dashboard/profile" className="flex items-center gap-2 w-full">
            <UserCircle className="h-4 w-4" />
            View Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link to="/teacher/dashboard/devices" className="flex items-center gap-2 w-full">
            <Laptop className="h-4 w-4" />
            Logged in Devices
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link to="/teacher/dashboard/ChangePassword" className="flex items-center gap-2 w-full">
            <Lock className="h-4 w-4" />
            Change Password
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-zinc-800" />
        <DropdownMenuItem onClick={handleLogout}>
          <div className="flex items-center gap-2 w-full text-red-500">
            <LogOut className="h-4 w-4" />
            Logout
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const CalendarDialog = () => {
  return (
    <DialogContent className="max-w-7xl">
      <DialogHeader>
        <DialogTitle>Academic Calendar - Even Semester 2024-25</DialogTitle>
      </DialogHeader>
      <div className="relative w-full aspect-[1.8]">
        <img
          src={AcademicCalender}
          alt="Academic Calendar"
          className="object-contain w-full h-full"
        />
      </div>
    </DialogContent>
  );
};

const TimeTable = () => {
  return (
    <DialogContent className="max-w-7xl">
      <DialogHeader>
        <DialogTitle>Time Table - Even Semester 2024-25</DialogTitle>
      </DialogHeader>
      <div className="relative w-full aspect-[1.8]">
        <img
          src={AcademicCalender}
          alt="Academic Calendar"
          className="object-contain w-full h-full"
        />
      </div>
    </DialogContent>
  );
};

export { TeacherHeader, NotificationDropdown, ProfileDropdown, CalendarDialog };
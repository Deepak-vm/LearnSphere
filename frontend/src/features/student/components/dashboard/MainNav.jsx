"use client"

import { NavLink, useLocation } from "react-router-dom"
import { Menu } from "lucide-react"
import { cn } from "@/lib/utils"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { CalendarDialog } from "../others/EventHolidays"

const navItems = [
  { name: "Home", path: "/dashboard" },
  { name: "Course Registration", path: "/dashboard/CourseRegistration" },
  { name: "Fee Payment", path: "/dashboard/FeePayment" },
  { name: "Exam Results", path: "/dashboard/ExamResults" },
  { name: "Feedback", path: "/dashboard/feedback" },
];

export function MainNav() {
  const location = useLocation();
  const pathname = location.pathname;

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
          </nav>
        </SheetContent>
      </Sheet>
    </>
  )
}
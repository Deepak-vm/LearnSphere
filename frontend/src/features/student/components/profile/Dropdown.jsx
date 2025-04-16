"use client"

import { UserCircle, LogOut, Lock,  Laptop } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Avatar } from "@/components/ui/avatar"
import ProfilePic from "@/assets/images/ProfilePic.jpeg" 

export function ProfileSidebar() {
  const user = {
    name: "Riyansh Verma",
    email: "riyanshverma@jklu.edu.in",
    avatar: ProfilePic  
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Avatar className="h-8 w-8 border">
            {user.avatar ? (
              <img src={user.avatar} alt={user.name} />
            ) : (
              <UserCircle className="h-5 w-5" />
            )}
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <div className="flex items-center gap-3 p-4">
          <Avatar className="h-10 w-10 border">
            {user.avatar ? (
              <img src={user.avatar} alt={user.name} />
            ) : (
              <UserCircle className="h-6 w-6" />
            )}
          </Avatar>
          <div>
            <p className="text-sm font-medium">{user.name}</p>
            <p className="text-xs text-muted-foreground">{user.email}</p>
          </div>
        </div>
        <DropdownMenuSeparator />

        {/* Menu Items */}
        <DropdownMenuItem asChild>
          <Link to="/student/dashboard/profile" className="flex items-center gap-2">
            <UserCircle className="h-4 w-4" />
            View Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/student/dashboard/devices" className="flex items-center gap-2">
            <Laptop className="h-4 w-4" />
            Logged in Devices
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/student/dashboard/ChangePassword" className="flex items-center gap-2">
            <Lock className="h-4 w-4" />
            Change Password
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link to="/login" className="flex items-center gap-2 text-red-500">
            <LogOut className="h-4 w-4" />
            Logout
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
import { Link, useLocation } from "react-router-dom"
import { Button } from "@/components/ui/button"
import {
  GraduationCap,
  Users,
  MessageSquare,
  FileText,
  Info,
  CalendarDays,
  Plane
} from "lucide-react"
import ProfilePic from "@/assets/images/ProfilePic.jpeg"

const sidebarItems = [
  {
    name: "Subjects Taught",
    href: "/profile/subjects",
    icon: GraduationCap,
  },
  {
    name: "Class Schedule",
    href: "/profile/schedule",
    icon: CalendarDays,
  },
  {
    name: "Student Feedback",
    href: "/profile/feedback",
    icon: MessageSquare,
  },
  {
    name: "Research & Publications",
    href: "/profile/research",
    icon: FileText,
  },
  {
    name: "Leave Records",
    href: "/profile/leave",
    icon: Plane, // or FileMinus or BookOpenCheck
  },
  {
    name: "Additional Responsibilities",
    href: "/profile/responsibilities",
    icon: Users,
  },
  {
    name: "Personal Info",
    href: "/profile/personal",
    icon: Info,
  },
]


export default function ProfileSidebar() {
  const location = useLocation()
  const pathname = location.pathname

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center space-y-4">
        <div className="relative w-40 h-40">
          <img
            src={ProfilePic}
            alt="Profile"
            className="rounded-lg object-cover w-full h-full"
          />
        </div>
      </div>
      <nav className="flex flex-col space-y-1">
        {sidebarItems.map((item) => (
          <Button
            key={item.name}
            variant={pathname.includes(item.href) ? "secondary" : "ghost"}
            className="justify-start"
            asChild
          >
            <Link to={item.href}>
              <item.icon className="mr-2 h-4 w-4" />
              {item.name}
            </Link>
          </Button>
        ))}
      </nav>
    </div>
  )
}

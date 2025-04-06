import { Link, useLocation } from "react-router-dom"
import { Button } from "@/components/ui/button"
import {
  GraduationCap,
  Users,
  MessageSquare,
  Heart,
  FileText,
  Info,
} from "lucide-react"
import ProfilePic from "@/assets/images/ProfilePic.jpeg"

const sidebarItems = [
  {
    name: "Qualifications/Course",
    href: "/profile/qualifications",
    icon: GraduationCap,
  },
  {
    name: "Family Details",
    href: "/profile/family",
    icon: Users,
  },
  {
    name: "Remarks",
    href: "/profile/remarks",
    icon: MessageSquare,
  },
  {
    name: "Health",
    href: "/profile/health",
    icon: Heart,
  },
  {
    name: "Additional Details",
    href: "/profile/additional",
    icon: FileText,
  },
  {
    name: "Other Info",
    href: "/profile/other",
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
            src= {ProfilePic}
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

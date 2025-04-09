
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bell, Mail, Calendar } from "lucide-react"
import teacherImage from "@/assets/images/teacherImage.jpg"
import { Link } from "react-router-dom"

export function TeacherInfo() {
  // Mock teacher data
  const teacher = {
    name: "Dr. Amit Sinhal",
    department: "Institute of Engineering",
    position: "Professor",
    email: "AmitSinhal@learnsphere.edu",
    phone: "+91 12345 67890",
    image: teacherImage,
    status: "Active",
  }

  return (
    <Card className="bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <Avatar className="h-24 w-24 border-4 border-background">
            <AvatarImage src={teacher.image} alt={teacher.name} />
            <AvatarFallback>{teacher.name.charAt(0)}</AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
              <h1 className="text-2xl md:text-3xl font-bold">{teacher.name}</h1>
              <Badge variant="outline" className="w-fit">
                {teacher.position}
              </Badge>
            </div>
            <p className="text-muted-foreground">{teacher.department}</p>

            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 text-sm mt-2">
              <div className="flex items-center gap-1">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{teacher.email}</span>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" size="icon">
              <Bell className="h-4 w-4" />
            </Button>

            <Link to="/teacher/dashboard/profile">
              <Button>View Profile</Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
 
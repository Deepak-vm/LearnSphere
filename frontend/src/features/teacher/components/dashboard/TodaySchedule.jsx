import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Video, MapPin } from "lucide-react"

export function TodaySchedule() {
  const classes = [
    {
      id: 1,
      course: "Data Structures",
      code: "CS201",
      time: "10:00 AM - 11:30 AM",
      location: "Room 101",
      type: "Lecture",
      isOnline: false,
      isNext: true,
    },
    {
      id: 2,
      course: "Computer Networks",
      code: "CS301",
      time: "1:00 PM - 2:30 PM",
      location: "Online",
      type: "Tutorial",
      isOnline: true,
      isNext: false,
    },
    {
      id: 3,
      course: "Database Management",
      code: "CS401",
      time: "3:00 PM - 4:30 PM",
      location: "Lab 3",
      type: "Practical",
      isOnline: false,
      isNext: false,
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Classes</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {classes.map((cls) => (
          <div key={cls.id} className={`p-3 rounded-lg border ${cls.isNext ? "bg-primary/5 border-primary/20" : ""}`}>
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-medium">{cls.course}</h3>
                <p className="text-sm text-muted-foreground">{cls.code}</p>
              </div>
              <Badge variant={cls.type === "Lecture" ? "default" : cls.type === "Tutorial" ? "secondary" : "outline"}>
                {cls.type}
              </Badge>
            </div>

            <div className="flex items-center gap-2 text-sm mb-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>{cls.time}</span>
            </div>

            <div className="flex items-center gap-2 text-sm mb-3">
              {cls.isOnline ? (
                <Video className="h-4 w-4 text-muted-foreground" />
              ) : (
                <MapPin className="h-4 w-4 text-muted-foreground" />
              )}
              <span>{cls.location}</span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

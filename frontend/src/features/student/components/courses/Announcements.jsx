import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const announcements = [
  {
    id: 1,
    title: "Project Deadline Extended",
    content: "The deadline for the final project has been extended to next Friday.",
    date: "2025-02-15",
  },
  {
    id: 2,
    title: "Guest Lecture Next Week",
    content: "We will have a guest lecture by Dr. Jane Smith on Advanced Algorithms next Tuesday.",
    date: "2025-02-10",
  },
  {
    id: 3,
    title: "Office Hours Changed",
    content: "Office hours will now be held on Mondays and Wednesdays from 2-4 PM.",
    date: "2025-02-05",
  },
]

export  function CourseAnnouncements() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Announcements</CardTitle>
        <CardDescription>Latest updates for this course</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {announcements.map((announcement) => (
            <div key={announcement.id} className="border-b pb-4 last:border-b-0 last:pb-0">
              <h3 className="font-semibold">{announcement.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{announcement.content}</p>
              <p className="text-xs text-muted-foreground mt-2">{announcement.date}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}


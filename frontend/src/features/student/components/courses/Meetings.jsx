import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Video, Calendar } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const meetings = [
  { id: 1, title: "Lecture: Introduction to Graphs", date: "2025-02-20", time: "10:00 AM - 11:30 AM", type: "online" },
  { id: 2, title: "Lab Session: Graph Algorithms", date: "2025-02-22", time: "2:00 PM - 4:00 PM", type: "in-person" },
  { id: 3, title: "Office Hours", date: "2025-02-24", time: "3:00 PM - 4:00 PM", type: "online" },
]

export function CourseMeetings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Online Meetings</CardTitle>
        <CardDescription>Upcoming lectures and lab sessions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {meetings.map((meeting) => (
            <div key={meeting.id} className="flex items-center justify-between">
              <div>
                <p className="font-medium">{meeting.title}</p>
                <p className="text-sm text-muted-foreground">
                  {meeting.date} • {meeting.time}
                </p>
              </div>
              <Button variant="outline" size="sm">
                {meeting.type === "online" ? <Video className="mr-2 h-4 w-4" /> : <Calendar className="mr-2 h-4 w-4" />}
                {meeting.type === "online" ? "Join" : "View"}
              </Button>
            </div>
          ))}
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-full mt-4">View All Meetings</Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>All Meetings</DialogTitle>
            </DialogHeader>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {meetings.map((meeting) => (
                  <TableRow key={meeting.id}>
                    <TableCell>{meeting.title}</TableCell>
                    <TableCell>{meeting.date}</TableCell>
                    <TableCell>{meeting.time}</TableCell>
                    <TableCell>{meeting.type}</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">
                        {meeting.type === "online" ? (
                          <Video className="mr-2 h-4 w-4" />
                        ) : (
                          <Calendar className="mr-2 h-4 w-4" />
                        )}
                        {meeting.type === "online" ? "Join" : "View"}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  )
}


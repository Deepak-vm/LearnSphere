import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const assignments = [
  { id: 1, title: "Assignment 1: Data Structures Basics", dueDate: "2025-02-28", status: "Submitted" },
  { id: 2, title: "Assignment 2: Algorithm Analysis", dueDate: "2025-03-15", status: "In Progress" },
  { id: 3, title: "Assignment 3: Advanced Sorting", dueDate: "2025-04-01", status: "Not Started" },
]

export function CourseAssignments() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Assignments</CardTitle>
        <CardDescription>Your current and upcoming assignments</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {assignments.map((assignment) => (
            <div key={assignment.id} className="flex items-center justify-between">
              <div>
                <p className="font-medium">{assignment.title}</p>
                <p className="text-sm text-muted-foreground">Due: {assignment.dueDate}</p>
              </div>
              <div>
                <Button
                  variant={
                    assignment.status === "Submitted"
                      ? "secondary"
                      : assignment.status === "In Progress"
                        ? "default"
                        : "outline"
                  }
                >
                  {assignment.status}
                </Button>
              </div>
            </div>
          ))}
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-full mt-4">View All Assignments</Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>All Assignments</DialogTitle>
            </DialogHeader>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {assignments.map((assignment) => (
                  <TableRow key={assignment.id}>
                    <TableCell>{assignment.title}</TableCell>
                    <TableCell>{assignment.dueDate}</TableCell>
                    <TableCell>
                      <Button
                        variant={
                          assignment.status === "Submitted"
                            ? "secondary"
                            : assignment.status === "In Progress"
                              ? "default"
                              : "outline"
                        }
                      >
                        {assignment.status}
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


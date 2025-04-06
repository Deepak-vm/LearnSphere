import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const quizzes = [
  { id: 1, title: "Week 1 Quiz", dueDate: "2025-02-20", status: "Completed", score: "18/20" },
  { id: 2, title: "Midterm Quiz", dueDate: "2025-03-15", status: "Upcoming" },
  { id: 3, title: "Week 3 Quiz", dueDate: "2025-03-05", status: "Missed" },
]

export function CourseQuizzes() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quizzes</CardTitle>
        <CardDescription>Upcoming and past quizzes</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {quizzes.map((quiz) => (
            <div key={quiz.id} className="flex items-center justify-between">
              <div>
                <p className="font-medium">{quiz.title}</p>
                <p className="text-sm text-muted-foreground">Due: {quiz.dueDate}</p>
              </div>
              <div className="text-right">
                <p
                  className={`text-sm font-medium ${
                    quiz.status === "Completed"
                      ? "text-green-600"
                      : quiz.status === "Missed"
                        ? "text-red-600"
                        : "text-yellow-600"
                  }`}
                >
                  {quiz.status}
                </p>
                {quiz.score && <p className="text-sm text-muted-foreground">{quiz.score}</p>}
              </div>
            </div>
          ))}
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-full mt-4">View All Quizzes</Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>All Quizzes</DialogTitle>
            </DialogHeader>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Score</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {quizzes.map((quiz) => (
                  <TableRow key={quiz.id}>
                    <TableCell>{quiz.title}</TableCell>
                    <TableCell>{quiz.dueDate}</TableCell>
                    <TableCell>{quiz.status}</TableCell>
                    <TableCell>{quiz.score || "N/A"}</TableCell>
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


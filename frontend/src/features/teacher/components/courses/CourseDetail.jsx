"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, FileText, ClipboardCheck, BarChart, Calendar, BookOpen, Settings } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"


export function TeacherCourseDetail({ courseId }) {
  const [activeTab, setActiveTab] = useState("overview")

  // Mock course data
  const course = {
    id: courseId,
    title: "Data Structures",
    code: "CS201",
    description:
      "This course covers fundamental data structures and algorithms essential for computer science. Topics include arrays, linked lists, stacks, queues, trees, graphs, sorting algorithms, and algorithm analysis.",
    students: 45,
    schedule: "Mon, Wed 10:00-11:30 AM",
    progress: 65,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/database.jpg-se1Dud4thItARrQrXSmZBVlUP1pKbl.jpeg",
    department: "Computer Science",
    type: "Core",
    semester: "Spring 2025",
    credits: 4,
    location: "Room 101",
    assignments: 8,
    quizzes: 4,
    attendance: 85,
  }

  // Mock students data
  const students = [
    { id: 1, name: "Deepak", rollNo: "2022Btech027", attendance: 88, grade: "A-" },
    { id: 2, name: "Nikhil Pareek", rollNo: "2022Btech065", attendance: 76, grade: "B" },
    { id: 3, name: "Riyansh Verma", rollNo: "2022Btech088", attendance: 100, grade: "A+" },
  ]

  // Mock assignments data
  const assignments = [
    {
      id: 1,
      title: "Assignment 1: Arrays and Linked Lists",
      dueDate: "Feb 15, 2025",
      submissions: 42,
      total: 45,
      status: "Closed",
    },
    {
      id: 2,
      title: "Assignment 2: Stacks and Queues",
      dueDate: "Mar 1, 2025",
      submissions: 38,
      total: 45,
      status: "Closed",
    },
    {
      id: 3,
      title: "Assignment 3: Trees and Graphs",
      dueDate: "Mar 15, 2025",
      submissions: 32,
      total: 45,
      status: "Open",
    },
    {
      id: 4,
      title: "Assignment 4: Sorting Algorithms",
      dueDate: "Apr 5, 2025",
      submissions: 0,
      total: 45,
      status: "Not Started",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">{course.title}</h1>
          <p className="text-muted-foreground">
            {course.code} • {course.department}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Settings className="mr-2 h-4 w-4" />
            Course Settings
          </Button>
          <Button>
            <FileText className="mr-2 h-4 w-4" />
            Create Assignment
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Course Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">{course.description}</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Department</p>
                <p className="font-medium">{course.department}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Type</p>
                <Badge variant={course.type === "Core" ? "default" : "secondary"}>{course.type}</Badge>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Semester</p>
                <p className="font-medium">{course.semester}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Credits</p>
                <p className="font-medium">{course.credits}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>{course.schedule}</span>
                <Badge variant="outline">{course.location}</Badge>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Course Progress</span>
                  <span>{course.progress}%</span>
                </div>
                <Progress value={course.progress} className="h-2" />
              </div>

              <div className="grid grid-cols-3 gap-4 pt-4">
                <div className="text-center p-3 bg-primary/10 rounded-lg">
                  <p className="text-2xl font-bold">{course.assignments}</p>
                  <p className="text-sm text-muted-foreground">Assignments</p>
                </div>
                <div className="text-center p-3 bg-primary/10 rounded-lg">
                  <p className="text-2xl font-bold">{course.quizzes}</p>
                  <p className="text-sm text-muted-foreground">Quizzes</p>
                </div>
                <div className="text-center p-3 bg-primary/10 rounded-lg">
                  <p className="text-2xl font-bold">{course.attendance}%</p>
                  <p className="text-sm text-muted-foreground">Avg. Attendance</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="outline" className="w-full justify-start">
              <Users className="mr-2 h-4 w-4" />
              Manage Students
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <FileText className="mr-2 h-4 w-4" />
              Assignments & Quizzes
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <ClipboardCheck className="mr-2 h-4 w-4" />
              Take Attendance
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <BarChart className="mr-2 h-4 w-4" />
              Grade Book
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <BookOpen className="mr-2 h-4 w-4" />
              Course Materials
            </Button>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="students" className="space-y-4" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="students">Students</TabsTrigger>
          <TabsTrigger value="assignments">Assignments</TabsTrigger>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
          <TabsTrigger value="grades">Grades</TabsTrigger>
        </TabsList>

        <TabsContent value="students" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Enrolled Students</CardTitle>
              <Button size="sm">
                <Users className="mr-2 h-4 w-4" />
                Add Student
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Roll No</TableHead>
                    <TableHead>Attendance</TableHead>
                    <TableHead>Current Grade</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {students.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={`https://avatar.vercel.sh/${student.name}`} alt={student.name} />
                          <AvatarFallback>{student.name[0]}</AvatarFallback>
                        </Avatar>
                        <span>{student.name}</span>
                      </TableCell>
                      <TableCell>{student.rollNo}</TableCell>
                      <TableCell>{student.attendance}%</TableCell>
                      <TableCell>{student.grade}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="assignments" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Course Assignments</CardTitle>
              <Button size="sm">
                <FileText className="mr-2 h-4 w-4" />
                Create Assignment
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Submissions</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {assignments.map((assignment) => (
                    <TableRow key={assignment.id}>
                      <TableCell>{assignment.title}</TableCell>
                      <TableCell>{assignment.dueDate}</TableCell>
                      <TableCell>
                        {assignment.submissions}/{assignment.total}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            assignment.status === "Open"
                              ? "default"
                              : assignment.status === "Closed"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {assignment.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="attendance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Attendance Records</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Attendance tracking content will appear here</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="grades" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Grade Book</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Grade book content will appear here</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

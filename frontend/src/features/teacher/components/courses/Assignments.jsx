"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { CalendarIcon, Eye, FileUp, Pencil, Plus, Trash2 } from "lucide-react"

export function AssignmentModule() {
  const [dueDate, setDueDate] = useState<Date | undefined>(new Date())

  // Mock courses
  const courses = [
    { id: "CS201", name: "Data Structures" },
    { id: "CS301", name: "Computer Networks" },
    { id: "CS401", name: "Database Management" },
    { id: "CS501", name: "Data Science" },
  ]

  // Mock assignments
  const assignments = [
    {
      id: 1,
      title: "Assignment 1: Arrays and Linked Lists",
      course: "Data Structures",
      courseId: "CS201",
      dueDate: "2025-02-15",
      totalMarks: 100,
      submissions: 42,
      totalStudents: 45,
      status: "Closed",
    },
    {
      id: 2,
      title: "Assignment 2: Stacks and Queues",
      course: "Data Structures",
      courseId: "CS201",
      dueDate: "2025-03-01",
      totalMarks: 100,
      submissions: 38,
      totalStudents: 45,
      status: "Closed",
    },
    {
      id: 3,
      title: "Assignment 3: Trees and Graphs",
      course: "Data Structures",
      courseId: "CS201",
      dueDate: "2025-03-15",
      totalMarks: 100,
      submissions: 32,
      totalStudents: 45,
      status: "Open",
    },
    {
      id: 4,
      title: "Assignment 1: Network Protocols",
      course: "Computer Networks",
      courseId: "CS301",
      dueDate: "2025-02-20",
      totalMarks: 50,
      submissions: 35,
      totalStudents: 38,
      status: "Closed",
    },
    {
      id: 5,
      title: "Assignment 2: Network Security",
      course: "Computer Networks",
      courseId: "CS301",
      dueDate: "2025-03-10",
      totalMarks: 50,
      submissions: 30,
      totalStudents: 38,
      status: "Open",
    },
  ]

  return (
    <Tabs defaultValue="create" className="space-y-6">
      <TabsList className="grid grid-cols-2 w-full md:w-[400px]">
        <TabsTrigger value="create">Create Assignment</TabsTrigger>
        <TabsTrigger value="manage">Manage Assignments</TabsTrigger>
      </TabsList>

      <TabsContent value="create" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Create New Assignment</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="title">Assignment Title</Label>
                  <Input id="title" placeholder="Enter assignment title" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="course">Select Course</Label>
                  <Select>
                    <SelectTrigger id="course">
                      <SelectValue placeholder="Select course" />
                    </SelectTrigger>
                    <SelectContent>
                      {courses.map((course) => (
                        <SelectItem key={course.id} value={course.id}>
                          {course.name} ({course.id})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Enter assignment description and instructions"
                  className="min-h-[120px]"
                />
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="due-date">Due Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button id="due-date" variant="outline" className="w-full justify-start text-left font-normal">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dueDate ? format(dueDate, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={dueDate} onSelect={setDueDate} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="total-marks">Total Marks</Label>
                  <Input id="total-marks" type="number" placeholder="Enter total marks" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="assignment-type">Assignment Type</Label>
                  <Select>
                    <SelectTrigger id="assignment-type">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="individual">Individual</SelectItem>
                      <SelectItem value="group">Group</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Upload Resources</Label>
                <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center">
                  <FileUp className="h-8 w-8 text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground mb-1">Drag and drop files here or click to browse</p>
                  <p className="text-xs text-muted-foreground">Supports PDF, DOCX, PPTX, ZIP (Max 10MB)</p>
                  <Button variant="outline" size="sm" className="mt-4">
                    Browse Files
                  </Button>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline">Cancel</Button>
                <Button>Create Assignment</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="manage" className="space-y-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Manage Assignments</CardTitle>
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" />
              New Assignment
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 mb-6">
              <div className="space-y-2">
                <Label htmlFor="filter-course">Filter by Course</Label>
                <Select defaultValue="all">
                  <SelectTrigger id="filter-course">
                    <SelectValue placeholder="Select course" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Courses</SelectItem>
                    {courses.map((course) => (
                      <SelectItem key={course.id} value={course.id}>
                        {course.name} ({course.id})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="filter-status">Filter by Status</Label>
                <Select defaultValue="all">
                  <SelectTrigger id="filter-status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="open">Open</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Course</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead className="text-center">Submissions</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {assignments.map((assignment) => (
                    <TableRow key={assignment.id}>
                      <TableCell className="font-medium">{assignment.title}</TableCell>
                      <TableCell>{assignment.course}</TableCell>
                      <TableCell>{format(new Date(assignment.dueDate), "PPP")}</TableCell>
                      <TableCell className="text-center">
                        {assignment.submissions}/{assignment.totalStudents}
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant={assignment.status === "Open" ? "default" : "secondary"}>
                          {assignment.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  FileText,
  Users,
  MessageSquare,
  FileUp,
  GraduationCap,
  Plus,
  Download,
  Clock,
  Search,
  Video,
  Calendar,
  ClipboardCheck,
} from "lucide-react"
import { Link } from "react-router-dom"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"



export default function CoursePage({ params }) {
  // State for new announcement
  const [announcementDialogOpen, setAnnouncementDialogOpen] = useState(false)
  const [newAnnouncement, setNewAnnouncement] = useState({ title: "", content: "" })

  // State for adding people
  const [showAddPeoplePopover, setShowAddPeoplePopover] = useState(false)
  const [newEmail, setNewEmail] = useState("")

  // State for new material
  const [materialDialogOpen, setMaterialDialogOpen] = useState(false)
  const [newMaterial, setNewMaterial] = useState({ title: "", description: "" })

  // Mock course data based on courseId
  const courseData = {
    CS201: {
      id: "CS201",
      title: "Data Structures",
      code: "CS201",
      description:
        "Learn fundamental data structures and algorithms essential for computer science. Topics include arrays, linked lists, stacks, queues, trees, graphs, sorting algorithms, and algorithm analysis.",
      credits: 4,
      type: "Core",
      students: 45,
    },
    CS301: {
      id: "CS301",
      title: "Computer Networks",
      code: "CS301",
      description:
        "Master modern networking concepts and protocols. Study computer networking from physical layer to application layer. Learn about TCP/IP, routing, switching, network security, and modern networking protocols.",
      credits: 4,
      type: "Core",
      students: 38,
    },
    CS401: {
      id: "CS401",
      title: "Database Management",
      code: "CS401",
      description:
        "Understanding database design, implementation and optimization. Learn about database management systems, SQL, normalization, transaction management, and database design principles. Hands-on experience with real-world database systems.",
      credits: 4,
      type: "Core",
      students: 52,
    },
    CS501: {
      id: "CS501",
      title: "Data Science",
      code: "CS501",
      description:
        "Introduction to data science algorithms and applications. Explore data science concepts including data preprocessing, visualization, statistical analysis, machine learning algorithms, and practical applications using Python.",
      credits: 3,
      type: "Elective",
      students: 32,
    },
  }


  // Mock announcements
  const [announcements, setAnnouncements] = useState([
    {
      id: 1,
      title: "Midterm Exam Schedule",
      content:
        "The midterm exam will be held on March 15th from 10:00 AM to 12:00 PM in Room 201. Please bring your student ID and be on time.",
      date: "2025-02-28",
    },
    {
      id: 2,
      title: "Assignment 2 Deadline Extended",
      content:
        "Due to multiple requests, the deadline for Assignment 2 has been extended to March 10th. Please submit your work on time.",
      date: "2025-02-25",
    },
    {
      id: 3,
      title: "Guest Lecture Next Week",
      content:
        "We will have a guest lecture by Dr. Jane Smith on Advanced Algorithms next Tuesday. Attendance is mandatory.",
      date: "2025-02-20",
    },
  ])

  // Mock assignments
  const assignments = [
    {
      id: 1,
      title: "Assignment 1: Arrays and Linked Lists",
      dueDate: "2025-02-15",
      totalMarks: 100,
      submissions: 42,
      totalStudents: 45,
      status: "Closed",
    },
    {
      id: 2,
      title: "Assignment 2: Stacks and Queues",
      dueDate: "2025-03-10",
      totalMarks: 100,
      submissions: 38,
      totalStudents: 45,
      status: "Open",
    },
    {
      id: 3,
      title: "Assignment 3: Trees and Graphs",
      dueDate: "2025-03-25",
      totalMarks: 100,
      submissions: 0,
      totalStudents: 45,
      status: "Not Started",
    },
  ]

  // Mock quizzes
  const quizzes = [
    {
      id: 1,
      title: "Quiz 1: Data Structures Basics",
      dueDate: "2025-02-10",
      totalMarks: 20,
      submissions: 45,
      totalStudents: 45,
      status: "Completed",
    },
    {
      id: 2,
      title: "Quiz 2: Algorithm Analysis",
      dueDate: "2025-03-05",
      totalMarks: 20,
      submissions: 0,
      totalStudents: 45,
      status: "Upcoming",
    },
  ]

  // Mock materials
  const [materials, setMaterials] = useState([
    { id: 1, name: "Lecture Notes Week 1", type: "PDF", size: "2.3 MB", date: "2025-02-01" },
    { id: 2, name: "Assignment 1 Guidelines", type: "DOCX", size: "567 KB", date: "2025-02-05" },
    { id: 3, name: "Course Syllabus", type: "PDF", size: "1.1 MB", date: "2025-01-15" },
    { id: 4, name: "Project Resources", type: "ZIP", size: "15.2 MB", date: "2025-02-10" },
  ])

  // Mock students
  const [students, setStudents] = useState([
    { id: 1, name: "Alice Wonderland", rollNo: "2021-CS-001", email: "alice@university.edu", grade: "A" },
    { id: 2, name: "Bob The Builder", rollNo: "2021-CS-002", email: "bob@university.edu", grade: "B+" },
    { id: 3, name: "Charlie Chaplin", rollNo: "2021-CS-003", email: "charlie@university.edu", grade: "A-" },
  ])

  // Handle adding a new announcement
  const handleAddAnnouncement = () => {
    if (newAnnouncement.title && newAnnouncement.content) {
      const newId = announcements.length > 0 ? Math.max(...announcements.map((a) => a.id)) + 1 : 1
      const today = new Date().toISOString().split("T")[0]

      setAnnouncements([
        {
          id: newId,
          title: newAnnouncement.title,
          content: newAnnouncement.content,
          date: today,
        },
        ...announcements,
      ])

      setNewAnnouncement({ title: "", content: "" })
      setAnnouncementDialogOpen(false)
    }
  }

  // Handle adding a new student
  const handleAddStudent = () => {
    if (newEmail && newEmail.includes("@")) {
      const newId = students.length > 0 ? Math.max(...students.map((s) => s.id)) + 1 : 1
      const namePart = newEmail.split("@")[0]
      const name = namePart
        .split(".")
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(" ")

      setStudents([
        ...students,
        {
          id: newId,
          name,
          rollNo: `2021-CS-00${newId}`,
          email: newEmail,
          grade: "N/A",
        },
      ])

      setNewEmail("")
      setShowAddPeoplePopover(false)
    }
  }

  // Handle adding a new material
  const handleAddMaterial = () => {
    if (newMaterial.title) {
      const newId = materials.length > 0 ? Math.max(...materials.map((m) => m.id)) + 1 : 1
      const today = new Date().toISOString().split("T")[0]

      setMaterials([
        {
          id: newId,
          name: newMaterial.title,
          type: "PDF",
          size: "1.0 MB",
          date: today,
        },
        ...materials,
      ])

      setNewMaterial({ title: "", description: "" })
      setMaterialDialogOpen(false)
    }
  }

  if (!course) {
    return <div>Course not found</div>
  }

  return (
    <div className="container max-w-7xl py-6 space-y-8">
      {/* Course Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">{course.title}</h1>
          <p className="text-muted-foreground">
            {course.code} • {course.type} • {course.credits} Credits • {course.students} Students
          </p>
        </div>
      </div>

      {/* Quick Links */}
      <div className="flex flex-wrap gap-3">
        <Button variant="outline">
          <FileText className="mr-2 h-4 w-4" />
          Create Assignment
        </Button>
        <Button variant="outline">
          <MessageSquare className="mr-2 h-4 w-4" />
          Announcement
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <Video className="mr-2 h-4 w-4" />
              Meeting
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <Video className="mr-2 h-4 w-4" />
              Join Meeting
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Plus className="mr-2 h-4 w-4" />
              Create Meeting
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Calendar className="mr-2 h-4 w-4" />
              Schedule Meeting
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button variant="outline" asChild>
          <Link href={`/teacher/attendance/${params.courseId}`}>
            <ClipboardCheck className="mr-2 h-4 w-4" />
            Take Attendance
          </Link>
        </Button>
        <Button variant="outline">
          <FileUp className="mr-2 h-4 w-4" />
          Upload Materials
        </Button>
        <Button variant="outline">
          <GraduationCap className="mr-2 h-4 w-4" />
          Grades
        </Button>
      </div>

      {/* Course Description */}
      <Card>
        <CardHeader>
          <CardTitle>Course Description</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{course.description}</p>
        </CardContent>
      </Card>

      {/* Recent Activity and Upcoming Deadlines Section */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="md:col-span-1 bg-zinc-950 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="bg-zinc-800 p-2 rounded-full">
                  <FileText className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="font-medium text-sm">Assignment 2 deadline extended</p>
                  <p className="text-xs text-zinc-400">2 days ago</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-zinc-800 p-2 rounded-full">
                  <MessageSquare className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="font-medium text-sm">New announcement posted</p>
                  <p className="text-xs text-zinc-400">5 days ago</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-zinc-800 p-2 rounded-full">
                  <Users className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="font-medium text-sm">Attendance taken</p>
                  <p className="text-xs text-zinc-400">1 week ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-1 bg-zinc-950 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Upcoming Deadlines</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="bg-yellow-900/30 p-2 rounded-full">
                  <Clock className="h-4 w-4 text-yellow-400" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm">Assignment 2: Stacks and Queues</p>
                  <p className="text-xs text-zinc-400">Due: March 10, 2025</p>
                </div>
                <Badge variant="outline" className="bg-transparent border-zinc-700 text-zinc-300 text-xs">
                  10 days
                </Badge>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-yellow-900/30 p-2 rounded-full">
                  <Clock className="h-4 w-4 text-yellow-400" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm">Quiz 2: Algorithm Analysis</p>
                  <p className="text-xs text-zinc-400">Due: March 5, 2025</p>
                </div>
                <Badge variant="outline" className="bg-transparent border-zinc-700 text-zinc-300 text-xs">
                  5 days
                </Badge>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-yellow-900/30 p-2 rounded-full">
                  <Clock className="h-4 w-4 text-yellow-400" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm">Midterm Exam</p>
                  <p className="text-xs text-zinc-400">Due: March 15, 2025</p>
                </div>
                <Badge variant="outline" className="bg-transparent border-zinc-700 text-zinc-300 text-xs">
                  15 days
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Announcements Section */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Announcements</CardTitle>
          <Dialog open={announcementDialogOpen} onOpenChange={setAnnouncementDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <MessageSquare className="mr-2 h-4 w-4" />
                Create Announcement
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <div className="space-y-4 p-4">
                <h2 className="text-xl font-semibold">Create Announcement</h2>
                <div className="space-y-2">
                  <Input
                    placeholder="Announcement title"
                    value={newAnnouncement.title}
                    onChange={(e) => setNewAnnouncement({ ...newAnnouncement, title: e.target.value })}
                    className="border-0 border-b rounded-none focus-visible:ring-0 px-0 text-lg font-medium"
                  />
                </div>
                <div className="relative">
                  <Textarea
                    placeholder="Write your announcement here..."
                    value={newAnnouncement.content}
                    onChange={(e) => setNewAnnouncement({ ...newAnnouncement, content: e.target.value })}
                    className="min-h-[120px] resize-none"
                  />
                </div>
                <div className="flex justify-end">
                  <Button onClick={handleAddAnnouncement}>Post</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {announcements.map((announcement) => (
              <div key={announcement.id} className="border-b pb-6 last:border-0 last:pb-0">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold">{announcement.title}</h3>
                  <p className="text-sm text-muted-foreground">{new Date(announcement.date).toLocaleDateString()}</p>
                </div>
                <p className="text-muted-foreground">{announcement.content}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Assignments Section */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Assignments</CardTitle>
          <Button asChild>
            <Link href={`/teacher/courses/${params.courseId}/assignments/new`}>
              <Plus className="mr-2 h-4 w-4" />
              Create Assignment
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Total Marks</TableHead>
                <TableHead>Submissions</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {assignments.map((assignment) => (
                <TableRow key={assignment.id}>
                  <TableCell className="font-medium">{assignment.title}</TableCell>
                  <TableCell>{new Date(assignment.dueDate).toLocaleDateString()}</TableCell>
                  <TableCell>{assignment.totalMarks}</TableCell>
                  <TableCell>
                    {assignment.submissions}/{assignment.totalStudents}
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
                    <Button variant="ghost" size="sm">
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Quizzes Section */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Quizzes</CardTitle>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Quiz
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Total Marks</TableHead>
                <TableHead>Submissions</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {quizzes.map((quiz) => (
                <TableRow key={quiz.id}>
                  <TableCell className="font-medium">{quiz.title}</TableCell>
                  <TableCell>{new Date(quiz.dueDate).toLocaleDateString()}</TableCell>
                  <TableCell>{quiz.totalMarks}</TableCell>
                  <TableCell>
                    {quiz.submissions}/{quiz.totalStudents}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        quiz.status === "Completed" ? "secondary" : quiz.status === "Upcoming" ? "default" : "outline"
                      }
                    >
                      {quiz.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                    <Button variant="ghost" size="sm">
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Students Section */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Students</CardTitle>
          <Popover open={showAddPeoplePopover} onOpenChange={setShowAddPeoplePopover}>
            <PopoverTrigger asChild>
              <Button>
                <Users className="mr-2 h-4 w-4" />
                Add People
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="space-y-4">
                <h3 className="font-medium">Add Student by Email</h3>
                <div className="flex gap-2">
                  <Input
                    placeholder="student@university.edu"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                  />
                  <Button onClick={handleAddStudent}>Add</Button>
                </div>
                <div className="text-xs text-muted-foreground">
                  Student will receive an email invitation to join this course.
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </CardHeader>
        <CardContent>
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search students..." className="pl-10" />
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Roll No</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Current Grade</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student.id}>
                  <TableCell className="font-medium">{student.name}</TableCell>
                  <TableCell>{student.rollNo}</TableCell>
                  <TableCell>{student.email}</TableCell>
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

      {/* Materials Section */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Course Materials</CardTitle>
          <Dialog open={materialDialogOpen} onOpenChange={setMaterialDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <FileUp className="mr-2 h-4 w-4" />
                Upload Materials
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <div className="space-y-4 p-4">
                <h2 className="text-xl font-semibold">Upload Material</h2>
                <div className="space-y-2">
                  <Input
                    placeholder="Material title"
                    value={newMaterial.title}
                    onChange={(e) => setNewMaterial({ ...newMaterial, title: e.target.value })}
                    className="border-0 border-b rounded-none focus-visible:ring-0 px-0 text-lg font-medium"
                  />
                </div>
                <div className="relative">
                  <Textarea
                    placeholder="Description (optional)"
                    value={newMaterial.description}
                    onChange={(e) => setNewMaterial({ ...newMaterial, description: e.target.value })}
                    className="min-h-[120px] resize-none"
                  />
                </div>
                <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center">
                  <FileUp className="h-8 w-8 text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground mb-1">Drag and drop files here or click to browse</p>
                  <p className="text-xs text-muted-foreground">Supports PDF, DOCX, PPTX, ZIP (Max 10MB)</p>
                  <Button variant="outline" size="sm" className="mt-4">
                    Browse Files
                  </Button>
                </div>
                <div className="flex justify-end">
                  <Button onClick={handleAddMaterial}>Post</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Upload Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {materials.map((material) => (
                <TableRow key={material.id}>
                  <TableCell className="font-medium">{material.name}</TableCell>
                  <TableCell>{material.type}</TableCell>
                  <TableCell>{material.size}</TableCell>
                  <TableCell>{new Date(material.date).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      Download
                    </Button>
                    <Button variant="ghost" size="sm">
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Grades Section */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Grades</CardTitle>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export Grades
            </Button>
            <Button>
              <GraduationCap className="mr-2 h-4 w-4" />
              Upload Marks
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Roll No</TableHead>
                <TableHead>Assignment 1</TableHead>
                <TableHead>Assignment 2</TableHead>
                <TableHead>Quiz 1</TableHead>
                <TableHead>Midterm</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Grade</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student.id}>
                  <TableCell className="font-medium">{student.name}</TableCell>
                  <TableCell>{student.rollNo}</TableCell>
                  <TableCell>85/100</TableCell>
                  <TableCell>90/100</TableCell>
                  <TableCell>18/20</TableCell>
                  <TableCell>75/100</TableCell>
                  <TableCell className="font-medium">268/320</TableCell>
                  <TableCell>{student.grade}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

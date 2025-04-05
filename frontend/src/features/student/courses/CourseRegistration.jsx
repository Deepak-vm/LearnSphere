"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Download } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

const creditData = {
    total: 133,
    earned: 109,
    pending: 24,
    audit: 0,
    transferred: 0,
    required: 160,
  }
  
const CreditSummary=() =>{
    const progress = (creditData.earned / creditData.required) * 100
  
    return (
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Credit Summary</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Total Credits Earned</span>
              <span className="font-medium">{creditData.earned}</span>
            </div>
            <Progress value={progress} className="h-2" />
            <div className="text-sm text-muted-foreground">
              {creditData.earned} of {creditData.required} credits completed
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm">Pending Credits</span>
              <span className="font-medium text-yellow-600">{creditData.pending}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Audit Credits</span>
              <span className="font-medium text-blue-600">{creditData.audit}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Transferred Credits</span>
              <span className="font-medium text-green-600">{creditData.transferred}</span>
            </div>
          </div>
        </div>
      </Card>
    )
  }
  
  

const CourseRegistrationHeader =() => {
    return (
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">Course Registration</h1>
        <p className="text-muted-foreground">Register for courses in the current semester</p>
      </div>
    )
}


const courses = [
  {
    code: "CS1135",
    title: "Programming-II",
    type: "COMPULSORY",
    credits: 4.0,
    session: "SEMESTER 2",
    program: "Regulation 2024, Bachelor of Technology",
    seats: "-/-",
    status: "NR",
  },
  {
    code: "CC1102",
    title: "Critical Thinking and Storytelling",
    type: "COMPULSORY",
    credits: 2.0,
    session: "SEMESTER 2",
    program: "Regulation 2024, Bachelor of Technology",
    seats: "-/-",
    status: "NR",
  },
  {
    code: "AS1114",
    title: "Linear Algebra and Differential Equations",
    type: "COMPULSORY",
    credits: 4.0,
    session: "SEMESTER 2",
    program: "Regulation 2024, Bachelor of Technology",
    seats: "-/-",
    status: "NR",
  },
  {
    code: "ES1114",
    title: "Environmental Studies",
    type: "COMPULSORY",
    credits: 3.0,
    session: "SEMESTER 2",
    program: "Regulation 2024, Bachelor of Technology",
    seats: "-/-",
    status: "NR",
  },
  {
    code: "EE1120",
    title: "Digital Circuit and Systems",
    type: "COMPULSORY",
    credits: 4.0,
    session: "SEMESTER 2",
    program: "Regulation 2024, Bachelor of Technology",
    seats: "-/-",
    status: "NR",
  },
]

const CourseRegistrationTable =()=> {
  const [selectedCourses, setSelectedCourses] = useState([])
  const [isSubmitted, setIsSubmitted] = useState(false)

  const toggleCourse = (code) => {
    if (!isSubmitted) {
      setSelectedCourses((prev) => (prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code]))
    }
  }

  const handleSubmit = () => {
    setIsSubmitted(true)
  }

  const generateReport = () => {
    // Create a sample report content
    const reportContent = `
Course Registration Report
-------------------------
Date: ${new Date().toLocaleDateString()}
Selected Courses: ${selectedCourses.length}

Courses:
${selectedCourses.map((code) => `- ${code}`).join("\n")}
    `

    // Create blob and download
    const blob = new Blob([reportContent], { type: "text/plain" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "course-registration-report.txt"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-4">
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Subject</TableHead>
              <TableHead>Type</TableHead>
              <TableHead className="text-center">Credits</TableHead>
              <TableHead className="text-center">Session</TableHead>
              <TableHead className="text-center">Available Seats</TableHead>
              <TableHead className="text-center">Time Table</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {courses.map((course) => (
              <TableRow key={course.code}>
                <TableCell>
                  <div>
                    <div className="font-medium">{course.title}</div>
                    <div className="text-sm text-muted-foreground flex items-center gap-2">
                      {course.code}
                      <Badge variant="outline" className="ml-2">
                        Credit
                      </Badge>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={course.type === "COMPULSORY" ? "default" : "secondary"}>{course.type}</Badge>
                </TableCell>
                <TableCell className="text-center">{course.credits}</TableCell>
                <TableCell className="text-center">{course.session}</TableCell>
                <TableCell className="text-center">{course.seats}</TableCell>
                <TableCell className="text-center">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Calendar className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Course Schedule - {course.code}</DialogTitle>
                      </DialogHeader>
                      <div className="grid gap-4">
                        <div className="grid grid-cols-3 items-center gap-4">
                          <div className="font-medium">Lecture</div>
                          <div className="col-span-2">Monday, Wednesday 10:00 AM - 11:30 AM</div>
                        </div>
                        <div className="grid grid-cols-3 items-center gap-4">
                          <div className="font-medium">Tutorial</div>
                          <div className="col-span-2">Friday 2:00 PM - 3:30 PM</div>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </TableCell>
                <TableCell className="text-center">
                  <Badge variant={course.status === "REGISTERED" ? "default" : "secondary"}>{course.status}</Badge>
                </TableCell>
                <TableCell className="text-center">
                  <Button
                    variant={selectedCourses.includes(course.code) ? "default" : "outline"}
                    onClick={() => toggleCourse(course.code)}
                  >
                    {selectedCourses.includes(course.code) ? "Selected" : "Register"}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {selectedCourses.length > 0 && (
        <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
          <div className="text-sm">
            Selected Courses: <span className="font-medium">{selectedCourses.length}</span>
          </div>
          <div className="flex gap-3">
            {isSubmitted ? (
              <>
                <Button variant="outline" disabled>
                  Submitted
                </Button>
                <Button onClick={generateReport} className="bg-green-600 hover:bg-green-700">
                  Generate Report
                  <Download className="ml-2 h-4 w-4" />
                </Button>
              </>
            ) : (
              <Button onClick={handleSubmit}>Submit</Button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export {CourseRegistrationHeader, CourseRegistrationTable , CreditSummary}
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Check, Users, X, Download } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"


export default function AttendancePage({ params }) {
  const { toast } = useToast()
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>("10:00 AM - 11:30 AM")
  const [attendanceData, setAttendanceData] = useState<{
    [key: string]: { present: boolean; late: boolean }
  }>({
    "2022BTech001": { present: true, late: false },
    "2022BTech002": { present: true, late: true },
    "2022BTech003": { present: false, late: false },
    "2022BTech004": { present: true, late: false },
    "2022BTech005": { present: true, late: false },
    "2022BTech006": { present: false, late: false },
    "2022BTech007": { present: true, late: false },
    "2022BTech008": { present: true, late: false },
    "2022BTech009": { present: false, late: false },
    "2022BTech010": { present: true, late: true },
  })

  // Mock course data
  const courseData = {
    CS201: {
      id: "CS201",
      title: "Data Structures",
      code: "CS201",
      students: 45,
    },
    CS301: {
      id: "CS301",
      title: "Computer Networks",
      code: "CS301",
      students: 38,
    },
    CS401: {
      id: "CS401",
      title: "Database Management",
      code: "CS401",
      students: 52,
    },
  }

  const course = courseData[params.courseId as keyof typeof courseData] || {
    id: params.courseId,
    title: "Unknown Course",
    code: params.courseId,
    students: 0,
  }

  // Mock students data
  const students = [
    { rollNo: "2022BTech001", name: "Alice Johnson" },
    { rollNo: "2022BTech002", name: "Bob Smith" },
    { rollNo: "2022BTech003", name: "Charlie Brown" },
    { rollNo: "2022BTech004", name: "Diana Prince" },
    { rollNo: "2022BTech005", name: "Ethan Hunt" },
    { rollNo: "2022BTech006", name: "Fiona Gallagher" },
    { rollNo: "2022BTech007", name: "George Miller" },
    { rollNo: "2022BTech008", name: "Hannah Baker" },
    { rollNo: "2022BTech009", name: "Ian Malcolm" },
    { rollNo: "2022BTech010", name: "Jane Foster" },
  ]

  // Mock schedule data
  const scheduleData = [
    { day: "Monday", time: "10:00 AM - 11:30 AM", type: "Lecture", room: "Room 101" },
    { day: "Wednesday", time: "10:00 AM - 11:30 AM", type: "Lecture", room: "Room 101" },
    { day: "Friday", time: "2:00 PM - 3:30 PM", type: "Lab", room: "Lab 2" },
  ]

  // Toggle attendance for a student
  const toggleAttendance = (rollNo: string) => {
    setAttendanceData((prev) => ({
      ...prev,
      [rollNo]: { ...prev[rollNo], present: !prev[rollNo].present },
    }))
  }

  // Toggle late status for a student
  const toggleLate = (rollNo: string) => {
    setAttendanceData((prev) => ({
      ...prev,
      [rollNo]: { ...prev[rollNo], late: !prev[rollNo].late },
    }))
  }

  // Mark all students as present
  const markAllPresent = () => {
    const newData: typeof attendanceData = {}
    students.forEach((student) => {
      newData[student.rollNo] = { present: true, late: false }
    })
    setAttendanceData(newData)
  }

  // Mark all students as absent
  const markAllAbsent = () => {
    const newData: typeof attendanceData = {}
    students.forEach((student) => {
      newData[student.rollNo] = { present: false, late: false }
    })
    setAttendanceData(newData)
  }

  // Submit attendance
  const submitAttendance = () => {
    toast({
      title: "Attendance Submitted",
      description: `Attendance for ${course.title} on ${new Date().toLocaleDateString()} has been recorded.`,
    })
  }

  return (
    <div className="container max-w-7xl py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Attendance</h1>
          <p className="text-muted-foreground">
            {course.title} ({course.code}) • {course.students} Students
          </p>
        </div>
        <Button asChild variant="outline">
          <Link href={`/teacher/courses/${params.courseId}`}>Back to Course</Link>
        </Button>
      </div>

      <Tabs defaultValue="timeline" className="space-y-6">
        <TabsList>
          <TabsTrigger value="timeline">Timeline View</TabsTrigger>
          <TabsTrigger value="calendar">Calendar View</TabsTrigger>
          <TabsTrigger value="records">Attendance Records</TabsTrigger>
        </TabsList>

        <TabsContent value="timeline" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Today's Schedule
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <div className="absolute left-[30px] top-0 bottom-0 w-0.5 bg-primary/20" />

                {scheduleData.map((slot, index) => (
                  <div
                    key={index}
                    className={`flex gap-4 mb-6 cursor-pointer ${selectedTimeSlot === slot.time ? "opacity-100" : "opacity-70"}`}
                    onClick={() => setSelectedTimeSlot(slot.time)}
                  >
                    <div className="relative z-10">
                      <div
                        className={`w-[60px] h-[60px] rounded-full flex items-center justify-center text-white font-medium text-sm leading-tight text-center whitespace-pre-wrap transition-colors ${selectedTimeSlot === slot.time ? "bg-primary" : "bg-muted"}`}
                      >
                        {slot.time.split(" - ")[0]}
                      </div>
                    </div>
                    <div
                      className={`flex-1 bg-card rounded-lg p-4 ${selectedTimeSlot === slot.time ? "ring-2 ring-primary" : "border"}`}
                    >
                      <div className="flex flex-col gap-1">
                        <div className="flex items-start justify-between">
                          <h3 className="font-semibold text-lg">
                            {course.title} ({course.code})
                          </h3>
                          <Badge variant={slot.type === "Lecture" ? "default" : "secondary"}>{slot.type}</Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{slot.day}</span>
                          <span>{slot.time}</span>
                          <span>{slot.room}</span>
                        </div>
                        {selectedTimeSlot === slot.time && (
                          <div className="mt-2">
                            <Badge variant="outline" className="bg-primary/10 text-primary">
                              Selected
                            </Badge>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {selectedTimeSlot && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Mark Attendance for {selectedTimeSlot}
                </CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={markAllPresent}>
                    <Check className="mr-2 h-4 w-4" />
                    Mark All Present
                  </Button>
                  <Button variant="outline" size="sm" onClick={markAllAbsent}>
                    <X className="mr-2 h-4 w-4" />
                    Mark All Absent
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[100px]">Roll No</TableHead>
                        <TableHead>Student Name</TableHead>
                        <TableHead className="text-center">Present</TableHead>
                        <TableHead className="text-center">Late</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {students.map((student) => (
                        <TableRow key={student.rollNo}>
                          <TableCell className="font-medium">{student.rollNo}</TableCell>
                          <TableCell>{student.name}</TableCell>
                          <TableCell className="text-center">
                            <Checkbox
                              checked={attendanceData[student.rollNo]?.present || false}
                              onCheckedChange={() => toggleAttendance(student.rollNo)}
                              className="mx-auto"
                            />
                          </TableCell>
                          <TableCell className="text-center">
                            <Checkbox
                              checked={attendanceData[student.rollNo]?.late || false}
                              onCheckedChange={() => toggleLate(student.rollNo)}
                              disabled={!attendanceData[student.rollNo]?.present}
                              className="mx-auto"
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                <div className="mt-4 flex justify-end">
                  <Button onClick={submitAttendance}>Submit Attendance</Button>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="calendar">
          <Card>
            <CardHeader>
              <CardTitle>Calendar View</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center bg-muted/20 rounded-lg">
                <p className="text-muted-foreground">Calendar view will be implemented here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="records">
          <Card>
            <CardHeader>
              <CardTitle>Attendance Records</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Overall Attendance</h3>
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Export Report
                  </Button>
                </div>

                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Roll No</TableHead>
                        <TableHead>Student Name</TableHead>
                        <TableHead className="text-center">Classes Attended</TableHead>
                        <TableHead className="text-center">Total Classes</TableHead>
                        <TableHead className="text-center">Attendance %</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {students.map((student, index) => {
                        const attended = Math.floor(Math.random() * 15) + 10
                        const total = 25
                        const percentage = Math.round((attended / total) * 100)

                        return (
                          <TableRow key={student.rollNo}>
                            <TableCell className="font-medium">{student.rollNo}</TableCell>
                            <TableCell>{student.name}</TableCell>
                            <TableCell className="text-center">{attended}</TableCell>
                            <TableCell className="text-center">{total}</TableCell>
                            <TableCell className="text-center">
                              <Badge
                                className={
                                  percentage >= 90
                                    ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                                    : percentage >= 75
                                      ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
                                      : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                                }
                              >
                                {percentage}%
                              </Badge>
                            </TableCell>
                          </TableRow>
                        )
                      })}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

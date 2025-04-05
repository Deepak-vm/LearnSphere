"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

// Sample data for multiple semesters
const allSemesterResults = [
  {
    semester: "SEMESTER 5",
    course: "CSE BTech 2022-26",
    sgpa: 7.391,
    cgpa: "N/A",
    subjectsCleared: 7,
    backlogs: 0,
    subjects: [
      {
        code: "AS1209",
        name: "Matrix computations",
        grade: "B-",
        gradePoint: 7.0,
        creditPoint: 4.0,
        result: "Pass",
        components: [
          { type: "Quiz", maxMarks: 10.0, obtainedMarks: 4.25 },
          { type: "Mid-Term Exam-1", maxMarks: 15.0, obtainedMarks: 9.75 },
          { type: "Mid-Term Exam-2", maxMarks: 15.0, obtainedMarks: 9.0 },
          { type: "End-Term Exam", maxMarks: 40.0, obtainedMarks: 22.0 },
          { type: "Assignment", maxMarks: 10.0, obtainedMarks: 9.0 },
          { type: "Class Participation", maxMarks: 5.0, obtainedMarks: 4.0 },
          { type: "Attendance", maxMarks: 5.0, obtainedMarks: 3.5 },
        ],
      },
    ],
  },
  {
    semester: "SEMESTER 4",
    course: "CSE BTech 2022-26",
    sgpa: 8.125,
    cgpa: "7.89",
    subjectsCleared: 8,
    backlogs: 0,
    subjects: [
      {
        code: "CS1142",
        name: "Data Science Fundamentals",
        grade: "A",
        gradePoint: 9.0,
        creditPoint: 4.0,
        result: "Pass",
        components: [
          { type: "Quiz", maxMarks: 10.0, obtainedMarks: 9.0 },
          { type: "Mid-Term", maxMarks: 30.0, obtainedMarks: 27.0 },
          { type: "End-Term", maxMarks: 40.0, obtainedMarks: 36.0 },
          { type: "Project", maxMarks: 20.0, obtainedMarks: 18.0 },
        ],
      },
    ],
  },
  {
    semester: "SEMESTER 3",
    course: "CSE BTech 2022-26",
    sgpa: 7.854,
    cgpa: "7.76",
    subjectsCleared: 7,
    backlogs: 0,
    subjects: [
      {
        code: "CS1101",
        name: "Object Oriented Programming",
        grade: "A-",
        gradePoint: 8.0,
        creditPoint: 4.0,
        result: "Pass",
        components: [
          { type: "Lab Work", maxMarks: 20.0, obtainedMarks: 18.0 },
          { type: "Mid-Term", maxMarks: 30.0, obtainedMarks: 25.0 },
          { type: "End-Term", maxMarks: 50.0, obtainedMarks: 42.0 },
        ],
      },
    ],
  },
]

function getGradeColor(grade) {
  switch (grade) {
    case "A":
    case "A+":
      return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
    case "B+":
    case "B":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
    case "B-":
    case "C+":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
    case "C":
    case "C-":
      return "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300"
    default:
      return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
  }
}

function SemesterNavigation({ currentIndex, total, onPrevious, onNext }) {
  return (
    <div className="flex items-center justify-between mb-6 bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 p-4 rounded-lg">
      <Button variant="outline" size="icon" onClick={onPrevious} disabled={currentIndex === 0} className="h-8 w-8">
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <div className="flex items-center gap-2">
        {Array.from({ length: total }).map((_, index) => (
          <div
            key={index}
            className={cn(
              "h-2 w-2 rounded-full transition-colors",
              index === currentIndex ? "bg-primary" : "bg-muted-foreground/30",
            )}
          />
        ))}
      </div>
      <Button variant="outline" size="icon" onClick={onNext} disabled={currentIndex === total - 1} className="h-8 w-8">
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )
}

const ExamResults = () => {
  const [selectedSubject, setSelectedSubject] = useState(null)
  const [currentSemesterIndex, setCurrentSemesterIndex] = useState(0)
  const currentSemester = allSemesterResults[currentSemesterIndex]

  return (
    <div className="space-y-6">
      <SemesterNavigation
        currentIndex={currentSemesterIndex}
        total={allSemesterResults.length}
        onPrevious={() => setCurrentSemesterIndex((prev) => Math.max(0, prev - 1))}
        onNext={() => setCurrentSemesterIndex((prev) => Math.min(allSemesterResults.length - 1, prev + 1))}
      />

      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">SGPA</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">{currentSemester.sgpa}</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">CGPA</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-700 dark:text-purple-300">{currentSemester.cgpa}</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Subjects Cleared</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-700 dark:text-green-300">
              {currentSemester.subjectsCleared}
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Backlogs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-700 dark:text-red-300">{currentSemester.backlogs}</div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-gradient-to-br from-background to-muted/50">
        <CardHeader className="border-b">
          <CardTitle className="flex items-center justify-between">
            <span>
              {currentSemester.semester} • {currentSemester.course}
            </span>
            <Badge variant="outline" className="ml-2">
              {currentSemesterIndex === 0 ? "Current" : "Previous"} Semester
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-[600px] rounded-md">
            <Table>
              <TableHeader className="sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <TableRow>
                  <TableHead>Subject Code</TableHead>
                  <TableHead>Subject Name</TableHead>
                  <TableHead className="text-center">Grade</TableHead>
                  <TableHead className="text-center">Grade Point</TableHead>
                  <TableHead className="text-center">Credit Point</TableHead>
                  <TableHead className="text-center">Result</TableHead>
                  <TableHead className="text-center">Marks</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentSemester.subjects.map((subject) => (
                  <TableRow key={subject.code} className="hover:bg-muted/50">
                    <TableCell className="font-medium">{subject.code}</TableCell>
                    <TableCell>{subject.name}</TableCell>
                    <TableCell className="text-center">
                      <Badge className={cn("font-semibold", getGradeColor(subject.grade))}>{subject.grade}</Badge>
                    </TableCell>
                    <TableCell className="text-center">{subject.gradePoint}</TableCell>
                    <TableCell className="text-center">{subject.creditPoint}</TableCell>
                    <TableCell className="text-center">
                      <Badge variant={subject.result === "Pass" ? "default" : "destructive"}>{subject.result}</Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" onClick={() => setSelectedSubject(subject)}>
                            View Marks
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-3xl">
                          <DialogHeader>
                            <DialogTitle className="flex items-center justify-between">
                              <span>
                                {subject.name} ({subject.code})
                              </span>
                              <Badge className={cn("ml-2 font-semibold", getGradeColor(subject.grade))}>
                                Grade: {subject.grade}
                              </Badge>
                            </DialogTitle>
                          </DialogHeader>
                          <ScrollArea className="max-h-[600px]">
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Component</TableHead>
                                  <TableHead className="text-right">Maximum Marks</TableHead>
                                  <TableHead className="text-right">Marks Obtained</TableHead>
                                  <TableHead className="text-right">Percentage</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {subject.components.map((component, index) => {
                                  const percentage = (component.obtainedMarks / component.maxMarks) * 100
                                  return (
                                    <TableRow key={index}>
                                      <TableCell className="font-medium">{component.type}</TableCell>
                                      <TableCell className="text-right">{component.maxMarks}</TableCell>
                                      <TableCell className="text-right">
                                        <span
                                          className={cn(
                                            "px-2 py-1 rounded",
                                            percentage >= 75
                                              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                                              : percentage >= 60
                                              ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
                                              : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
                                          )}
                                        >
                                          {component.obtainedMarks}
                                        </span>
                                      </TableCell>
                                      <TableCell className="text-right">{percentage.toFixed(1)}%</TableCell>
                                    </TableRow>
                                  )
                                })}
                                <TableRow className="bg-muted/50 font-bold">
                                  <TableCell>Total</TableCell>
                                  <TableCell className="text-right">
                                    {subject.components.reduce((sum, comp) => sum + comp.maxMarks, 0)}
                                  </TableCell>
                                  <TableCell className="text-right">
                                    {subject.components.reduce((sum, comp) => sum + comp.obtainedMarks, 0)}
                                  </TableCell>
                                  <TableCell className="text-right">
                                    {(
                                      (subject.components.reduce((sum, comp) => sum + comp.obtainedMarks, 0) /
                                        subject.components.reduce((sum, comp) => sum + comp.maxMarks, 0)) *
                                      100
                                    ).toFixed(1)}
                                    %
                                  </TableCell>
                                </TableRow>
                              </TableBody>
                            </Table>
                          </ScrollArea>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}

export default ExamResults

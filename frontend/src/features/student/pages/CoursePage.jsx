import React from "react"
import { useParams, Navigate } from "react-router-dom"
import {CourseHeader} from "../components/courses/Header"
import {CourseAnnouncements} from "../components/courses/Announcements"
import {CourseFiles} from "../components/courses/Files"
import {CourseQuizzes} from "../components/courses/Quizzes"
import {CourseAssignments} from "../components/courses/Assignments"
import {CourseMeetings} from "../components/courses/Meetings"
import {CourseGrades} from "../components/courses/Grades"


const courses = [
  {
    id: "CS201",
    title: "Data Structures",
    instructor: "Prof. Amit Sinhal",
  },
  {
    id: "CS301",
    title: "Computer Networks",
    instructor: "Dr. R.K. Ghosh",
  },
  {
    id: "CS401",
    title: "Database Management",
    instructor: "Dr. Taruna Sunil",
  },
  {
    id: "CS501",
    title: "Data Science",
    instructor: "Dr. Arpan Gupta",
  },
]

export default function CoursePage() {
  const { courseId } = useParams()
  const course = courses.find((c) => c.id === courseId)

  if (!course) {
    return <Navigate to="/404" replace />
  }

  return (
    <div className="container max-w-7xl py-6 space-y-8">
      <CourseHeader title={course.title} code={course.id} instructor={course.instructor} />
      <div className="grid gap-6 md:grid-cols-2">
        <CourseAnnouncements />
        <CourseFiles />
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <CourseQuizzes />
        <CourseAssignments />
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <CourseMeetings />
        <CourseGrades />
      </div>
    </div>
  )
}


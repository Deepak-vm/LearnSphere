"use client"

import * as React from "react"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Check } from 'lucide-react'

// Course data with instructors
const courses = [
  {
    id: "cs101",
    name: "Data Structures",
    instructors: [
      { id: "i1", name: "Prof. Devendra Bhavsar" }
    ]
  },
  {
    id: "cs201",
    name: "Computer Networks",
    instructors: [
      { id: "i2", name: "Dr. R.K. Ghosh" }
    ]
  },
  {
    id: "cs301",
    name: "Database Management",
    instructors: [
      { id: "i3", name: "Dr. Taruna Sunil" },
      { id: "i4", name: "RD Sharma" }
    ]
  },
  {
    id: "cs401",
    name: "Data Science",
    instructors: [
      { id: "i5", name: "Dr. Arpan Gupta" },
      { id: "i6", name: "HC Verma" }
    ]
  }
]

export default function FeedbackForm() {
  const [selectedCourse, setSelectedCourse] = React.useState("")
  const [selectedInstructor, setSelectedInstructor] = React.useState("")
  const [courseRating, setCourseRating] = React.useState(0)
  const [instructorRating, setInstructorRating] = React.useState(0)
  const [relevanceRating, setRelevanceRating] = React.useState(0)
  const [courseComment, setCourseComment] = React.useState("")
  const [instructorComment, setInstructorComment] = React.useState("")
  const [isSubmitted, setIsSubmitted] = React.useState(false)
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  // Find the selected course object
  const selectedCourseObj = React.useMemo(() => 
    courses.find(course => course.id === selectedCourse), 
    [selectedCourse]
  )

  // When course changes, set the instructor automatically if there's only one
  React.useEffect(() => {
    if (selectedCourseObj) {
      if (selectedCourseObj.instructors.length === 1) {
        setSelectedInstructor(selectedCourseObj.instructors[0].id)
      } else {
        setSelectedInstructor("") // Reset if multiple instructors
      }
    } else {
      setSelectedInstructor("")
    }
  }, [selectedCourseObj])

  // Get the selected instructor name
  const selectedInstructorName = React.useMemo(() => {
    if (!selectedCourseObj || !selectedInstructor) return ""
    const instructor = selectedCourseObj.instructors.find(i => i.id === selectedInstructor)
    return instructor ? instructor.name : ""
  }, [selectedCourseObj, selectedInstructor])

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Basic validation
    if (!selectedCourse || !courseRating || !instructorRating || !relevanceRating || 
        !courseComment || !instructorComment) {
      alert("Please fill out all required fields")
      return
    }
    
    setIsSubmitting(true)
    
    // Simulate API call
    setTimeout(() => {
      console.log({
        course: selectedCourse,
        instructor: selectedInstructor,
        courseRating,
        instructorRating,
        relevanceRating,
        courseComment,
        instructorComment
      })
      setIsSubmitting(false)
      setIsSubmitted(true)
    }, 1000)
  }

  return (
    <div className="px-4 py-6 md:px-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Course Feedback</h1>
        <p className="text-muted-foreground">
          Share your thoughts about the course and instructor to help us improve.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <Label htmlFor="course" className="block mb-2">
              Course <span className="text-destructive">*</span>
            </Label>
            <Select 
              value={selectedCourse} 
              onValueChange={setSelectedCourse}
              disabled={isSubmitted}
            >
              <SelectTrigger id="course" className="w-full">
                <SelectValue placeholder="Select course..." />
              </SelectTrigger>
              <SelectContent>
                {courses.map(course => (
                  <SelectItem key={course.id} value={course.id}>
                    {course.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="instructor" className="block mb-2">
              Course Instructor
            </Label>
            {!selectedCourseObj ? (
              <div className="h-10 px-3 py-2 border rounded-md bg-muted/50 flex items-center">
                Select a course first
              </div>
            ) : selectedCourseObj.instructors.length === 1 ? (
              <div className="h-10 px-3 py-2 border rounded-md bg-muted/50 flex items-center">
                {selectedCourseObj.instructors[0].name}
              </div>
            ) : (
              <Select 
                value={selectedInstructor} 
                onValueChange={setSelectedInstructor}
                disabled={isSubmitted}
              >
                <SelectTrigger id="instructor" className="w-full">
                  <SelectValue placeholder="Select instructor..." />
                </SelectTrigger>
                <SelectContent>
                  {selectedCourseObj.instructors.map(instructor => (
                    <SelectItem key={instructor.id} value={instructor.id}>
                      {instructor.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
        </div>

        <div className="space-y-8">
          <div className="space-y-2">
            <Label className="block">
              How would you rate the overall course content and structure? <span className="text-destructive">*</span>
            </Label>
            <div className="flex items-center">
              <span className="text-sm text-muted-foreground w-16">Poor</span>
              <div className="flex-1 flex justify-between items-center">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((number) => (
                  <button
                    key={number}
                    type="button"
                    onClick={() => !isSubmitted && setCourseRating(number)}
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      courseRating === number 
                        ? "bg-primary text-primary-foreground" 
                        : "bg-background border border-input"
                    }`}
                    disabled={isSubmitted}
                  >
                    {number}
                  </button>
                ))}
              </div>
              <span className="text-sm text-muted-foreground w-16 text-right">Excellent</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="block">
              How effective was the instructor's teaching? <span className="text-destructive">*</span>
            </Label>
            <div className="flex items-center">
              <span className="text-sm text-muted-foreground w-16">Not Effective</span>
              <div className="flex-1 flex justify-between items-center">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((number) => (
                  <button
                    key={number}
                    type="button"
                    onClick={() => !isSubmitted && setInstructorRating(number)}
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      instructorRating === number 
                        ? "bg-primary text-primary-foreground" 
                        : "bg-background border border-input"
                    }`}
                    disabled={isSubmitted}
                  >
                    {number}
                  </button>
                ))}
              </div>
              <span className="text-sm text-muted-foreground w-16 text-right">Very Effective</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="block">
              How relevant was the course content to your learning goals? <span className="text-destructive">*</span>
            </Label>
            <div className="flex items-center">
              <span className="text-sm text-muted-foreground w-16">Not Relevant</span>
              <div className="flex-1 flex justify-between items-center">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((number) => (
                  <button
                    key={number}
                    type="button"
                    onClick={() => !isSubmitted && setRelevanceRating(number)}
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      relevanceRating === number 
                        ? "bg-primary text-primary-foreground" 
                        : "bg-background border border-input"
                    }`}
                    disabled={isSubmitted}
                  >
                    {number}
                  </button>
                ))}
              </div>
              <span className="text-sm text-muted-foreground w-16 text-right">Very Relevant</span>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="valuable-aspects" className="block">
              What aspects of the course content and learning experience were most valuable?
              <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="valuable-aspects"
              placeholder="Share your thoughts about the course content, structure, and learning experience..."
              className="min-h-[120px]"
              value={courseComment}
              onChange={(e) => !isSubmitted && setCourseComment(e.target.value)}
              disabled={isSubmitted}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="instructor-contribution" className="block">
              How did the instructor contribute to your learning experience?
              <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="instructor-contribution"
              placeholder="Share your thoughts about the instructor's teaching style, clarity, and effectiveness..."
              className="min-h-[120px]"
              value={instructorComment}
              onChange={(e) => !isSubmitted && setInstructorComment(e.target.value)}
              disabled={isSubmitted}
              required
            />
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <Button 
            type="submit" 
            className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-3"
            disabled={isSubmitting || isSubmitted}
          >
            {isSubmitting ? "Submitting..." : isSubmitted ? (
              <span className="flex items-center">
                Submitted <Check className="ml-2 h-4 w-4" />
              </span>
            ) : "Submit Feedback"}
          </Button>
        </div>
      </form>
    </div>
  )
}


import React, { useState } from "react"
import { useNavigate, Link } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Trash2, ArrowLeft } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function CourseCreation() {
  const navigate = useNavigate()
  const [isSubmitted, setIsSubmitted] = useState(false)

  // Course basic details
  const [courseTitle, setCourseTitle] = useState("CS101: Course Name")
  const [hoursPerWeek, setHoursPerWeek] = useState("L-T-P: 3-1-2")
  const [credits, setCredits] = useState("4")
  const [eligibleStudents, setEligibleStudents] = useState("B. Tech II Sem (All Branches)")
  const [evaluation, setEvaluation] = useState("Theory - 60%, Lab - 40%")

  // Course objective
  const [courseObjective, setCourseObjective] = useState(
    "Course Objective"
  )

  // Course outcomes
  const [courseOutcomes, setCourseOutcomes] = useState([
    "understand and apply fundamental computing concepts and principles.",
    "Course Outcome",
  ])

  // Evaluation components
  const [evaluationComponents, setEvaluationComponents] = useState([
    { id: 1, srNo: "01", specification: "Attendance", marks: "5" },
    { id: 2, srNo: "02", specification: "Assignment", marks: "10" },
    { id: 3, srNo: "03", specification: "Class Participation", marks: "5" },
    { id: 4, srNo: "04", specification: "Quiz", marks: "10" },
    { id: 5, srNo: "05", specification: "Mid-Term Exam", marks: "20" },
    { id: 6, srNo: "06", specification: "Final Exam", marks: "30" },
    { id: 7, srNo: "07", specification: "Lab Work", marks: "15" },
    { id: 8, srNo: "08", specification: "Lab Exam", marks: "5" },
    { id: 9, srNo: "09", specification: "Course Portfolio", marks: "Nil" },
  ])

  // Syllabus
  const [syllabus, setSyllabus] = useState(
    "Course Syllabus"
  )

  // Custom columns
  const [customColumns, setCustomColumns] = useState([])

  // Add a new outcome
  const addOutcome = () => {
    setCourseOutcomes([...courseOutcomes, ""])
  }

  // Update an outcome
  const updateOutcome = (index, value) => {
    const updatedOutcomes = [...courseOutcomes]
    updatedOutcomes[index] = value
    setCourseOutcomes(updatedOutcomes)
  }

  // Remove an outcome
  const removeOutcome = (index) => {
    const updatedOutcomes = [...courseOutcomes]
    updatedOutcomes.splice(index, 1)
    setCourseOutcomes(updatedOutcomes)
  }

  // Add a new evaluation component
  const addEvaluationComponent = () => {
    const newId = evaluationComponents.length > 0 ? Math.max(...evaluationComponents.map((comp) => comp.id)) + 1 : 1
    const newSrNo = (evaluationComponents.length + 1).toString().padStart(2, "0")

    setEvaluationComponents([...evaluationComponents, { id: newId, srNo: newSrNo, specification: "", marks: "Nil" }])
  }

  // Update an evaluation component
  const updateEvaluationComponent = (id, field, value) => {
    const updatedComponents = evaluationComponents.map((comp) => (comp.id === id ? { ...comp, [field]: value } : comp))
    setEvaluationComponents(updatedComponents)
  }

  // Remove an evaluation component
  const removeEvaluationComponent = (id) => {
    setEvaluationComponents(evaluationComponents.filter((comp) => comp.id !== id))
  }

  // Add a new custom column
  const addCustomColumn = () => {
    setCustomColumns([...customColumns, { title: "", content: "" }])
  }

  // Update a custom column
  const updateCustomColumn = (index, field, value) => {
    const updatedColumns = [...customColumns]
    updatedColumns[index] = { ...updatedColumns[index], [field]: value }
    setCustomColumns(updatedColumns)
  }

  // Remove a custom column
  const removeCustomColumn = (index) => {
    const updatedColumns = [...customColumns]
    updatedColumns.splice(index, 1)
    setCustomColumns(updatedColumns)
  }

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitted(true)

    // Redirect after a short delay to simulate processing
    setTimeout(() => {
      navigate("/teacher/dashboard")
    }, 2000)
  }

  return (
    <div className="container max-w-4xl py-6">
      <div className="flex items-center mb-6">
        <Link to="/teacher/dashboard" className="mr-4">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">{isSubmitted ? "Course Submitted" : "Create New Course"}</h1>
      </div>

      {isSubmitted ? (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-8 w-8"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold mb-2">Course Successfully Submitted</h2>
              <p className="text-muted-foreground mb-6">Your course has been created and is now pending approval.</p>
              <Button onClick={() => navigate("/teacher/dashboard")}>Return to Courses</Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Course Description</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium w-1/3">Course Title and Code:</TableCell>
                    <TableCell>
                      <Input
                        value={courseTitle}
                        onChange={(e) => setCourseTitle(e.target.value)}
                        placeholder="e.g. CS101: Introduction to Computer Science"
                        required
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Hours per Week</TableCell>
                    <TableCell>
                      <Input
                        value={hoursPerWeek}
                        onChange={(e) => setHoursPerWeek(e.target.value)}
                        placeholder="e.g. L-T-P: 3-1-2"
                        required
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Credits</TableCell>
                    <TableCell>
                      <Input
                        value={credits}
                        onChange={(e) => setCredits(e.target.value)}
                        placeholder="e.g. 4"
                        required
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Students who can take</TableCell>
                    <TableCell>
                      <Input
                        value={eligibleStudents}
                        onChange={(e) => setEligibleStudents(e.target.value)}
                        placeholder="e.g. B. Tech II Sem (All Branches)"
                        required
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Evaluation</TableCell>
                    <TableCell>
                      <Input
                        value={evaluation}
                        onChange={(e) => setEvaluation(e.target.value)}
                        placeholder="e.g. Theory - 60%, Lab - 40%"
                        required
                      />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Course Objective</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={courseObjective}
                onChange={(e) => setCourseObjective(e.target.value)}
                placeholder="Describe the main objective of this course..."
                className="min-h-[120px]"
                required
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Course Outcomes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                On successful completion of this course, the students will be able to:
              </p>

              {courseOutcomes.map((outcome, index) => (
                <div key={index} className="flex items-start gap-2">
                  <div className="mt-2 flex-shrink-0 w-6 text-center">{index + 1}.</div>
                  <Textarea
                    value={outcome}
                    onChange={(e) => updateOutcome(index, e.target.value)}
                    placeholder={`Outcome ${index + 1}`}
                    className="flex-1"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeOutcome(index)}
                    disabled={courseOutcomes.length <= 1}
                    className="flex-shrink-0 mt-2"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}

              <Button type="button" variant="outline" onClick={addOutcome} className="mt-2">
                <Plus className="h-4 w-4 mr-2" />
                Add Outcome
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Evaluation Components</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-16">Sr. No.</TableHead>
                    <TableHead>Specifications</TableHead>
                    <TableHead className="w-24 text-center">Marks</TableHead>
                    <TableHead className="w-16"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {evaluationComponents.map((component) => (
                    <TableRow key={component.id}>
                      <TableCell>{component.srNo}</TableCell>
                      <TableCell>
                        <Input
                          value={component.specification}
                          onChange={(e) => updateEvaluationComponent(component.id, "specification", e.target.value)}
                          placeholder="Component name"
                          required
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          value={component.marks}
                          onChange={(e) => updateEvaluationComponent(component.id, "marks", e.target.value)}
                          placeholder="Marks"
                          required
                          className="text-center"
                        />
                      </TableCell>
                      <TableCell>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeEvaluationComponent(component.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell colSpan={2} className="text-right font-bold">
                      Total (100)
                    </TableCell>
                    <TableCell className="text-center font-bold">100</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableBody>
              </Table>

              <Button type="button" variant="outline" onClick={addEvaluationComponent} className="mt-4">
                <Plus className="h-4 w-4 mr-2" />
                Add Component
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Syllabus</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={syllabus}
                onChange={(e) => setSyllabus(e.target.value)}
                placeholder="Enter the course syllabus with topics and subtopics..."
                className="min-h-[200px]"
                required
              />
            </CardContent>
          </Card>

          {customColumns.map((column, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>
                  <Input
                    value={column.title}
                    onChange={(e) => updateCustomColumn(index, "title", e.target.value)}
                    placeholder="Column Title"
                    className="border-0 p-0 text-xl font-bold focus-visible:ring-0"
                  />
                </CardTitle>
                <Button type="button" variant="ghost" size="icon" onClick={() => removeCustomColumn(index)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={column.content}
                  onChange={(e) => updateCustomColumn(index, "content", e.target.value)}
                  placeholder="Enter content for this section..."
                  className="min-h-[120px]"
                />
              </CardContent>
            </Card>
          ))}

          <Button type="button" variant="outline" onClick={addCustomColumn} className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Add Custom Column
          </Button>

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={() => navigate("/teacher/dashboard")}>
              Cancel
            </Button>
            <Button type="submit">Submit Course</Button>
          </div>
        </form>
      )}
    </div>
  )
}
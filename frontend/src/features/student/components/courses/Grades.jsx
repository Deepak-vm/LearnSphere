import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const grades = [
  { id: 1, title: "Assignment 1", score: 92, totalPoints: 100 },
  { id: 2, title: "Quiz 1", score: 18, totalPoints: 20 },
  { id: 3, title: "Midterm Exam", score: 85, totalPoints: 100 },
  { id: 4, title: "Assignment 2", score: 88, totalPoints: 100 },
]

export function CourseGrades() {
  const totalScore = grades.reduce((sum, grade) => sum + grade.score, 0)
  const totalPoints = grades.reduce((sum, grade) => sum + grade.totalPoints, 0)
  const overallPercentage = ((totalScore / totalPoints) * 100).toFixed(2)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Grades</CardTitle>
        <CardDescription>Your current grades and overall performance</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {grades.map((grade) => (
            <div key={grade.id} className="flex items-center justify-between">
              <p className="font-medium">{grade.title}</p>
              <p className="text-sm">
                {grade.score}/{grade.totalPoints} ({((grade.score / grade.totalPoints) * 100).toFixed(2)}%)
              </p>
            </div>
          ))}
          <div className="pt-4 border-t">
            <div className="flex items-center justify-between font-semibold">
              <p>Overall Grade</p>
              <p>{overallPercentage}%</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}


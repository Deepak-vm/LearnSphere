import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Download } from "lucide-react"
import { Button } from "@/components/ui/button"

const files = [
  { id: 1, name: "Lecture Notes Week 1", type: "PDF", size: "2.3 MB" },
  { id: 2, name: "Assignment 1 Guidelines", type: "DOCX", size: "567 KB" },
  { id: 3, name: "Course Syllabus", type: "PDF", size: "1.1 MB" },
  { id: 4, name: "Project Resources", type: "ZIP", size: "15.2 MB" },
]

export function CourseFiles() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Course Files</CardTitle>
        <CardDescription>Access course materials and resources</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {files.map((file) => (
            <div key={file.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <FileText className="h-6 w-6 text-blue-500" />
                <div>
                  <p className="font-medium">{file.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {file.type} • {file.size}
                  </p>
                </div>
              </div>
              <Button variant="ghost" size="icon">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}


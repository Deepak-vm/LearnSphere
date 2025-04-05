
import ExamResults from "../components/exams/ExamResults"

const ExamResultsPage=()=> {
    return (
      <div className="container py-6 space-y-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">Exam Results</h1>
          <p className="text-muted-foreground">View your semester results and detailed component marks</p>
        </div>
        <ExamResults />
      </div>
    )
  }
  
export default ExamResultsPage
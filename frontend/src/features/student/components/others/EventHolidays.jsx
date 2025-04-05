import { Calendar } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import  AcademicCalender from "@/assets/images/AcademicCalender.png";

const eventsData = [
  { date: "Feb 26", event: "Maha Shivratri", type: "holiday" },
  { date: "March 7", event: "Hack JKLU v4", type: "event" },
  { date: "March 14", event: "Holi", type: "holiday" },
  { date: "March 20", event: "Project Submission", type: "deadline" },
]

const CalendarDialog=()=> {
  return (
    <DialogContent className="max-w-7xl">
      <DialogHeader>
        <DialogTitle>Academic Calendar - Even Semester 2024-25</DialogTitle>
      </DialogHeader>
      <div className="relative w-full aspect-[2.1]">
        <img
          src={AcademicCalender}
          alt="Academic Calendar"
          fill
          className="object-contain"
          priority
        />
      </div>
    </DialogContent>
  )
}

const EventsHolidays=()=> {
  return (
    <div className="bg-card rounded-xl shadow-sm p-6">
      <div className="flex items-center gap-2 mb-6">
        <Calendar className="h-5 w-5 text-muted-foreground" />
        <h2 className="text-2xl font-semibold">Events & Holidays</h2>
      </div>
      <div className="space-y-4">
        {eventsData.map((item, index) => (
          <div key={index} className="flex items-center p-3 bg-muted/50 rounded-lg hover:bg-muted/80 transition-colors">
            <div className="w-20 flex-shrink-0">
              <span className="text-sm font-semibold text-primary">{item.date}</span>
            </div>
            <div className="flex-1 flex items-center justify-between">
              <span className="text-sm font-medium">{item.event}</span>
              <span
                className={cn(
                  "text-xs px-2 py-1 rounded-full",
                  item.type === "holiday" && "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
                  item.type === "event" && "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
                  item.type === "deadline" &&
                    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
                )}
              >
                {item.type}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 flex justify-center">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full max-w-sm">
              View Academic Calendar
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </DialogTrigger>
          <CalendarDialog />
        </Dialog>
      </div>
    </div>
  )
}

export { EventsHolidays  , CalendarDialog}
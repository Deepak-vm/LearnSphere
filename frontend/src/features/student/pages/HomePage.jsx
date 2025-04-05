import { AttendanceOverview } from "../components/attendance/AttendanceOverview"
import { CourseSlider } from "../components/courses/CourseSlider"
import  TodaySchedule  from "../components/others/TodaySchedule"
// import { EventsHolidays } from "../components/others/EventsHolidays"
// import { Notifications } from "../components/dashboard/Notifications"

export default function DashboardPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-1">
        <AttendanceOverview />
      </div>
      <div className="lg:col-span-2">
        <CourseSlider />
      </div>
      <div className="lg:col-span-1">
        <TodaySchedule />
      </div>
      <div className="lg:col-span-1">
        {/* <EventsHolidays /> */}
      </div>
      <div className="lg:col-span-1">
        {/* <Notifications /> */}
      </div>
    </div>
  )
}


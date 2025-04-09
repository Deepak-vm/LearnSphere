import {TeacherInfo} from "../components/dashboard/TeacherInfo"
import { CourseSlider } from "../components/courses/CourseSlider"
import { TodaySchedule } from "../components/dashboard/TodaySchedule"



export function HomePage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="col-span-1 md:col-span-2 lg:col-span-3">
        <TeacherInfo />
      </div>
      <div className="lg:col-span-1">
        <TodaySchedule />
      </div>
      <div className="lg:col-span-2">
        <CourseSlider />
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


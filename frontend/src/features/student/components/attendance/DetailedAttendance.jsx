import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronRight, Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

// Sample attendance data
const attendanceData = [
  {
    code: "CC1106",
    title: "Critical Thinking for Decisions",
    totalLectures: 15,
    present: 12,
    absent: 3,
    activities: [
      { name: "LECTURE", percentage: 80 },
      { name: "TUTORIAL", percentage: 75 },
    ],
  },
  {
    code: "CS1205",
    title: "Mobile Application Development",
    totalLectures: 20,
    present: 18,
    absent: 2,
    activities: [
      { name: "LECTURE", percentage: 90 },
      { name: "PRACTICAL", percentage: 85 },
    ],
  },
  {
    code: "CS1113",
    title: "Software Engineering",
    totalLectures: 18,
    present: 15,
    absent: 3,
    activities: [
      { name: "LECTURE", percentage: 83 },
      { name: "PRACTICAL", percentage: 80 },
    ],
  },
  {
    code: "CS1114",
    title: "Database Management Systems",
    totalLectures: 16,
    present: 14,
    absent: 2,
    activities: [
      { name: "LECTURE", percentage: 87.5 },
      { name: "PRACTICAL", percentage: 81 },
    ],
  },
  {
    code: "MA1101",
    title: "Mathematics for Computer Science",
    totalLectures: 22,
    present: 20,
    absent: 2,
    activities: [
      { name: "LECTURE", percentage: 91 },
      { name: "TUTORIAL", percentage: 88 },
    ],
  },
];

function getAttendanceColor(percentage) {
  if (percentage >= 90) return "text-green-500 dark:text-green-400";
  if (percentage >= 75) return "text-yellow-500 dark:text-yellow-400";
  return "text-red-500 dark:text-red-400";
}

function getCircleColor(percentage) {
  if (percentage >= 90) return "#22C55E"; // green-500
  if (percentage >= 85) return "#10B981"; // emerald-500
  if (percentage >= 80) return "#14B8A6"; // teal-500
  if (percentage >= 75) return "#F59E0B"; // amber-500
  if (percentage >= 70) return "#F97316"; // orange-500
  return "#EF4444"; // red-500
}

export function DetailedAttendance() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full mt-4">
          View Detailed Attendance
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Detailed Attendance Report</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {attendanceData.map((course) => (
            <div key={course.code} className="space-y-4 p-4 rounded-lg border">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold flex items-center">
                    {course.title}
                    <span className="ml-2 px-2 py-1 bg-secondary text-secondary-foreground text-sm rounded-md">
                      {course.code}
                    </span>
                  </h3>
                </div>
                <div className="relative w-16 h-16">
                  <svg className="transform -rotate-90 w-16 h-16">
                    <circle cx="32" cy="32" r="28" fill="none" stroke="#e5e7eb" strokeWidth="8" />
                    <circle
                      cx="32"
                      cy="32"
                      r="28"
                      fill="none"
                      stroke={getCircleColor((course.present / course.totalLectures) * 100)}
                      strokeWidth="8"
                      strokeDasharray={`${((course.present / course.totalLectures) * 175.93).toFixed(2)} 175.93`}
                      className="transition-all duration-1000 ease-out"
                      style={{
                        strokeDashoffset: `${((1 - course.present / course.totalLectures) * 175.93).toFixed(2)}`,
                      }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className={`text-sm font-bold ${getAttendanceColor((course.present / course.totalLectures) * 100)}`}>
                      {Math.round((course.present / course.totalLectures) * 100)}%
                    </span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Lectures</span>
                    <span className="font-medium">{course.totalLectures}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Present</span>
                    <span className="font-medium">{course.present}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Absent</span>
                    <span className="font-medium">{course.absent}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  {course.activities.map((activity) => (
                    <div key={activity.name} className="flex justify-between items-center">
                      <span className="text-blue-600">{activity.name}</span>
                      <div className="flex items-center">
                        <span className={`font-medium ${getAttendanceColor(activity.percentage)}`}>
                          {activity.percentage}%
                        </span>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8 ml-1">
                                <Info className="h-4 w-4" />
                                <span className="sr-only">More info</span>
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Attendance for {activity.name.toLowerCase()} sessions</p>
                              {activity.percentage < 75 && (
                                <p className="text-yellow-500 dark:text-yellow-400">
                                  Warning: Attendance below 75%
                                </p>
                              )}
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}

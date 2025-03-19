import React from "react";
import { DetailedAttendance } from "./DetailedAttendance";

export function AttendanceOverview() {
  return (
    <div className="bg-card rounded-xl shadow-sm p-6">
      <h2 className="text-2xl font-semibold mb-6">Attendance Overview</h2>
      <div className="flex flex-col space-y-6">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-lg">Overall Attendance:</span>
              <span className="text-lg text-green-500 font-medium">86%</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Total Classes: 91 | Attended: 79
            </p>
          </div>
          <div className="relative w-32 h-32">
            <svg className="w-full h-full -rotate-90">
              <circle
                cx="64"
                cy="64"
                r="56"
                fill="none"
                stroke="currentColor"
                strokeWidth="16"
                className="text-muted/20"
              />
              <circle
                cx="64"
                cy="64"
                r="56"
                fill="none"
                stroke="currentColor"
                strokeWidth="16"
                strokeDasharray="351.86"
                strokeDashoffset="49.26"
                className="text-green-500 transition-all duration-1000 ease-out progress-circle"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-semibold">86%</span>
            </div>
          </div>
        </div>
        <DetailedAttendance />
      </div>
    </div>
  );
}

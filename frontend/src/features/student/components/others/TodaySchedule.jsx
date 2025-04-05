import React, { useState, useEffect } from 'react';
import { Clock, X, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import pdf from "../../../../assets/images/time_table.jpeg"


const DetailedTimetable = () => <div>Detailed Timetable Component</div>;
const ProgressTimeline = ({ events }) => (
  <div className="flex flex-col h-full">
    {events.map((event, index) => (
      <div key={index} className="flex flex-col items-center">
        <div className={`w-3 h-3 rounded-full ${event.isComplete ? 'bg-green-500' : event.isCurrent ? 'bg-blue-500' : 'bg-gray-300'}`} />
        {index < events.length - 1 && <div className="w-0.5 h-20 bg-gray-300" />}
        <div className="text-xs text-gray-400 mt-1">{event.time.split('\n')[0]}</div>
      </div>
    ))}
  </div>
);

const scheduleData = [
  { time: "09:00\nAM", subject: "Data Structures", code: "CS201", room: "Room 101", activity: "LECTURE" },
  { time: "11:00\nAM", subject: "Web Development", code: "CS301", room: "Lab 2", activity: "PRACTICAL" },
  { time: "02:00\nPM", subject: "Database Management", code: "CS401", room: "Room 203", activity: "LECTURE" },
  { time: "04:00\nPM", subject: "Machine Learning", code: "CS501", room: "Lab 3", activity: "TUTORIAL" },
];

function getCurrentTimeIndex() {
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  const currentTime = currentHour * 60 + currentMinute;

  return scheduleData.findIndex((item) => {
    const [hour, minute] = item.time
      .split("\n")[0]
      .replace(/[AP]M/, "")
      .trim()
      .split(":")
      .map((n) => Number.parseInt(n));
    const itemHour = item.time.includes("PM") && hour !== 12 ? hour + 12 : hour;
    const itemTime = itemHour * 60 + minute;
    return currentTime < itemTime;
  });
}

function TodaySchedule() {
  const [currentIndex, setCurrentIndex] = useState(getCurrentTimeIndex());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex(getCurrentTimeIndex());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  const timelineEvents = scheduleData.map((item, index) => ({
    time: item.time,
    isComplete: index < currentIndex,
    isCurrent: index === currentIndex,
  }));

  return (
    <div className="bg-zinc-900 rounded-xl shadow-sm p-6">
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-purple-500 p-3 rounded-full">
          <Clock className="h-6 w-6 text-white" />
        </div>
        <h2 className="text-2xl font-semibold text-white">Today's Schedule</h2>
      </div>

      <div className="flex gap-8">
        <div className="w-24 relative">
          <ProgressTimeline events={timelineEvents} />
        </div>

        <div className="flex-1 text-white space-y-6 py-4">
          {scheduleData.map((item, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg transition-all ${
                index < currentIndex
                  ? "bg-zinc-800/50 text-zinc-400"
                  : index === currentIndex
                    ? "bg-gradient-to-r from-white/10 to-white/5 border border-white/20"
                    : "bg-zinc-800/80"
              }`}
            >
              <div className="text-lg font-medium">{item.subject}</div>
              <div className="text-sm mt-2 text-zinc-400 flex items-center gap-2">
                <span>{item.code}</span>
                <span>•</span>
                <span>{item.room}</span>
                <span>•</span>
                <span>{item.activity}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 flex gap-3">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="flex-1">
              View PDF Schedule
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Full Schedule (PDF)</DialogTitle>
            </DialogHeader>
            <div className="relative w-full aspect-[1.4]">
              <img
                src={pdf}
                alt="Timetable"
                className="object-contain w-full h-full"
              />
            </div>
          </DialogContent>
        </Dialog>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="flex-1">
              Timeline View
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl">
            <DialogHeader className="flex flex-row items-center justify-between">
              <DialogTitle>Weekly Schedule</DialogTitle>
              <DialogClose className="w-8 h-8 p-0">
                <X className="h-4 w-4" />
              </DialogClose>
            </DialogHeader>
            <div className="mt-4">
              <DetailedTimetable />
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

export default TodaySchedule;
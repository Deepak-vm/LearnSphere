"use client";
import { cn } from "@/lib/utils";

export function TimelineView({ events }) {
  return (
    <div className="min-h-[600px] bg-zinc-900 text-white p-6 rounded-lg">
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-purple-500 p-3 rounded-full">
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
            className="text-white"
          >
            <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
            <line x1="16" x2="16" y1="2" y2="6" />
            <line x1="8" x2="8" y1="2" y2="6" />
            <line x1="3" x2="21" y1="10" y2="10" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold">Timetable</h2>
      </div>
      <div className="relative">
        <div className="absolute left-[27px] top-3 bottom-3 w-0.5 bg-blue-500" />
        {events.map((event, index) => (
          <div key={index} className="flex gap-4 mb-8">
            <div className="relative z-10">
              <div
                className={cn(
                  "w-14 h-14 rounded-full flex items-center justify-center text-sm font-medium",
                  event.isComplete
                    ? "bg-green-500 text-white"
                    : event.isCurrent
                    ? "bg-blue-500 text-white"
                    : "bg-zinc-800 text-zinc-400"
                )}
              >
                {event.time}
              </div>
            </div>
            <div
              className={cn(
                "flex-1 bg-zinc-800 rounded-lg p-4",
                event.isCurrent && "ring-2 ring-blue-500"
              )}
            >
              <div className="flex flex-col gap-1">
                <div className="flex items-start justify-between">
                  <h3 className="font-semibold text-lg">
                    {event.title} ({event.code})
                  </h3>
                </div>
                <div className="flex items-center gap-4 text-sm text-zinc-400">
                  <span>Activity: {event.activity}</span>
                  <span>Room: {event.room}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

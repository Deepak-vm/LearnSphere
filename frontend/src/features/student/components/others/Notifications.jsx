import { Bell, AlertCircle, CheckCircle2, Info } from "lucide-react"
import { cn } from "@/lib/utils"

const notificationsData = [
  {
    type: "info",
    message: "Assignment submission deadline extended for Data Structures",
    time: "2 hours ago",
    dueDate: "Due: Jan 30, 2024",
  },
  {
    type: "warning",
    message: "Low attendance warning in Mathematics III",
    time: "1 day ago",
    dueDate: "Action needed by: Feb 15, 2024",
  },
  {
    type: "success",
    message: "Project presentation scheduled for next week",
    time: "2 days ago",
    dueDate: "Due: Feb 28, 2024",
  },
  {
    type: "info",
    message: "New study material uploaded for Computer Networks",
    time: "3 days ago",
    dueDate: "Review by: Feb 10, 2024",
  },
]

export function Notifications() {
  return (
    <div className="bg-card rounded-xl shadow-sm p-6">
      <div className="flex items-center gap-2 mb-6">
        <Bell className="h-5 w-5 text-muted-foreground" />
        <h2 className="text-2xl font-semibold">Notifications & Alerts</h2>
      </div>
      <div className="space-y-4">
        {notificationsData.map((notification, index) => (
          <div
            key={index}
            className={cn(
              "p-4 rounded-lg flex items-start space-x-3",
              notification.type === "warning" && "bg-yellow-100 dark:bg-yellow-900/30",
              notification.type === "success" && "bg-green-100 dark:bg-green-900/30",
              notification.type === "info" && "bg-blue-100 dark:bg-blue-900/30",
            )}
          >
            {notification.type === "warning" && (
              <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0" />
            )}
            {notification.type === "success" && (
              <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0" />
            )}
            {notification.type === "info" && (
              <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
            )}
            <div className="flex-1">
              <p
                className={cn(
                  "text-sm font-medium",
                  notification.type === "warning" && "text-yellow-800 dark:text-yellow-200",
                  notification.type === "success" && "text-green-800 dark:text-green-200",
                  notification.type === "info" && "text-blue-800 dark:text-blue-200",
                )}
              >
                {notification.message}
              </p>
              <div className="flex justify-between items-center mt-1">
                <p className="text-xs text-muted-foreground">{notification.time}</p>
                <p className="text-xs font-medium text-muted-foreground">{notification.dueDate}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}


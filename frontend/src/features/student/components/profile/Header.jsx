import { ChevronRight } from "lucide-react"

export function ProfileHeader() {
  return (
    <div className="flex items-center justify-between">
      <div className="space-y-1">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <span>home</span>
          <ChevronRight className="h-4 w-4" />
          <span>Profile</span>
        </div>
        <h1 className="text-2xl font-bold">RIYANSH VERMA</h1>
      </div>
    </div>
  )
}


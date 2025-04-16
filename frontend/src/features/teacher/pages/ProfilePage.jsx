import { ProfileHeader } from "../components/profile/Header"
import  ProfileSidebar  from "../components/profile/Sidebar"
// import { ProfileTabs } from "../components/profile/Tabs"

export default function ProfilePage() {
  return (
    <div className="container py-6">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-64 flex-shrink-0">
          <ProfileSidebar />
        </div>
        <div className="flex-1 space-y-6">
          <ProfileHeader />
          {/* <ProfileTabs /> */}
        </div>
      </div>
    </div>
  )
}


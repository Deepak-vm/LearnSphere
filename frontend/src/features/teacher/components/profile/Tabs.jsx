"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"


const academicDetails = {
  "Student Roll No": "2022BTech089",
  "Registration No": "BTech22/0774",
  "Physical Site": "IET-Institute of Engineering",
  Site: "IET-Institute of Engineering",
  "Batch Name": "CSE BTech 2022-...",
  "Academic Session": "SEMESTER 6",
  Class: "CLASS - 6 - 1",
  "Date of Admission": "20-06-2022",
}

const personalDetails = {
  "Date of Birth": "01-06-2004",
  Gender: "Male",
  "Email ID": "riyanshverma@jklu.edu.in",
  "Mobile Number": "9672784408",
  "Blood Group": "AB+",
  Nationality: "Indian",
  Religion: "Hindu",
  Caste: "OBC",
  Age: "20",
}

const emergencyDetails = {
  "Guardian Type": "",
  "Guardians Name": "",
  "Mobile Number": "",
  Landline: "",
  "Email ID": "",
  Address: "",
}

function DetailsSection({ title, data }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {Object.entries(data).map(([key, value]) => (
            <div key={key} className="grid grid-cols-2 gap-4">
              <div className="text-sm font-medium text-muted-foreground">{key}</div>
              <div className="text-sm font-medium">{value}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export function ProfileTabs() {
  return (
    <Tabs defaultValue="details" className="space-y-4">
      <TabsList>
        <TabsTrigger value="details">Details</TabsTrigger>
        <TabsTrigger value="qualifications">Qualifications</TabsTrigger>
        <TabsTrigger value="family">Family</TabsTrigger>
      </TabsList>
      <TabsContent value="details" className="space-y-4">
        <DetailsSection title="Academic Details" data={academicDetails} />
        <DetailsSection title="Personal Details" data={personalDetails} />
        <DetailsSection title="Emergency Guardian" data={emergencyDetails} />
      </TabsContent>
      <TabsContent value="qualifications">
        <Card>
          <CardHeader>
            <CardTitle>Educational Qualifications</CardTitle>
          </CardHeader>
          <CardContent>{/* Add educational qualifications content here */}</CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="family">
        <Card>
          <CardHeader>
            <CardTitle>Family Details</CardTitle>
          </CardHeader>
          <CardContent>{/* Add family details content here */}</CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

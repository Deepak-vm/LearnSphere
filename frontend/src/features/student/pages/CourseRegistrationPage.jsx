import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {CourseRegistrationHeader, CourseRegistrationTable, CreditSummary} from "../components/courses/CourseRegistration"

const CourseRegistration = () => {  
    return (
        <div className="container py-6 space-y-6">
          <CourseRegistrationHeader />
          <div className="grid gap-6 md:grid-cols-[2fr_1fr]">
            <div className="space-y-6">
              <CreditSummary />
              <Tabs defaultValue="current" className="w-full">
                <TabsList className="w-full justify-start">
                  <TabsTrigger value="current">Current Semester</TabsTrigger>
                  <TabsTrigger value="previous">Previous Semesters</TabsTrigger>
                  <TabsTrigger value="future">Future Semesters</TabsTrigger>
                </TabsList>
                <TabsContent value="current" className="mt-6">
                  <CourseRegistrationTable />
                </TabsContent>
                <TabsContent value="previous" className="mt-6">
                  <div className="text-center py-8 text-muted-foreground">No previous semester registrations available</div>
                </TabsContent>
                <TabsContent value="future" className="mt-6">
                  <div className="text-center py-8 text-muted-foreground">Future semester registration not yet open</div>
                </TabsContent>
              </Tabs>
            </div>
            {/* <PersonalDetails /> */}
          </div>
        </div>
      )
}

export default CourseRegistration
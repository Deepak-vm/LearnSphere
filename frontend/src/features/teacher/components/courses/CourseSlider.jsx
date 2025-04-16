import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronRight } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import  s1  from "@/assets/images/s1.jpeg";
import  s2 from "@/assets/images/s2.jpeg";
import  s3 from "@/assets/images/s3.jpeg";
import  s4 from "@/assets/images/s4.png";
import cd from "@/assets/Docs/courseDescription.pdf";
export function CourseSlider() {
  const navigate = useNavigate();
  const courses = [
    {
      id: "CS201",
      title: "Data Structures",
      code: "CS201",
      description: "Learn fundamental data structures and algorithms essential for computer science",
      credits: 4,
      type: "Core",
      image: s1,
      courseDescription: cd
    },
    {
      id: "CS301",
      title: "Computer Networks",
      code: "CS301",
      description: "Master modern networking concepts and protocols",
      credits: 4,
      type: "Core",
      image: s2,
      courseDescription: cd
    },
    {
      id: "CS401",
      title: "Database Management",
      code: "CS401",
      description: "Understanding database design, implementation and optimization",
      credits: 4,
      type: "Core",
      image: s3,
      courseDescription: cd
    },
    {
      id: "CS501",
      title: "Data Science",
      code: "CS501",
      description: "Introduction to data science algorithms and applications",
      credits: 3,
      type: "Department Elective",
      image: s4,
      courseDescription: cd
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">My Courses</h1>
          <p className="text-muted-foreground">Manage your active courses for this semester</p>
        </div>
        <Button onClick={() => {
          console.log("Navigating to create course page");
          navigate("/teacher/dashboard/createcourse");
        }}>
          <span className="mr-2">+</span>
          Create Course
        </Button>
      </div>
      <div className="relative px-12">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {courses.map((course) => (
              <CarouselItem key={course.id} className="md:basis-1/2 lg:basis-1/3">
                <div className="flex flex-col space-y-4 p-4">
                  <div className="relative w-full aspect-video rounded-lg overflow-hidden">
                    <img
                      src={course.image || "/placeholder.svg"}
                      alt={course.title}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-semibold">{course.title}</h3>
                      <Badge
                        variant={
                          course.type === "Core"
                            ? "default"
                            : course.type === "Department Elective"
                            ? "secondary"
                            : "outline"
                        }
                      >
                        {course.type}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {course.description}
                    </p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        Credits: {course.credits}
                      </span>
                      <span className="text-muted-foreground">{course.id}</span>
                    </div>
                    <div className="flex flex-col gap-2 mt-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" className="w-full">
                            Course Details
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>
                              {course.title} ({course.id})
                            </DialogTitle>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="relative w-full aspect-video rounded-lg overflow-hidden">
                              <img
                                src={course.image || "/placeholder.svg"}
                                alt={course.title}
                                className="object-cover w-full h-full"
                              />
                            </div>
                            <div className="space-y-4">
                              <div>
                                <h4 className="font-semibold mb-2">
                                  Course Description
                                </h4>
                                <p className="text-sm text-muted-foreground">
                                  {course.longDescription}
                                </p>
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <h4 className="font-semibold mb-2">
                                    Course Details
                                  </h4>
                                  <ul className="text-sm text-muted-foreground space-y-1">
                                    <li>Type: {course.type}</li>
                                    <li>Credits: {course.credits}</li>
                                    <li>Code: {course.code}</li>
                                    <a
                                      href={course.courseDescription}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      <Button variant="secondary" className="w-full">
                                        View Course Description
                                      </Button>
                                    </a>
                                  </ul>
                                </div>
                                {course.prerequisites && (
                                  <div>
                                    <h4 className="font-semibold mb-2">
                                      Prerequisites
                                    </h4>
                                    <ul className="text-sm text-muted-foreground space-y-1">
                                      {course.prerequisites.map((prereq) => (
                                        <li key={prereq}>{prereq}</li>
                                      ))}
                                    </ul>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                      <Button variant="default" className="w-full">
                        <Link to={`/teacher/dashboard/courses/${course.id}`} className="flex w-full items-center justify-between">
                          Open Course
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="-left-6 bg-background" />
          <CarouselNext className="-right-6 bg-background" />
        </Carousel>
      </div>
    </div>
  );
}
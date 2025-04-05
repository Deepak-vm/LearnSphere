import React, { useState } from "react";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Link } from "react-router-dom";
import  s1  from "../../../../assets/images/s1.jpeg";
import  s2 from "../../../../assets/images/s2.jpeg";
import  s3 from "../../../../assets/images/s3.jpeg";
import  s4 from "../../../../assets/images/s4.png";

const courses = [
  {
    id: "CS201",
    title: "Data Structures",
    description:
      "Learn fundamental data structures and algorithms essential for computer science",
    longDescription:
      "This course covers fundamental data structures and algorithms essential for computer science. Topics include arrays, linked lists, stacks, queues, trees, graphs, sorting algorithms, and algorithm analysis.",
    credits: 4,
    type: "Core",
    image: s1,      
    faculty: "Prof. Devendra Bhavsar",
    prerequisites: ["Programming Basics", "Discrete Mathematics"],
  },
  {
    id: "CS301",
    title: "Computer Networks",
    description: "Master modern networking concepts and protocols",
    longDescription:
      "Study computer networking from physical layer to application layer. Learn about TCP/IP, routing, switching, network security, and modern networking protocols.",
    credits: 4,
    type: "Core",
    image: s2,
    faculty: "Dr. R.K. Ghosh",
    prerequisites: ["Operating Systems"],
  },
  {
    id: "CS401",
    title: "Database Management",
    description:
      "Understanding database design, implementation and optimization",
    longDescription:
      "Learn about database management systems, SQL, normalization, transaction management, and database design principles. Hands-on experience with real-world database systems.",
    credits: 4,
    type: "Core",
    image: s3,
    faculty: "Dr. Taruna Sunil",
    prerequisites: ["Data Structures", "Discrete Mathematics"],
  },
  {
    id: "CS501",
    title: "Data Science",
    description: "Introduction to data science algorithms and applications",
    longDescription:
      "Explore data science concepts including data preprocessing, visualization, statistical analysis, machine learning algorithms, and practical applications using Python.",
    credits: 3,
    type: "Department Elective",
    image:s4,
    faculty: "Dr. Arpan Gupta",
  },
];

export function CourseSlider() {
  const [selectedCourse, setSelectedCourse] = useState(null);

  return (
    <div className="bg-card rounded-xl shadow-sm p-6">
      <h2 className="text-2xl font-semibold mb-6">Courses Enrolled</h2>
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
                                    <li>Faculty: {course.faculty}</li>
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
                      <Button variant="default" className="w-full" asChild>
                        <Link to={`/courses/${course.id}`}>
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
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, MessageSquare, Search, UserPlus, Smile } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { PlusCircle, FileUp, Calendar, MessageSquare , FileText, Plus, Upload, LinkIcon } from "lucide-react"


export function MaterialUploadForm({ onClose }) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  return (
    <div className="container max-w-4xl py-6">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="icon" onClick={onClose} className="mr-4">
          <X className="h-6 w-6" />
        </Button>
        <div className="flex items-center">
          <FileText className="h-6 w-6 mr-2 text-blue-500" />
          <h1 className="text-xl font-medium">Material</h1>
        </div>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="space-y-6">
            <div>
              <Input
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="text-lg border-0 border-b rounded-none px-0 focus-visible:ring-0"
              />
            </div>

            <div>
              <Textarea
                placeholder="Description (optional)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="min-h-[120px] border-0 focus-visible:ring-0 resize-none"
              />
              <div className="flex items-center gap-2 mt-2">
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <span className="font-bold">B</span>
                </Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <span className="italic">I</span>
                </Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <span className="underline">U</span>
                </Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
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
                    className="h-4 w-4"
                  >
                    <line x1="8" x2="21" y1="6" y2="6" />
                    <line x1="8" x2="21" y1="12" y2="12" />
                    <line x1="8" x2="21" y1="18" y2="18" />
                    <line x1="3" x2="3" y1="6" y2="6" />
                    <line x1="3" x2="3" y1="12" y2="12" />
                    <line x1="3" x2="3" y1="18" y2="18" />
                  </svg>
                </Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
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
                    className="h-4 w-4"
                  >
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardContent className="p-6">
          <h2 className="text-lg font-medium mb-4">Attach</h2>
          <div className="flex flex-wrap gap-6 justify-center">
            <Button variant="ghost" className="flex-col h-auto py-4 px-6">
              <div className="bg-blue-100 rounded-full p-3 mb-2">
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
                  className="h-6 w-6 text-blue-600"
                >
                  <path d="M9 17H7A5 5 0 0 1 7 7h2" />
                  <path d="M15 7h2a5 5 0 1 1 0 10h-2" />
                  <line x1="8" x2="16" y1="12" y2="12" />
                </svg>
              </div>
              <span>Drive</span>
            </Button>

            <Button variant="ghost" className="flex-col h-auto py-4 px-6">
              <div className="bg-red-100 rounded-full p-3 mb-2">
                <Youtube className="h-6 w-6 text-red-600" />
              </div>
              <span>YouTube</span>
            </Button>

            <Button variant="ghost" className="flex-col h-auto py-4 px-6">
              <div className="bg-green-100 rounded-full p-3 mb-2">
                <Plus className="h-6 w-6 text-green-600" />
              </div>
              <span>Create</span>
            </Button>

            <Button variant="ghost" className="flex-col h-auto py-4 px-6">
              <div className="bg-gray-100 rounded-full p-3 mb-2">
                <Upload className="h-6 w-6 text-gray-600" />
              </div>
              <span>Upload</span>
            </Button>

            <Button variant="ghost" className="flex-col h-auto py-4 px-6">
              <div className="bg-purple-100 rounded-full p-3 mb-2">
                <LinkIcon className="h-6 w-6 text-purple-600" />
              </div>
              <span>Link</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end mt-6 space-x-2">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button>Post</Button>
      </div>
    </div>
  )
}


const AnnouncementForm = () => {
  const [message, setMessage] = useState("")
  const [title, setTitle] = useState("")

  const insertEmoji = (emoji) => {
    setMessage(prev => prev + emoji)
  }

  return (
    <Card>
      <CardContent className="p-4 space-y-4">
        <div className="space-y-2">
          <Input
            placeholder="Announcement title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-0 border-b rounded-none focus-visible:ring-0 px-0 text-lg font-medium"
          />
        </div>
        <div className="relative">
          <Textarea
            placeholder="Write your announcement here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="min-h-[120px] resize-none pr-10"
          />
          <div className="absolute bottom-3 right-3">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                  <Smile className="h-5 w-5 text-muted-foreground" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-64 p-2" align="end">
                <div className="grid grid-cols-8 gap-1">
                  {emojis.map((emoji, index) => (
                    <Button key={index} variant="ghost" className="h-8 w-8 p-0" onClick={() => insertEmoji(emoji)}>
                      {emoji}
                    </Button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <div className="flex justify-end space-x-2">
          <Button variant="outline">Cancel</Button>
          <Button>Post</Button>
        </div>
      </CardContent>
    </Card>
  )
}

export function PeopleList() {
  const [searchQuery, setSearchQuery] = useState("")

  const teachers = [
    {
      id: "t1",
      name: "Amit Sinhal",
      role: "Professor",
      avatar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-0xgsE5wSrzrWg1x37y6NEhOQTABhFK.png",
    },
    {
      id: "t2",
      name: "TA",
      role: "TA",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  const students = [
    {
      id: "s1",
      name: "Deepak",
      email: "deepak@learnsphere.edu",
      role: "Student",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "s2",
      name: "Nikhil Pareek",
      email: "nikhil@university.eduß",
      role: "Student",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "s3",
      name: "Riyansh Verma",
      email: "riyansh@university.edu",
      role: "Student",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  const filteredTeachers = teachers.filter((teacher) => teacher.name.toLowerCase().includes(searchQuery.toLowerCase()))

  const filteredStudents = students.filter((student) => student.name.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>People</CardTitle>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export List
          </Button>
          <Button>
            <UserPlus className="mr-2 h-4 w-4" />
            Add People
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search people..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Tabs defaultValue="all">
          <TabsList className="mb-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="teachers">Teachers</TabsTrigger>
            <TabsTrigger value="students">Students</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-2">Teachers</h3>
                <Separator className="mb-4" />
                <div className="space-y-4">
                  {filteredTeachers.map((teacher) => (
                    <div key={teacher.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={teacher.avatar} alt={teacher.name} />
                          <AvatarFallback>{teacher.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{teacher.name}</p>
                          <p className="text-sm text-muted-foreground">{teacher.email}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon">
                        <MessageSquare className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2">Classmates</h3>
                <Separator className="mb-4" />
                <div className="space-y-4">
                  {filteredStudents.map((student) => (
                    <div key={student.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={student.avatar} alt={student.name} />
                          <AvatarFallback>{student.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{student.name}</p>
                          <p className="text-sm text-muted-foreground">{student.email}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon">
                        <MessageSquare className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="teachers">
            <div className="space-y-4">
              {filteredTeachers.map((teacher) => (
                <div key={teacher.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={teacher.avatar} alt={teacher.name} />
                      <AvatarFallback>{teacher.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{teacher.name}</p>
                      <p className="text-sm text-muted-foreground">{teacher.email}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon">
                    <MessageSquare className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="students">
            <div className="space-y-4">
              {filteredStudents.map((student) => (
                <div key={student.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={student.avatar} alt={student.name} />
                      <AvatarFallback>{student.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{student.name}</p>
                      <p className="text-sm text-muted-foreground">{student.email}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon">
                    <MessageSquare className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}


const TeacherQuickActions =()=> {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-3">
        <Button variant="outline" className="h-auto flex-col py-4 px-2 space-y-2">
          <PlusCircle className="h-6 w-6" />
          <span className="text-xs">Create Course</span>
        </Button>

        <Button variant="outline" className="h-auto flex-col py-4 px-2 space-y-2">
          <MessageSquare className="h-6 w-6" />
          <span className="text-xs">Post Announcement</span>
        </Button>

        <Button variant="outline" className="h-auto flex-col py-4 px-2 space-y-2">
          <FileUp className="h-6 w-6" />
          <span className="text-xs">Upload Materials</span>
        </Button>

        <Button variant="outline" className="h-auto flex-col py-4 px-2 space-y-2">
          <Calendar className="h-6 w-6" />
          <span className="text-xs">Schedule Meeting</span>
        </Button>
      </CardContent>
    </Card>
  )
}

export { AnnouncementForm, PeopleList , TeacherQuickActions , MaterialUploadForm }
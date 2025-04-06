import React from "react"


  
  export function CourseHeader({ title, code, instructor }) {
    return (
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold">{title}</h1>
          <p className="text-xl text-muted-foreground">
            {code} • {instructor}
          </p>
        </div>
      </div>
    )
  }
  
  

import React from "react";
import NotFoundImage from "@/assets/images/image.png"; // Update the path to your image

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <img src={NotFoundImage} alt="404 Not Found" className="max-w-md" />
      <h1 className="text-2xl font-bold mt-4">Oops! Something Went Wrong.</h1>
      <p className="text-gray-600 mt-2">Error 404: Page Not Found</p>
    </div>
  );
}
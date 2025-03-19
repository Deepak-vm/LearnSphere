import { useNavigate } from 'react-router-dom';
import logo from "../assets/images/learnsphere-logo.png";

export default function ProfileSelectionPage() {
  const navigate = useNavigate();
  
  const handleUserTypeSelect = (type) => {
    navigate(`/login?type=${type}`);
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
      <div className="text-center mb-8">
        <img 
          src={logo}
          alt="LearnSphere Logo" 
          className="mx-auto mb-6 rounded-full w-32 h-32"
        />
        <h1 className="text-4xl font-bold mb-2">Who's using LearnSphere?</h1>
        <p className="text-gray-400">
          Select your profile to access personalized learning resources and tools.
        </p>
      </div>
      
      <div className="flex flex-wrap justify-center gap-6 max-w-4xl">
        <div 
          onClick={() => handleUserTypeSelect('student')}
          className="w-60 p-6 bg-black border border-gray-800 rounded-lg cursor-pointer hover:bg-gray-900 transition-all"
        >
          <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl font-bold">S</span>
          </div>
          <h2 className="text-xl font-semibold text-center">Student</h2>
        </div>
        
        <div 
          onClick={() => handleUserTypeSelect('teacher')}
          className="w-60 p-6 bg-black border border-gray-800 rounded-lg cursor-pointer hover:bg-gray-900 transition-all"
        >
          <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl font-bold">T</span>
          </div>
          <h2 className="text-xl font-semibold text-center">Teacher</h2>
        </div>
        
        <div 
          onClick={() => handleUserTypeSelect('admin')}
          className="w-60 p-6 bg-black border border-gray-800 rounded-lg cursor-pointer hover:bg-gray-900 transition-all"
        >
          <div className="w-16 h-16 rounded-full bg-purple-500 flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl font-bold">A</span>
          </div>
          <h2 className="text-xl font-semibold text-center">Admin</h2>
        </div>
      </div>
    </div>
  );
}
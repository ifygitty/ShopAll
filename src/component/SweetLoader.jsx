import { FaRegSmile } from "react-icons/fa";

const SweetLoader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/70 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4">
  
        <div className="relative w-20 h-20">
 
          <div className="absolute inset-0 rounded-full border-4 border-blue-200 animate-spin border-t-blue-600" />

   
          <div className="absolute inset-3 rounded-full bg-blue-100/40 blur-sm" />

          <div className="absolute inset-0 flex items-center justify-center">
            <FaRegSmile className="text-blue-600 text-2xl animate-pulse" />
          </div>
        </div>


        <p className="text-sm font-medium text-gray-600 tracking-wide animate-pulse">
          Please wait…
        </p>
      </div>
    </div>
  );
};

export default SweetLoader;

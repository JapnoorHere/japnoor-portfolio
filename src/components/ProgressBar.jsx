import React, { useEffect, useState } from 'react';

const ProgressBar = ({ percentage, color }) => {
  const [width, setWidth] = useState(0);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setWidth(percentage);
    }, 100);
    
    return () => clearTimeout(timer);
  }, [percentage]);
  
  return (
    <div className="w-full h-3 bg-gray-800/50 rounded-full mt-2 overflow-hidden backdrop-blur-md border border-gray-700/50">
      <div 
        className="h-full rounded-full transition-all duration-1000 ease-out relative overflow-hidden"
        style={{ 
          width: `${width}%`, 
          backgroundColor: color,
          boxShadow: `0 0 10px ${color}40`
        }}
      >
        
        <div className="absolute top-0 left-0 right-0 bottom-0 w-full h-full overflow-hidden">
          <div className="absolute top-0 left-0 right-0 bottom-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;

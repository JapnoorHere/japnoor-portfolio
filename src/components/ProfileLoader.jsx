import React from 'react';

const ProfileLoader = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-[#1E1E1E] rounded-full">
      <div className="relative h-20 w-20">
        <div className="h-full w-full rounded-full bg-gradient-to-r from-[#4b633b]/30 to-[#4b633b] animate-pulse"></div>
        <div className="absolute inset-2 rounded-full bg-[#1E1E1E]"></div>
        <div className="absolute h-3 w-3 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#4b633b] rounded-full"></div>
        <div className="absolute top-0 left-0 h-full w-full border-2 border-[#4b633b]/50 rounded-full animate-ping opacity-75"></div>
      </div>
    </div>
  );
};

export default ProfileLoader;

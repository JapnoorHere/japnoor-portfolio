import React from 'react';

const CardLoader = () => {
  return (
    <div className="flex items-center justify-center w-full h-full bg-gradient-to-br from-[#1E1E1E] to-[#121212]">
      <div className="relative w-44 h-36">
        
        <div className="absolute h-1 w-24 top-0 left-0 bg-gradient-to-r from-[#4b633b]/20 to-[#4b633b] animate-pulse"></div>
        <div className="absolute h-1 w-36 top-8 left-4 bg-gradient-to-r from-[#4b633b]/40 to-[#4b633b]/10 animate-pulse" style={{animationDelay: '0.2s'}}></div>
        <div className="absolute h-1 w-32 top-16 left-2 bg-gradient-to-r from-[#4b633b]/30 to-[#4b633b]/20 animate-pulse" style={{animationDelay: '0.4s'}}></div>
        <div className="absolute h-1 w-40 top-24 left-0 bg-gradient-to-r from-[#4b633b]/50 to-[#4b633b]/30 animate-pulse" style={{animationDelay: '0.6s'}}></div>
        
        
        <div className="absolute h-4 w-4 bottom-4 right-12 rounded-full bg-[#4b633b]/30 animate-ping" style={{animationDuration: '3s'}}></div>
        <div className="absolute h-6 w-6 bottom-8 right-24 rounded-full bg-[#4b633b]/20 animate-ping" style={{animationDuration: '2.5s', animationDelay: '0.3s'}}></div>
        <div className="absolute h-3 w-3 bottom-16 right-8 rounded-full bg-[#4b633b]/40 animate-ping" style={{animationDuration: '2s', animationDelay: '0.7s'}}></div>
        
        
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="h-5 w-5 rounded-full bg-[#4b633b] animate-pulse"></div>
          <div className="absolute top-0 left-0 h-5 w-5 rounded-full bg-[#4b633b]/60 animate-ping" style={{animationDuration: '2s'}}></div>
        </div>
      </div>
    </div>
  );
};

export default CardLoader;

import React, { useState } from 'react';
import { Building, BookOpen, Code } from 'lucide-react';
import GlassCard from './GlassCard';
import ProfileLoader from './ProfileLoader';

const About = ({ personal, education }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  
  return (
    <div className="space-y-12 w-full mx-auto page-transition">
      <div className="flex flex-col md:flex-row gap-8 items-center">
        <div className="flex-1">
          <h2 className="text-3xl font-bold mb-2 accent-gradient-text">ABOUT ME</h2>
          <p className="text-gray-300 text-lg leading-relaxed">
            {personal.bio}
          </p>
        </div>
        
        
        <div className="relative overflow-hidden group">
          <div className="w-56 h-56 md:w-64 md:h-64 rounded-full transition-all duration-700 relative">
            {!imageLoaded && <ProfileLoader />}
            <img 
              src={personal.aboutProfile} 
              alt="Profile" 
              className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 transform ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
              onLoad={() => setImageLoaded(true)}
            />
          </div>
        </div>
      </div>
      
      <div>
        <h2 className="text-3xl font-bold mb-6 accent-gradient-text">EDUCATION</h2>
        <div className="space-y-5 relative">
          {education.map((item, index) => (
            <GlassCard 
              key={index} 
              className="p-6 relative group" 
              effectType="tilt"
            >
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div>
                  <h3 className="text-xl font-semibold transition-colors duration-500">{item.degree}</h3>
                  <p className="text-gray-400 flex items-center mt-1">
                    <Building size={16} className="mr-2 text-[#4b633b] transition-transform duration-500 group-hover:scale-110" />
                    {item.institution}
                  </p>
                </div>
                <div className="mt-2 md:mt-0 px-3 py-1 rounded-full bg-[#4b633b]/10 border border-[#4b633b]/20 text-white group-hover:bg-[#4b633b]/20 transition-all duration-500 group-hover:scale-110 group-hover:shadow-sm group-hover:shadow-[#4b633b]/30">
                  {item.period}
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
      
      
      <div className="mt-12">
        <h2 className="text-3xl font-bold mb-6 accent-gradient-text">FUN FACTS</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <GlassCard className="p-6 group" effectType="glow">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-full bg-[#4b633b]/20 group-hover:bg-[#4b633b]/30 group-hover:scale-110 transition-all duration-500 flex-shrink-0">
                <Code size={20} className="text-[#4b633b] transition-transform duration-500 group-hover:rotate-12" />
              </div>
              <div>
                <h3 className="font-medium text-[#4b633b] mb-1 group-hover:text-[#5d7c4b] transition-colors duration-500">Tech Enthusiast</h3>
                <p className="text-gray-300 group-hover:text-gray-200 transition-colors duration-500">Always exploring the latest technologies and frameworks</p>
              </div>
            </div>
          </GlassCard>
          
          <GlassCard className="p-6 group" effectType="glow">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-full bg-[#4b633b]/20 group-hover:bg-[#4b633b]/30 group-hover:scale-110 transition-all duration-500 flex-shrink-0">
                <BookOpen size={20} className="text-[#4b633b] transition-transform duration-500 group-hover:rotate-12" />
              </div>
              <div>
                <h3 className="font-medium text-[#4b633b] mb-1 group-hover:text-[#5d7c4b] transition-colors duration-500">Continuous Learner</h3>
                <p className="text-gray-300 group-hover:text-gray-200 transition-colors duration-500">Dedicated to constant self-improvement and growth</p>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};

export default About;

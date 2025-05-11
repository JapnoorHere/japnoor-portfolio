import React from 'react';
import ProgressBar from './ProgressBar';
import GlassCard from './GlassCard';

import { FaHtml5 } from "react-icons/fa";
import { FaCss3Alt } from "react-icons/fa";
import { IoLogoJavascript } from "react-icons/io5";
import { FaAndroid } from "react-icons/fa";
import { FaReact } from "react-icons/fa";
import { IoLogoFirebase } from "react-icons/io5";
import { FaNodeJs } from "react-icons/fa";
import { SiTailwindcss } from "react-icons/si";
import { FaFigma } from "react-icons/fa";
import { FaGitAlt } from "react-icons/fa";

const Skills = ({ skills }) => {
  const getSkillIcon = (name, color) => {
    const iconProps = { size: 24, color: color, className: "transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6" };
    
    switch(name) {
      case 'HTML':
        return <FaHtml5 {...iconProps} />;
      case 'CSS':
        return <FaCss3Alt {...iconProps} />;
      case 'JavaScript':
        return <IoLogoJavascript {...iconProps} />;
      case 'Android Kotlin':
        return <FaAndroid {...iconProps} />;
      case 'React':
        return <FaReact {...iconProps} className={`${iconProps.className} group-hover:animate-spin-slow`} />;
      case 'Firebase':
        return <IoLogoFirebase {...iconProps} />;
      case 'Node.js':
        return <FaNodeJs {...iconProps} />;
      case 'Tailwind CSS':
        return <SiTailwindcss {...iconProps} />;
      case 'Figma':
        return <FaFigma {...iconProps} />;
      case 'Git':
        return <FaGitAlt {...iconProps} />;
      default:
        return <FaHtml5 {...iconProps} />;
    }
  };

  return (
    <div className="w-full mx-auto page-transition">
      <h2 className="text-3xl font-bold mb-2 accent-gradient-text">SKILLS</h2>
      <p className="text-gray-400 mb-8">My technical expertise and proficiency levels</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {skills.map((skill, index) => (
          <GlassCard key={index} className="p-6 group" effectType='lift'>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <div 
                  className="w-10 h-10 flex items-center justify-center mr-4 rounded-lg bg-opacity-20 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3"
                  style={{ 
                    backgroundColor: `${skill.color}20`, 
                    boxShadow: `0 0 15px ${skill.color}30`,
                    transition: 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                  }}
                >
                  {getSkillIcon(skill.name, skill.color)}
                </div>
                <span className="font-medium text-lg group-hover:text-white transition-colors duration-500">{skill.name}</span>
              </div>
              <span className="text-sm bg-gray-800 text-white px-2 py-1 rounded-full transition-all duration-500 group-hover:bg-[#4b633b]/20  group-hover:scale-110">{skill.level}%</span>
            </div>
            <ProgressBar percentage={skill.level} color={skill.color} />
          </GlassCard>
        ))}
      </div>
    </div>
  );
};

export default Skills;

import React, { useState, useEffect, useRef } from 'react';
import { Home, User, Code, Briefcase, Award, FileText, Mail, Github, Linkedin, Menu } from 'lucide-react';

const Sidebar = ({ activeSection, setActiveSection, isMobile, setMobileMenuOpen, personal, hideTitleInMobile, onCollapse }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navItems = [
    { id: 'home', label: 'HOME', icon: <Home size={20} /> },
    { id: 'about', label: 'ABOUT', icon: <User size={20} /> },
    { id: 'skills', label: 'SKILLS', icon: <Code size={20} /> },
    { id: 'portfolio', label: 'PORTFOLIO', icon: <Briefcase size={20} /> },
    { id: 'achievements', label: 'ACHIEVEMENTS', icon: <Award size={20} /> },
    { id: 'certificates', label: 'CERTIFICATES', icon: <FileText size={20} /> },
    { id: 'contact', label: 'CONTACT', icon: <Mail size={20} /> },
  ];

  const handleNavClick = (id) => {
    setActiveSection(id);
    if (isMobile) {
      setMobileMenuOpen(false);
    }
  };
  
  const toggleCollapse = () => {
    const newCollapsedState = !isCollapsed;
    setIsCollapsed(newCollapsedState);
    if (onCollapse) {
      onCollapse(newCollapsedState);
    }
  };

  useEffect(() => {
    if (isMobile) {
      setIsCollapsed(false);
      if (onCollapse) {
        onCollapse(false);
      }
    }
  }, [isMobile, onCollapse]);

  return (
    <aside className={`flex flex-col h-full min-h-screen bg-[#1A1A1A]/90 backdrop-blur-xl transition-width duration-300 ease-in-out overflow-hidden ${
      !isMobile && isCollapsed ? 'md:w-16' : 'md:w-72 lg:w-80 xl:w-96'
    }`}
    style={{ 
      transitionProperty: 'width',
    }}>
      

      
      {(!isMobile || !hideTitleInMobile) && (
        <div className={`p-6 ${isCollapsed && !isMobile ? 'flex justify-center' : 'flex items-center justify-between'}`}>
          
          {(!isCollapsed || isMobile) ? (
            <div>
              <h2 className="text-xl font-bold bg-gradient-to-r from-[#4b633b] to-[#3b4d2e] bg-clip-text text-transparent truncate">
                {personal.name}
              </h2>
              <p className="text-sm text-gray-400 truncate">
                {personal.title}
              </p>
            </div>
          ) : null}
          
          
          <button 
            onClick={toggleCollapse}
            className={`p-1.5 rounded-lg cursor-pointer hover:bg-[#4b633b]/20 transition-colors text-gray-400 hover:text-white ${!isCollapsed && !isMobile ? 'ml-2' : ''}`}
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
              </svg>
            )}
          </button>
        </div>
      )}
      
      
      <nav className="flex-1 py-6 px-4 overflow-y-auto overflow-x-hidden">
        <ul className="space-y-4">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                data-section={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`flex cursor-pointer items-center w-full px-4 py-3.5 rounded-lg transition-all duration-300 ${
                  activeSection === item.id 
                    ? 'bg-gradient-to-r from-[#4b633b] to-[#3b4d2e] text-white shadow-lg shadow-[#4b633b]/20' 
                    : 'text-gray-400 hover:bg-gray-800/50 hover:text-white hover:border-[#4b633b]/30'
                } ${!isMobile && isCollapsed ? 'justify-center' : ''}`}
              >
                <span className={`transition-transform duration-300 ${activeSection === item.id ? 'scale-110' : 'hover:scale-110'} ${
                  !isMobile && isCollapsed ? '' : 'mr-3'
                }`}>
                  {item.icon}
                </span>
                <span 
                  className={`whitespace-nowrap transition-all duration-300 ${
                    !isMobile && isCollapsed 
                      ? 'opacity-0 w-0 overflow-hidden' 
                      : 'opacity-100 w-auto text-base font-medium'
                  }`}
                >
                  {item.label}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
      
      
      {!isMobile && (
        <div className={`mt-auto p-6 transition-all duration-300 ${
          isCollapsed 
            ? 'flex flex-col items-center space-y-4' 
            : 'flex justify-center space-x-8'
        }`}>
          <a 
            href={personal.social.github} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-gray-400 hover:text-[#4b633b] transition-all duration-300 hover:scale-110 transform"
            aria-label="GitHub"
          >
            <Github size={24} />
          </a>
          <a 
            href={personal.social.linkedin} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-gray-400 hover:text-[#4b633b] transition-all duration-300 hover:scale-110 transform"
            aria-label="LinkedIn"
          >
            <Linkedin size={24} />
          </a>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;

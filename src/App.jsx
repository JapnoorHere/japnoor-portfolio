import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Home from './components/Home';
import About from './components/About';
import Skills from './components/Skills';
import Portfolio from './components/Portfolio';
import Achievements from './components/Achievements';
import Certificates from './components/Certificates';
import Contact from './components/Contact';
import portfolioData from './data.json';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [pageTransition, setPageTransition] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleSectionChange = (section) => {
    setPageTransition(true);
    
    setTimeout(() => {
      setActiveSection(section);
      setPageTransition(false);
    }, 300);
  };

  const renderActiveSection = () => {
    switch(activeSection) {
      case 'home':
        return <Home data={portfolioData.personal} />;
      case 'about':
        return <About personal={portfolioData.personal} education={portfolioData.education} />;
      case 'skills':
        return <Skills skills={portfolioData.skills} />;
      case 'portfolio':
        return <Portfolio projects={portfolioData.projects} />;
      case 'achievements':
        return <Achievements achievements={portfolioData.achievements} />;
      case 'certificates':
        return <Certificates certificates={portfolioData.certificates} />;
      case 'contact':
        return <Contact personal={portfolioData.personal} />;
      default:
        return <Home data={portfolioData.personal} />;
    }
  };
  
  const handleSidebarCollapse = (collapsed) => {
    setSidebarCollapsed(collapsed);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#121212] text-white">
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-[#4b633b]/5 rounded-full filter blur-[100px]"></div>
        <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-[#4b633b]/5 rounded-full filter blur-[100px]"></div>
      </div>
      
      {isMobile && (
        <div className="p-4 bg-[#1E1E1E]/90 backdrop-blur-xl border-b border-gray-800 sticky top-0 z-50">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg font-bold bg-gradient-to-r from-[#4b633b] to-[#3b4d2e] bg-clip-text text-transparent">
                {portfolioData.personal.name}
              </h2>
              <p className="text-xs text-gray-400">
                {portfolioData.personal.title}
              </p>
            </div>
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
              className="text-white focus:outline-none p-2 rounded-lg hover:bg-[#4b633b]/10 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
              </svg>
            </button>
          </div>
        </div>
      )}
      
      <div 
        className={`
          ${isMobile 
            ? 'fixed inset-x-0 top-0 z-40 transition-transform duration-300 ease-in-out max-h-screen overflow-y-auto' 
            : 'sticky top-0 h-screen'
          } 
          ${(isMobile && mobileMenuOpen) 
            ? 'translate-y-0 mt-16' 
            : (isMobile ? '-translate-y-full' : 'translate-y-0')
          }
        `}
      >
        <Sidebar 
          activeSection={activeSection} 
          setActiveSection={handleSectionChange}
          isMobile={isMobile}
          setMobileMenuOpen={setMobileMenuOpen}
          personal={portfolioData.personal}
          hideTitleInMobile={true}
          onCollapse={handleSidebarCollapse}
        />
      </div>
      
      {isMobile && mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 mt-16"
          onClick={() => setMobileMenuOpen(false)}
        ></div>
      )}
      
      <main 
        className={`flex-1 overflow-y-auto transition-all duration-300 p-6 md:p-10 ${pageTransition ? 'opacity-0' : 'opacity-100'}`}
        style={{ 
          transitionProperty: 'margin-left, opacity',
        }}
      >
        <div className="max-w-6xl mx-auto">
          {renderActiveSection()}
        </div>
      </main>
    </div>
  );
}

export default App;

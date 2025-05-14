import React, { useState, useEffect } from 'react';
import { Download, ArrowRight, X, Video } from 'lucide-react';
import ProfileLoader from './ProfileLoader';

const Home = ({ data }) => {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isCVModalOpen, setIsCVModalOpen] = useState(false);
  
  const phrases = ['Full Stack Developer', 'Android Developer'];
  
  useEffect(() => {
    const handleTyping = () => {
      const currentIndex = loopNum % phrases.length;
      const fullText = phrases[currentIndex];
      
      setText(isDeleting 
        ? fullText.substring(0, text.length - 1) 
        : fullText.substring(0, text.length + 1)
      );
      
      setTypingSpeed(50);
      
      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 1000);
        
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };
    
    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        setIsCVModalOpen(false);
      }
    };
    
    if (isCVModalOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'auto';
    };
  }, [isCVModalOpen]);

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-[calc(100vh-120px)] page-transition">
      <div className="flex-1 space-y-6 max-w-2xl">
        <h1 className="text-4xl md:text-6xl font-bold">
          Hi there, I'm <span className="bg-gradient-to-r from-[#4b633b] to-[#3b4d2e] bg-clip-text text-transparent">
            {data.name}
          </span>
        </h1>
        <h2 className="text-2xl md:text-3xl font-semibold text-white/90">
          {text}<span className="animate-pulse ml-1">|</span>
        </h2>
        <p className="text-gray-300 max-w-2xl text-lg">{data.intro}</p>
        
        <div className="flex flex-wrap gap-4 pt-4">
          <button 
            onClick={() => setIsCVModalOpen(true)}
            className="px-6 py-3 bg-gradient-to-r from-[#4b633b] to-[#3b4d2e] hover:from-[#3b4d2e] hover:to-[#2e3d24] rounded-md flex items-center gap-2 transition-all duration-500 transform hover:-translate-y-1 hover:scale-105 shadow-lg shadow-[#4b633b]/20 hover:shadow-xl hover:shadow-[#4b633b]/30"
          >
            My CV
            <Download size={18} className="transition-transform duration-500 group-hover:rotate-12" />
          </button>
          
          <a 
            href="#portfolio" 
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('button[data-section="portfolio"]').click();
            }}
            className="px-6 py-3 bg-[#1E1E1E]/70 backdrop-blur-md hover:bg-[#1E1E1E]/90 border border-gray-700 hover:border-[#4b633b]/50 rounded-md flex items-center gap-2 transition-all duration-500 transform hover:-translate-y-1 hover:scale-105 hover:shadow-lg hover:shadow-[#4b633b]/10"
          >
            See My Work
            <ArrowRight size={18} className="transition-transform duration-500 group-hover:translate-x-1" />
          </a>
        </div>
      </div>
      
      <div className="relative mt-10 md:mt-0 overflow-hidden group">
        <div className="w-56 h-56 md:w-72 md:h-72 rounded-full border-4 border-[#4b633b] shadow-lg shadow-[#4b633b]/20 transition-all duration-700 group-hover:border-[#4b633b]/80 group-hover:scale-105 m-6 relative animate-float">
          {!imageLoaded && <ProfileLoader />}
          <img 
            src={data.profile} 
            alt="Profile" 
            className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ml-2 mt-2 transform ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setImageLoaded(true)}
          />
        </div>
      </div>

      {/* CV Modal */}
      {isCVModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm transition-opacity duration-300"
          onClick={() => setIsCVModalOpen(false)}
        >
          <div 
            className="relative w-full max-w-md p-6 rounded-lg overflow-hidden shadow-2xl animate-modalEntry"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#4b633b]/30 to-[#3b4d2e]/30 rounded-xl blur-xl opacity-20"></div>
            <div className="relative bg-[#121212] p-6 rounded-lg border border-[#4b633b]/20">
              <button 
                onClick={() => setIsCVModalOpen(false)}
                className="absolute cursor-pointer top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-300 transform hover:rotate-90"
              >
                <X size={20} />
              </button>
              
              <h3 className="text-2xl font-semibold mb-6 accent-gradient-text">My Resume</h3>
              
              <div className="space-y-4">
                <a 
                  href={data.cvLinks.document} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full px-6 py-4 flex items-center justify-between bg-gray-800/50 hover:bg-gray-800/80 border border-gray-700 hover:border-[#4b633b]/50 rounded-md transition-all duration-300 hover:transform hover:-translate-y-1 group"
                >
                  <div className="flex items-center">
                    <div className="mr-4 bg-[#4b633b]/20 p-3 rounded-full">
                      <Download size={20} className="text-[#4b633b] transition-transform duration-300 group-hover:scale-110" />
                    </div>
                    <div>
                      <h4 className="font-medium">Document CV</h4>
                      <p className="text-gray-400 text-sm">View or download my resume</p>
                    </div>
                  </div>
                  <ArrowRight size={16} className="text-gray-400 group-hover:text-white transform translate-x-0 group-hover:translate-x-1 transition-transform duration-300" />
                </a>
                
                <a 
                  href={data.cvLinks.video} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full px-6 py-4 flex items-center justify-between bg-gray-800/50 hover:bg-gray-800/80 border border-gray-700 hover:border-[#4b633b]/50 rounded-md transition-all duration-300 hover:transform hover:-translate-y-1 group"
                >
                  <div className="flex items-center">
                    <div className="mr-4 bg-[#4b633b]/20 p-3 rounded-full">
                      <Video size={20} className="text-[#4b633b] transition-transform duration-300 group-hover:scale-110" />
                    </div>
                    <div>
                      <h4 className="font-medium">Video Resume</h4>
                      <p className="text-gray-400 text-sm">Watch my video introduction</p>
                    </div>
                  </div>
                  <ArrowRight size={16} className="text-gray-400 group-hover:text-white transform translate-x-0 group-hover:translate-x-1 transition-transform duration-300" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;

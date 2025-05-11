import React, { useState, useEffect } from 'react';
import { Github, ExternalLink, ZoomIn } from 'lucide-react';
import GlassCard from './GlassCard';
import CardLoader from './CardLoader';
import ImageModal from './ImageModal';

const Portfolio = ({ projects }) => {
  const [activeTab, setActiveTab] = useState('web');
  const [loadedImages, setLoadedImages] = useState({});
  const [modalImage, setModalImage] = useState(null);
  const [isChangingTab, setIsChangingTab] = useState(false);
  const [displayedProjects, setDisplayedProjects] = useState([]);

  const tabs = [
    { id: 'web', label: 'WEB' },
    { id: 'app', label: 'APP' },
    { id: 'uiux', label: 'UI/UX' }
  ];

  useEffect(() => {
    setDisplayedProjects(projects[activeTab] || []);
  }, [activeTab, projects]);

  const handleImageLoad = (projectId) => {
    setLoadedImages(prev => ({
      ...prev,
      [projectId]: true
    }));
  };

  const openModal = (project) => {
    setModalImage({
      src: project.image || "/api/placeholder/600/300",
      title: project.title
    });
  };

  const closeModal = () => {
    setModalImage(null);
  };

  const handleTabChange = (tabId) => {
    if (tabId === activeTab || isChangingTab) return;

    setIsChangingTab(true);
    setLoadedImages({});

    setTimeout(() => {
      setDisplayedProjects([]);

      setTimeout(() => {
        setActiveTab(tabId);

        setTimeout(() => {
          setIsChangingTab(false);
        }, 100);
      }, 100);
    }, 300);
  };

  return (
    <div className="w-full mx-auto page-transition">
      <h2 className="text-3xl font-bold mb-2 accent-gradient-text">PORTFOLIO</h2>
      <p className="text-gray-400 mb-8">Showcasing my recent work and projects</p>

      <div className="flex mb-10 bg-[#1E1E1E]/50 backdrop-blur-xl rounded-lg overflow-hidden border border-gray-800 p-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            className={`px-8 py-3 cursor-pointer transition-all duration-300 rounded-md flex-1 ${
              activeTab === tab.id 
                ? 'bg-gradient-to-r from-[#4b633b] to-[#3b4d2e] text-white shadow-lg font-medium scale-105 transform' 
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
            disabled={isChangingTab}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-opacity duration-300 ${isChangingTab ? 'opacity-0' : 'opacity-100'}`}>
        {displayedProjects.map((project, index) => {
          const isImageLoaded = loadedImages[project.id];

          return (
            <GlassCard 
              key={project.id || index} 
              className="overflow-hidden group"
              effectType='expand'
            >
              <div className="relative">
                
                <div 
                  className="h-48 overflow-hidden relative cursor-pointer"
                  onClick={() => openModal(project)}
                >
                  {!isImageLoaded && <CardLoader />}
                  <img 
                    src={project.image || "/api/placeholder/600/300"} 
                    alt={project.title} 
                    className={`w-full h-full object-cover transition-opacity duration-300 ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
                    onLoad={() => handleImageLoad(project.id)}
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-80" />

                  <div className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm text-black text-xs px-2 py-1 rounded-md flex items-center gap-1 shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                    <ZoomIn size={12} />
                    <span>Click to see full image</span>
                  </div>
                </div>

                
                <div className="p-6 relative z-10">
                  <h3 className="text-xl font-semibold mb-2 transition-colors duration-300 group-hover:text-[#4b633b]">{project.title}</h3>
                  <p className="text-gray-400 mb-6 line-clamp-2 transition-colors duration-300 group-hover:text-gray-300">{project.description}</p>
                  <div className={`flex gap-4 ${!project.github ? 'justify-center' : ''}`}>
                    {project.github && (
                      <a 
                        href={project.github} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={`px-5 py-2 bg-[#1A1A1A]/80 backdrop-blur-md hover:bg-gray-800 border border-gray-700 hover:border-[#4b633b]/40 rounded-md flex items-center gap-2 text-sm transition-all duration-300 hover:shadow-lg hover:shadow-[#4b633b]/10 hover:-translate-y-1 hover:scale-105 ${!project.demo ? 'flex-1 justify-center' : ''}`}
                      >
                        <Github size={16} className="transition-transform duration-300 hover:rotate-12" />
                        GitHub
                      </a>
                    )}
                    {project.demo && <a 
                      href={project.demo} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={`px-5 py-2 bg-gradient-to-r from-[#4b633b] to-[#3b4d2e] hover:from-[#3b4d2e] hover:to-[#2e3d24] rounded-md flex items-center gap-2 text-sm transition-all duration-300 shadow-lg shadow-[#4b633b]/10 hover:shadow-[#4b633b]/20 hover:-translate-y-1 hover:scale-105 ${!project.github ? 'flex-1 justify-center' : ''}`}
                    >
                      <ExternalLink size={16} className="transition-transform duration-300 hover:rotate-12" />
                      Live Demo
                    </a>}
                  </div>
                </div>
              </div>
            </GlassCard>
          );
        })}
      </div>

      <ImageModal 
        isOpen={!!modalImage} 
        onClose={closeModal}
        imageSrc={modalImage?.src}
        title={modalImage?.title}
      />
    </div>
  );
};

export default Portfolio;

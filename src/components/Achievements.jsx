import React, { useState } from 'react';
import { Trophy, ZoomIn, Calendar } from 'lucide-react';
import GlassCard from './GlassCard';
import CardLoader from './CardLoader';
import ImageModal from './ImageModal';

const Achievements = ({ achievements }) => {
  const [loadedImages, setLoadedImages] = useState({});
  const [modalImage, setModalImage] = useState(null);
  
  const handleImageLoad = (achievementId) => {
    setLoadedImages(prev => ({
      ...prev,
      [achievementId]: true
    }));
  };

  const openModal = (achievement) => {
    setModalImage({
      src: achievement.image,
      title: achievement.title
    });
  };

  const closeModal = () => {
    setModalImage(null);
  };

  return (
    <div className="w-full mx-auto page-transition">
      <h2 className="text-3xl font-bold mb-2 accent-gradient-text">ACHIEVEMENTS</h2>
      <p className="text-gray-400 mb-8">Recognition and awards I've received</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {achievements.map((achievement, index) => {
          const isImageLoaded = loadedImages[achievement.id];
          
          return (
            <GlassCard key={index} className="overflow-hidden group" effectType='lift'>
              <div className="relative">
                
                <div 
                  className="relative h-56 overflow-hidden cursor-pointer"
                  onClick={() => openModal(achievement)}
                >
                  {!isImageLoaded && <CardLoader />}
                  <img 
                    src={achievement.image || "/api/placeholder/600/300"} 
                    alt={achievement.title} 
                    className={`w-full h-full object-cover ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
                    onLoad={() => handleImageLoad(achievement.id)}
                  />
                  
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-80">
                    
                  </div>
                  
                  
                  <div className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm text-black text-xs px-2 py-1 rounded-md flex items-center gap-1 shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                    <ZoomIn size={12} />
                    <span>Click to see full image</span>
                  </div>
                  
                  
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-[#4b633b] to-[#3b4d2e] text-white px-3 py-1 rounded-full text-sm flex items-center shadow-lg transform rotate-0 group-hover:rotate-3 transition-all duration-300 z-10">
                    <Trophy size={16} className="mr-1" />
                    Award
                  </div>
                </div>
                
                
                <div className="p-6 relative bg-[#121212] z-10">
                  <div className="flex flex-col mb-3">
                    <h3 className="text-xl font-semibold transition-colors duration-300 group-hover:text-[#4b633b] pr-32">
                      {achievement.title}
                    </h3>
                    
                    
                    <div className="absolute top-6 right-6 flex items-center whitespace-nowrap">
                      <Calendar size={16} className="text-[#4b633b] mr-1" />
                      <span className="text-sm text-gray-400">{achievement.date || "May, 2023"}</span>
                    </div>
                  </div>
                  <p className="text-gray-300">{achievement.description}</p>
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

export default Achievements;

import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';

const ImageModal = ({ isOpen, onClose, imageSrc, title }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageOrientation, setImageOrientation] = useState('portrait');

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEsc);
      
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen && imageSrc) {
      setImageLoaded(false);
      
      setImageOrientation('portrait');
    }
  }, [isOpen, imageSrc]);

  const handleImageLoad = (e) => {
    
    const img = e.target;
    if (img.naturalWidth > img.naturalHeight) {
      setImageOrientation('landscape');
    } else {
      setImageOrientation('portrait');
    }
    setImageLoaded(true);
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm transition-opacity duration-300"
      onClick={onClose}
    >
      <div 
        className={`relative max-w-[95%] md:max-w-[85%] max-h-[90vh] rounded-lg overflow-hidden shadow-2xl animate-modalEntry ${
          imageOrientation === 'landscape' ? 'w-auto h-auto' : 'w-auto max-w-3xl'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute cursor-pointer top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-300 transform hover:rotate-90"
        >
          <X size={20} />
        </button>
        
        {!imageLoaded && (
          <div className="bg-[#1E1E1E] h-80 w-80 md:h-96 md:w-96 flex items-center justify-center">
            <div className="relative h-16 w-16">
              <div className="h-full w-full rounded-full bg-gradient-to-r from-[#4b633b]/30 to-[#4b633b] animate-pulse"></div>
              <div className="absolute inset-2 rounded-full bg-[#1E1E1E]"></div>
              <div className="absolute h-3 w-3 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#4b633b] rounded-full"></div>
              <div className="absolute top-0 left-0 h-full w-full border-2 border-[#4b633b]/50 rounded-full animate-ping opacity-75"></div>
            </div>
          </div>
        )}
        
        <div className={`relative ${imageOrientation === 'landscape' ? 'max-h-[80vh] w-auto' : 'max-h-[80vh] max-w-full'}`}>
          <img 
            src={imageSrc} 
            alt={title || "Image"} 
            className={`w-auto h-auto max-h-[80vh] object-contain ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={handleImageLoad}
          />
        </div>
        
        {title && imageLoaded && (
          <div className="p-4 bg-gradient-to-t from-black/70 to-transparent absolute bottom-0 w-full">
            <h3 className="text-white text-lg font-medium">{title}</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageModal;

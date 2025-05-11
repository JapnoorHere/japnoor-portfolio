import React, { useState, useEffect } from 'react';
import { Mail, MapPin, Github, Linkedin, Twitter, Instagram, ArrowRight, X, Send } from 'lucide-react';
import GlassCard from './GlassCard';

const ContactFormModal = ({ isOpen, onClose, email }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const form = e.target;
    const formData = new FormData(form);
    
    try {
      const response = await fetch('https://formspree.io/f/movdndgl', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        setSubmitSuccess(true);
        form.reset();
        setTimeout(() => {
          setSubmitSuccess(false);
          onClose();
        }, 3000);
      } else {
        console.error('Form submission failed:', await response.text());
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm transition-opacity duration-300"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-md p-6 rounded-lg overflow-hidden shadow-2xl animate-modalEntry"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute -inset-0.5 bg-gradient-to-r from-[#4b633b]/30 to-[#3b4d2e]/30 rounded-xl blur-xl opacity-20"></div>
        <div className="relative bg-[#121212] p-6 rounded-lg border border-[#4b633b]/20">
          <button 
            onClick={onClose}
            className="absolute cursor-pointer top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-300 transform hover:rotate-90"
          >
            <X size={20} />
          </button>
          
          <h3 className="text-2xl font-semibold mb-4 accent-gradient-text">Send Me a Message</h3>
          
          {submitSuccess ? (
            <div className="text-center py-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[#4b633b]/20 rounded-full mb-4">
                <div className="bg-gradient-to-br from-[#4b633b]/30 to-[#4b633b]/10 p-4 rounded-full animate-pulse">
                  <Send size={24} className="text-[#4b633b]" />
                </div>
              </div>
              <h4 className="text-xl font-medium mb-2">Message Sent!</h4>
              <p className="text-gray-400">Thank you for reaching out. I'll get back to you soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} action="https://formspree.io/f/movdndgl" method="POST">
              <div className="mb-4">
                <label className="block text-gray-300 mb-2" htmlFor="name">
                  Your name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4b633b]/50 focus:border-[#4b633b]/50 transition-all duration-300"
                  placeholder="John Doe"
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-300 mb-2" htmlFor="email">
                  Your email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4b633b]/50 focus:border-[#4b633b]/50 transition-all duration-300"
                  placeholder="john@example.com"
                />
              </div>
              
              <div className="mb-6">
                <label className="block text-gray-300 mb-2" htmlFor="message">
                  Your message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4b633b]/50 focus:border-[#4b633b]/50 transition-all duration-300 min-h-32"
                  placeholder="Your message here..."
                ></textarea>
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-4 py-3 cursor-pointer bg-gradient-to-r from-[#4b633b] to-[#3b4d2e] rounded-md transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-[#4b633b]/30 flex items-center justify-center"
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                    Sending...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <Send size={18} className="mr-2" />
                    Send Message
                  </span>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

const Contact = ({ personal }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const getMapUrl = (location) => {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`;
  };

  return (
    <div className="w-full mx-auto page-transition">
      <h2 className="text-3xl font-bold mb-2 accent-gradient-text">CONTACT ME</h2>
      <p className="text-gray-400 mb-8">Reach out to me for collaborations and opportunities</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <a 
          href={`mailto:${personal.email}`}
          className="block"
        >
          <GlassCard className="p-6 group hover:border-[#4b633b]/50 cursor-pointer">
            <div className="flex items-start">
              <div className="bg-gradient-to-br from-[#4b633b]/30 to-[#4b633b]/10 p-4 rounded-full mr-4 group-hover:scale-110 transition-transform duration-300">
                <Mail size={24} className="text-[#4b633b]" />
              </div>
              <div>
                <h3 className="text-lg font-medium mb-1 group-hover:text-[#4b633b] transition-colors duration-300">Email</h3>
                <div className="text-gray-300 group-hover:text-[#4b633b] transition-colors duration-300 inline-flex items-center">
                  {personal.email}
                  <ArrowRight size={16} className="ml-2 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                </div>
              </div>
            </div>
          </GlassCard>
        </a>
        
        <a 
          href={getMapUrl(personal.location)}
          target="_blank" 
          rel="noopener noreferrer"
          className="block"
        >
          <GlassCard className="p-6 group hover:border-[#4b633b]/50 cursor-pointer">
            <div className="flex items-start">
              <div className="bg-gradient-to-br from-[#4b633b]/30 to-[#4b633b]/10 p-4 rounded-full mr-4 group-hover:scale-110 transition-transform duration-300">
                <MapPin size={24} className="text-[#4b633b]" />
              </div>
              <div>
                <h3 className="text-lg font-medium mb-1 group-hover:text-[#4b633b] transition-colors duration-300">Location</h3>
                <div className="text-gray-300 group-hover:text-[#4b633b] transition-colors duration-300 inline-flex items-center">
                  {personal.location}
                  <ArrowRight size={16} className="ml-2 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                </div>
              </div>
            </div>
          </GlassCard>
        </a>
      </div>
      
      <h3 className="text-2xl font-semibold mt-12 mb-6 accent-gradient-text">SOCIAL MEDIA</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <a 
          href={personal.social.github} 
          target="_blank" 
          rel="noopener noreferrer"
          className="block"
        >
          <GlassCard className="p-6 transition-all duration-500 hover:-translate-y-2 hover:border-[#4b633b]/30 group cursor-pointer">
            <div className="flex items-center">
              <div className="bg-gradient-to-br from-gray-700 to-gray-900 p-3 rounded-lg mr-4 group-hover:scale-110 transition-transform duration-300">
                <Github size={22} className="text-white" />
              </div>
              <span className="text-lg group-hover:text-[#4b633b] transition-colors duration-300">GitHub</span>
              <ArrowRight size={18} className="ml-auto opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
            </div>
          </GlassCard>
        </a>
        
        <a 
          href={personal.social.linkedin} 
          target="_blank" 
          rel="noopener noreferrer"
          className="block"
        >
          <GlassCard className="p-6 transition-all duration-500 hover:-translate-y-2 hover:border-[#4b633b]/30 group cursor-pointer">
            <div className="flex items-center">
              <div className="bg-gradient-to-br from-blue-700 to-blue-900 p-3 rounded-lg mr-4 group-hover:scale-110 transition-transform duration-300">
                <Linkedin size={22} className="text-white" />
              </div>
              <span className="text-lg group-hover:text-[#4b633b] transition-colors duration-300">LinkedIn</span>
              <ArrowRight size={18} className="ml-auto opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
            </div>
          </GlassCard>
        </a>
        
        <a 
          href={personal.social.twitter} 
          target="_blank" 
          rel="noopener noreferrer"
          className="block"
        >
          <GlassCard className="p-6 transition-all duration-500 hover:-translate-y-2 hover:border-[#4b633b]/30 group cursor-pointer">
            <div className="flex items-center">
              <div className="bg-gradient-to-br from-blue-400 to-blue-600 p-3 rounded-lg mr-4 group-hover:scale-110 transition-transform duration-300">
                <Twitter size={22} className="text-white" />
              </div>
              <span className="text-lg group-hover:text-[#4b633b] transition-colors duration-300">Twitter</span>
              <ArrowRight size={18} className="ml-auto opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
            </div>
          </GlassCard>
        </a>
        
        <a 
          href={personal.social.instagram} 
          target="_blank" 
          rel="noopener noreferrer"
          className="block"
        >
          <GlassCard className="p-6 transition-all duration-500 hover:-translate-y-2 hover:border-[#4b633b]/30 group cursor-pointer">
            <div className="flex items-center">
              <div className="bg-gradient-to-br from-pink-500 to-purple-700 p-3 rounded-lg mr-4 group-hover:scale-110 transition-transform duration-300">
                <Instagram size={22} className="text-white" />
              </div>
              <span className="text-lg group-hover:text-[#4b633b] transition-colors duration-300">Instagram</span>
              <ArrowRight size={18} className="ml-auto opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
            </div>
          </GlassCard>
        </a>
      </div>
      
      <div className="mt-16 p-8 rounded-xl border border-[#4b633b]/20 bg-gradient-to-b from-[#4b633b]/5 to-transparent relative">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-[#4b633b]/30 to-[#3b4d2e]/30 rounded-xl blur-xl opacity-20"></div>
        <div className="relative">
          <h3 className="text-2xl font-semibold mb-4 accent-gradient-text text-center">Send Me a Message</h3>
          <p className="text-center text-gray-400 mb-6">Got a question or proposal, or just want to say hello? Go ahead.</p>
          
          <div className="text-center flex flex-col sm:flex-row justify-center gap-4">
            <a 
              href={`mailto:${personal.email}`}
              className="inline-flex items-center justify-center px-4 py-3 bg-gradient-to-r from-[#4b633b] to-[#3b4d2e] rounded-md transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-[#4b633b]/30 group"
            >
              <Mail size={18} className="mr-2 ml-4 group-hover:scale-110 transition-transform duration-300" />
              Send Email
              <ArrowRight size={16} className="ml-2 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
            </a>
            
            <button 
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center justify-center px-4 py-3 bg-transparent border border-[#4b633b] hover:bg-[#4b633b]/10 rounded-md transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-[#4b633b]/20 group"
            >
              <Send size={18} className="mr-2 ml-4 group-hover:scale-110 transition-transform duration-300" />
              Send Message
              <ArrowRight size={16} className="ml-2 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
            </button>
          </div>
        </div>
      </div>
      
      <ContactFormModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        email={personal.email}
      />
    </div>
  );
};

export default Contact;

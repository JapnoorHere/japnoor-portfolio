import React from 'react';
import { Building } from 'lucide-react';
import GlassCard from './GlassCard';

const Certificates = ({ certificates }) => {
  return (
    <div className="w-full mx-auto page-transition">
      <h2 className="text-3xl font-bold mb-2 accent-gradient-text">CERTIFICATES</h2>
      <p className="text-gray-400 mb-8">Qualifications and certifications I've earned</p>
      
      <div className="space-y-5">
        {certificates.map((certificate, index) => (
          <GlassCard key={index} className="p-6 group hover:border-[#4b633b]/30" effectType='tilt'>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <h3 className="text-xl font-semibold group-hover:text-[#4b633b] transition-colors duration-300">{certificate.title}</h3>
                <p className="text-gray-400 flex items-center mt-1">
                  <Building size={16} className="mr-2 text-[#4b633b]" />
                  {certificate.organization}
                </p>
              </div>
              <div className="text-white mt-2 md:mt-0 px-3 py-1 rounded-full bg-[#4b633b]/10 border border-[#4b633b]/20 group-hover:bg-[#4b633b]/20 transition-colors duration-300">
                {certificate.date}
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
};

export default Certificates;

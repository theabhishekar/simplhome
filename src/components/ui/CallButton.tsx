import React from 'react';
import { Phone } from 'lucide-react';

const CallButton: React.FC = () => {
  return (
    <button
      className="fixed bottom-6 right-6 p-4 bg-primary-500 hover:bg-primary-600 text-white rounded-full shadow-lg transition-all duration-200 z-50"
      aria-label="Call Agent"
    >
      <Phone size={24} />
    </button>
  );
};

export default CallButton;
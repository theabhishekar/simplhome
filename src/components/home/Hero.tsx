import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Button from '../ui/Button';

const Hero: React.FC = () => {
  return (
    <section className="relative bg-primary-50 overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/2132227/pexels-photo-2132227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] bg-cover bg-center opacity-10"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="z-10 animate-slide-up">
            <div className="text-sm font-semibold text-secondary-500 uppercase tracking-wide mb-2">Spring Season Sale</div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-900 leading-tight mb-4">
              Bring Nature Home
            </h1>
            <p className="text-lg sm:text-xl text-neutral-700 mb-8 max-w-xl">
              Transform your space with beautiful plants, premium soils, and gardening essentials. Get up to 25% off on all products this season.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                variant="primary"
                size="lg"
                rightIcon={<ArrowRight size={20} />}
                className="animate-pulse-light"
              >
                <Link to="/products">Shop Now</Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
              >
                <Link to="/planting-guides">Planting Guides</Link>
              </Button>
            </div>
          </div>
          
          <div className="relative hidden md:block">
            <div className="relative z-10 bg-white p-2 rounded-lg shadow-medium overflow-hidden transform rotate-2 hover:rotate-0 transition-transform duration-300">
              <img 
                src="https://images.pexels.com/photos/1002703/pexels-photo-1002703.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Beautiful garden display" 
                className="rounded w-full h-auto"
              />
            </div>
            
            <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-primary-100 rounded-full blur-2xl opacity-70 z-0"></div>
            <div className="absolute -top-8 -right-8 w-60 h-60 bg-secondary-100 rounded-full blur-3xl opacity-70 z-0"></div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" className="text-white">
          <path 
            fill="currentColor" 
            fillOpacity="1" 
            d="M0,32L80,42.7C160,53,320,75,480,69.3C640,64,800,32,960,21.3C1120,11,1280,21,1360,26.7L1440,32L1440,100L1360,100C1280,100,1120,100,960,100C800,100,640,100,480,100C320,100,160,100,80,100L0,100Z"
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;
import React from 'react';
import { Star } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  location: string;
  rating: number;
  comment: string;
  image: string;
  date: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    location: "Portland, OR",
    rating: 5,
    comment: "I've transformed my apartment into a green paradise thanks to GreenThumb! Their plants arrive in perfect condition, and their care guides have helped me keep everything thriving. The customer service is outstanding!",
    image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    date: "May 12, 2023"
  },
  {
    id: 2,
    name: "Michael Thompson",
    location: "Austin, TX",
    rating: 4,
    comment: "As a first-time gardener, I was nervous about starting my vegetable garden. GreenThumb's seed collection and organic soil made it so easy! My tomatoes and herbs are flourishing, and I can't wait to expand next season.",
    image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    date: "June 3, 2023"
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    location: "Chicago, IL",
    rating: 5,
    comment: "The pruning shears I purchased are fantastic - sharp, comfortable, and durable. I've used them extensively throughout my garden and they make clean cuts every time. Highly recommend GreenThumb for quality garden tools!",
    image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    date: "April 19, 2023"
  }
];

const TestimonialCard: React.FC<{ testimonial: Testimonial }> = ({ testimonial }) => {
  return (
    <div className="bg-white rounded-lg shadow-soft p-6 md:p-8 flex flex-col h-full">
      <div className="flex items-center mb-4">
        <img 
          src={testimonial.image} 
          alt={testimonial.name} 
          className="w-12 h-12 rounded-full object-cover mr-4"
        />
        <div>
          <h4 className="font-medium text-neutral-900">{testimonial.name}</h4>
          <p className="text-sm text-neutral-500">{testimonial.location}</p>
        </div>
      </div>
      
      <div className="flex mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star 
            key={i} 
            size={16} 
            className={`${i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-neutral-300'} mr-0.5`} 
          />
        ))}
      </div>
      
      <p className="text-neutral-700 flex-grow italic">"{testimonial.comment}"</p>
      
      <div className="mt-4 text-sm text-neutral-500">{testimonial.date}</div>
    </div>
  );
};

const Testimonials: React.FC = () => {
  return (
    <section className="py-16 bg-primary-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-neutral-900 mb-4">What Our Customers Say</h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            Don't just take our word for it - see what gardeners across the country have to say about their experiences with GreenThumb
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map(testimonial => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
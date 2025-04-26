import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Shovel, Sprout, Droplets, FlowerIcon, Plane as PotPlant } from 'lucide-react';

interface CategoryCardProps {
  title: string;
  icon: React.ReactNode;
  color: string;
  link: string;
  imageUrl: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ title, icon, color, link, imageUrl }) => {
  return (
    <Link 
      to={link}
      className="group relative overflow-hidden rounded-xl shadow-soft hover:shadow-medium transition-all duration-300"
    >
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${imageUrl})` }}></div>
      <div className={`absolute inset-0 ${color} opacity-85 group-hover:opacity-75 transition-opacity duration-300`}></div>
      
      <div className="relative p-6 md:p-8 flex flex-col items-center text-center h-full justify-center text-white">
        <div className="bg-white rounded-full p-4 mb-4 group-hover:scale-110 transition-transform duration-300 text-neutral-800">
          {icon}
        </div>
        <h3 className="text-xl md:text-2xl font-semibold mb-2">{title}</h3>
        <p className="text-white/90 text-sm md:text-base">Explore Collection</p>
      </div>
    </Link>
  );
};

const Categories: React.FC = () => {
  const categories = [
    {
      title: "Indoor Plants",
      icon: <Leaf size={28} />,
      color: "bg-primary-600",
      link: "/products?category=plants&subcategory=indoor",
      imageUrl: "https://images.pexels.com/photos/1084199/pexels-photo-1084199.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      title: "Gardening Tools",
      icon: <Shovel size={28} />,
      color: "bg-secondary-600",
      link: "/products?category=tools",
      imageUrl: "https://images.pexels.com/photos/2136140/pexels-photo-2136140.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      title: "Seeds",
      icon: <Sprout size={28} />,
      color: "bg-accent-500",
      link: "/products?category=seeds",
      imageUrl: "https://images.pexels.com/photos/7728088/pexels-photo-7728088.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      title: "Irrigation",
      icon: <Droplets size={28} />,
      color: "bg-blue-600",
      link: "/products?category=irrigation",
      imageUrl: "https://images.pexels.com/photos/2749165/pexels-photo-2749165.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      title: "Soil & Fertilizers",
      icon: <FlowerIcon size={28} />,
      color: "bg-amber-700",
      link: "/products?category=soil",
      imageUrl: "https://images.pexels.com/photos/5502846/pexels-photo-5502846.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      title: "Pots & Planters",
      icon: <PotPlant size={28} />,
      color: "bg-neutral-800",
      link: "/products?category=pots",
      imageUrl: "https://images.pexels.com/photos/5825578/pexels-photo-5825578.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    }
  ];
  
  return (
    <section className="py-16 bg-neutral-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-neutral-900 mb-4">Shop by Category</h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            Explore our wide range of gardening products organized by category to help you find exactly what you need
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <CategoryCard 
              key={index}
              title={category.title}
              icon={category.icon}
              color={category.color}
              link={category.link}
              imageUrl={category.imageUrl}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
import React, { useState } from 'react';
import { Send } from 'lucide-react';
import Button from '../ui/Button';

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // In a real application, you would send this to your backend
      setIsSubscribed(true);
      setEmail('');
      // Reset the subscription state after a few seconds
      setTimeout(() => setIsSubscribed(false), 5000);
    }
  };
  
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto bg-primary-500 rounded-xl shadow-md overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-5">
            <div className="hidden md:block md:col-span-2 bg-[url('https://images.pexels.com/photos/2132227/pexels-photo-2132227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] bg-cover bg-center"></div>
            
            <div className="p-8 md:col-span-3">
              <h3 className="text-2xl font-bold text-white mb-2">Join Our Garden Community</h3>
              <p className="text-primary-100 mb-6">
                Subscribe to our newsletter for seasonal gardening tips, exclusive offers, and early access to new products.
              </p>
              
              {isSubscribed ? (
                <div className="bg-white/10 rounded-lg p-4 text-white animate-fade-in">
                  Thank you for subscribing! Check your email for a confirmation message.
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div className="relative">
                    <input
                      type="email"
                      placeholder="Your email address"
                      className="w-full px-4 py-3 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-300"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    variant="secondary"
                    className="w-full py-3"
                    rightIcon={<Send size={16} />}
                  >
                    Subscribe
                  </Button>
                  <p className="text-xs text-primary-100">
                    We respect your privacy. Unsubscribe at any time.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
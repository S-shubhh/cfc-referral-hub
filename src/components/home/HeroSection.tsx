
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Users, Wallet, Utensils } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-orange-50 to-red-50 py-20 overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23f97316%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%224%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
      
      <div className="container mx-auto px-4 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <div className="inline-block bg-orange-500 text-white font-bold text-4xl md:text-6xl px-6 py-3 rounded-lg mb-6 shadow-lg">
              CFC
            </div>
            
            <h1 className="text-2xl md:text-4xl font-bold text-gray-800 mb-6 leading-tight">
              खाओ, खिलाओ,<br />
              साथ में मिलके पैसे भी कमाओ
            </h1>
            
            <p className="text-lg text-gray-600 mb-8 max-w-lg">
              Join India's first subscription-based restaurant network. Enjoy unlimited food, refer friends, and earn money while you eat!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/auth?mode=signup">
                <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg">
                  Join Now for ₹1000
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/how-it-works">
                <Button variant="outline" size="lg" className="border-orange-500 text-orange-500 hover:bg-orange-50 px-8 py-4 text-lg">
                  How It Works
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-lg border border-orange-100">
              <div className="flex items-center space-x-4">
                <div className="bg-orange-100 p-3 rounded-lg">
                  <Utensils className="w-8 h-8 text-orange-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Unlimited Food</h3>
                  <p className="text-gray-600">Eat worth ₹1000 at any CFC restaurant</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg border border-green-100">
              <div className="flex items-center space-x-4">
                <div className="bg-green-100 p-3 rounded-lg">
                  <Users className="w-8 h-8 text-green-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Refer & Earn</h3>
                  <p className="text-gray-600">Get ₹300 for direct referrals, ₹100 for indirect</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg border border-blue-100">
              <div className="flex items-center space-x-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Wallet className="w-8 h-8 text-blue-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Withdraw Earnings</h3>
                  <p className="text-gray-600">Transfer your wallet balance to bank account</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;


import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Star, TrendingUp, Shield } from 'lucide-react';

const AboutSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            About CFC
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            CFC revolutionizes the restaurant industry by combining food subscription with network marketing. 
            We believe in creating value for our customers while building a community of food lovers and entrepreneurs.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <Card className="text-center border-orange-200 hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-orange-500" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Subscription Model</h3>
              <p className="text-gray-600 text-sm">
                Pay ₹1000 once and enjoy food worth the same amount across multiple visits
              </p>
            </CardContent>
          </Card>
          
          <Card className="text-center border-green-200 hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-green-500" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Quality Food</h3>
              <p className="text-gray-600 text-sm">
                Fresh, delicious meals prepared with high-quality ingredients and love
              </p>
            </CardContent>
          </Card>
          
          <Card className="text-center border-blue-200 hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-blue-500" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Earn Money</h3>
              <p className="text-gray-600 text-sm">
                Build your network and earn substantial income through our referral system
              </p>
            </CardContent>
          </Card>
          
          <Card className="text-center border-purple-200 hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-purple-500" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Secure & Trusted</h3>
              <p className="text-gray-600 text-sm">
                Complete KYC verification and secure payment processing for your peace of mind
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-8 md:p-12 text-white text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Why Choose CFC?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            <div>
              <div className="text-3xl font-bold mb-2">₹300</div>
              <div className="text-orange-100">Level 1 Referral Bonus</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">₹100</div>
              <div className="text-orange-100">Level 2 Referral Bonus</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">₹1000</div>
              <div className="text-orange-100">Food Value per Subscription</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;


import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Users, Target, Award, Utensils } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <div className="bg-gradient-to-br from-orange-50 to-red-50 py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                About CFC
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                खाओ, खिलाओ, साथ में मिलके पैसे भी कमाओ - CFC is revolutionizing the restaurant industry with India's first subscription-based dining network.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              <div className="text-center">
                <div className="bg-orange-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Utensils className="w-8 h-8 text-orange-500" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Unlimited Dining</h3>
                <p className="text-gray-600">Eat worth ₹1000 at any CFC partner restaurant</p>
              </div>

              <div className="text-center">
                <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Users className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Referral Network</h3>
                <p className="text-gray-600">Build your network and earn from referrals</p>
              </div>

              <div className="text-center">
                <div className="bg-blue-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Award className="w-8 h-8 text-blue-500" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Earn Rewards</h3>
                <p className="text-gray-600">Get ₹300 for direct and ₹100 for indirect referrals</p>
              </div>

              <div className="text-center">
                <div className="bg-purple-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Target className="w-8 h-8 text-purple-500" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Community Focus</h3>
                <p className="text-gray-600">Building a community of food lovers and entrepreneurs</p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-3xl font-bold text-center mb-8">Our Vision</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4">For Food Lovers</h3>
                  <p className="text-gray-600 mb-4">
                    CFC transforms the dining experience by offering unlimited access to quality food through our subscription model. No more worrying about expensive meals - just enjoy great food at our partner restaurants.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-4">For Entrepreneurs</h3>
                  <p className="text-gray-600 mb-4">
                    Our referral system empowers you to build a network and earn substantial income. Share CFC with friends and family, and get rewarded for every successful referral.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;

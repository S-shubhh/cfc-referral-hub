
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, UserPlus, Utensils, Users, Wallet } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: UserPlus,
      title: "1. Join CFC",
      description: "Subscribe for just ₹1000 and become a CFC member",
      color: "orange"
    },
    {
      icon: Utensils,
      title: "2. Enjoy Unlimited Food",
      description: "Visit any CFC partner restaurant and eat worth ₹1000",
      color: "green"
    },
    {
      icon: Users,
      title: "3. Refer Friends",
      description: "Share your referral code with friends and family",
      color: "blue"
    },
    {
      icon: Wallet,
      title: "4. Earn Money",
      description: "Get ₹300 for direct referrals and ₹100 for indirect ones",
      color: "purple"
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <div className="bg-gradient-to-br from-orange-50 to-red-50 py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                How CFC Works
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Join thousands of satisfied members who are eating well and earning money with CFC's revolutionary subscription model.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {steps.map((step, index) => {
                const IconComponent = step.icon;
                const colorClasses = {
                  orange: "bg-orange-100 text-orange-500",
                  green: "bg-green-100 text-green-500",
                  blue: "bg-blue-100 text-blue-500", 
                  purple: "bg-purple-100 text-purple-500"
                };
                
                return (
                  <div key={index} className="text-center">
                    <div className={`${colorClasses[step.color as keyof typeof colorClasses]} p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center`}>
                      <IconComponent className="w-8 h-8" />
                    </div>
                    <h3 className="font-semibold text-xl mb-4">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                );
              })}
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
              <h2 className="text-3xl font-bold text-center mb-8">Earning Potential</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="text-center">
                  <h3 className="text-2xl font-semibold text-green-600 mb-4">Direct Referrals</h3>
                  <div className="text-4xl font-bold text-green-600 mb-2">₹300</div>
                  <p className="text-gray-600">For each person you directly refer to CFC</p>
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-semibold text-blue-600 mb-4">Indirect Referrals</h3>
                  <div className="text-4xl font-bold text-blue-600 mb-2">₹100</div>
                  <p className="text-gray-600">For each person your referrals bring in</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-lg text-white p-8 text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
              <p className="text-xl mb-6">Join CFC today and start your journey of unlimited food and earnings!</p>
              <Link to="/auth?mode=signup">
                <Button size="lg" className="bg-white text-orange-500 hover:bg-gray-100 px-8 py-4 text-lg">
                  Join Now for ₹1000
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HowItWorks;

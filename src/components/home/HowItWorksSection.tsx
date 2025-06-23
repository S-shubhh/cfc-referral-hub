
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { UserPlus, CreditCard, Utensils, Users, Wallet, ArrowRight } from 'lucide-react';

const HowItWorksSection = () => {
  const steps = [
    {
      icon: UserPlus,
      title: "Sign Up",
      description: "Register with your details and complete KYC verification",
      color: "bg-blue-100 text-blue-500"
    },
    {
      icon: CreditCard,
      title: "Subscribe",
      description: "Pay ₹1000 subscription fee via UPI, card, or net banking",
      color: "bg-green-100 text-green-500"
    },
    {
      icon: Utensils,
      title: "Enjoy Food",
      description: "Visit any CFC restaurant and enjoy food worth ₹1000",
      color: "bg-orange-100 text-orange-500"
    },
    {
      icon: Users,
      title: "Refer Friends",
      description: "Share your referral code with friends and family",
      color: "bg-purple-100 text-purple-500"
    },
    {
      icon: Wallet,
      title: "Earn Money",
      description: "Get ₹300 for direct referrals and ₹100 for indirect ones",
      color: "bg-pink-100 text-pink-500"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            How CFC Works
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join the CFC family in 5 simple steps and start your journey towards delicious food and financial freedom
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-16">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <Card className="h-full hover:shadow-lg transition-shadow border-l-4 border-orange-500">
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 rounded-full ${step.color} flex items-center justify-center mx-auto mb-4`}>
                    <step.icon className="w-8 h-8" />
                  </div>
                  <div className="bg-orange-500 text-white text-sm font-bold rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-3">
                    {index + 1}
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                  <p className="text-gray-600 text-sm">{step.description}</p>
                </CardContent>
              </Card>
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                  <ArrowRight className="w-6 h-6 text-orange-500" />
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <h3 className="text-2xl font-bold text-center mb-8">Referral System Breakdown</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="text-center">
              <div className="bg-green-100 p-6 rounded-xl mb-4">
                <h4 className="text-xl font-semibold text-green-700 mb-2">Level 1 Referral</h4>
                <div className="text-3xl font-bold text-green-600 mb-2">₹300</div>
                <p className="text-gray-600">When someone you directly refer subscribes to CFC</p>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 p-6 rounded-xl mb-4">
                <h4 className="text-xl font-semibold text-blue-700 mb-2">Level 2 Referral</h4>
                <div className="text-3xl font-bold text-blue-600 mb-2">₹100</div>
                <p className="text-gray-600">When someone referred by your referral subscribes</p>
              </div>
            </div>
          </div>
          <div className="text-center mt-8">
            <p className="text-lg text-gray-600">
              Build your network, help others discover great food, and create a passive income stream!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;

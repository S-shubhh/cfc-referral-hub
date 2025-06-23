
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Check, ArrowRight } from 'lucide-react';

const Subscribe = () => {
  const benefits = [
    "Unlimited food worth ₹1000 at CFC restaurants",
    "Access to exclusive member-only restaurants",
    "Priority seating and reservations",
    "Monthly special events and tastings",
    "Earn ₹300 for each direct referral",
    "Earn ₹100 for each indirect referral",
    "Withdraw earnings directly to your bank account",
    "24/7 customer support"
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <div className="bg-gradient-to-br from-orange-50 to-red-50 py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                Join CFC Today
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Start your journey with unlimited food and earning opportunities for just ₹1000.
              </p>
            </div>

            <div className="max-w-2xl mx-auto">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-8 text-center">
                  <h2 className="text-3xl font-bold mb-2">CFC Membership</h2>
                  <div className="text-5xl font-bold mb-4">₹1000</div>
                  <p className="text-lg opacity-90">One-time subscription fee</p>
                </div>

                <div className="p-8">
                  <h3 className="text-2xl font-semibold mb-6">What's Included:</h3>
                  <ul className="space-y-4 mb-8">
                    {benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="text-center">
                    <Link to="/auth?mode=signup">
                      <Button size="lg" className="bg-orange-500 hover:bg-orange-600 px-8 py-4 text-lg w-full">
                        Subscribe Now
                        <ArrowRight className="ml-2 w-5 h-5" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>

              <div className="mt-8 text-center">
                <p className="text-gray-600 mb-4">Already have an account?</p>
                <Link to="/auth">
                  <Button variant="outline" className="border-orange-500 text-orange-500 hover:bg-orange-50">
                    Sign In
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Subscribe;

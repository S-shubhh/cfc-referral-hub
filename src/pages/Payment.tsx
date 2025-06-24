
import React, { useState } from 'react';
import { useAuth } from '@/components/auth/AuthContext';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { 
  CreditCard, 
  IndianRupee, 
  Check, 
  ArrowLeft,
  Smartphone,
  Building
} from 'lucide-react';

const Payment = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi' | 'netbanking'>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Card details
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardholderName, setCardholderName] = useState('');
  
  // UPI details
  const [upiId, setUpiId] = useState('');
  
  // Net banking
  const [selectedBank, setSelectedBank] = useState('');

  const subscriptionAmount = 1000;
  const referralCode = searchParams.get('ref');

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Payment Successful!",
        description: "Welcome to CFC! Your subscription is now active.",
      });
      
      // Redirect to dashboard after successful payment
      navigate('/dashboard');
      
    } catch (error) {
      console.error('Payment error:', error);
      toast({
        title: "Payment Failed",
        description: "Please try again or contact support.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-20">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Please Login First</h1>
            <p className="text-gray-600 mb-4">You need to login to complete your subscription.</p>
            <Button onClick={() => navigate('/auth')}>Go to Login</Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/subscribe')}
              className="mb-4"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Subscription
            </Button>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Complete Your Payment</h1>
            <p className="text-gray-600">Secure payment to activate your CFC membership</p>
          </div>

          {referralCode && (
            <Card className="mb-6 border-green-200 bg-green-50">
              <CardContent className="pt-6">
                <div className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span className="text-green-700">
                    Referral code applied: <strong>{referralCode}</strong>
                  </span>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Payment Details</CardTitle>
                  <CardDescription>Choose your preferred payment method</CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Payment Method Selection */}
                  <div className="mb-6">
                    <Label className="text-base font-medium mb-3 block">Payment Method</Label>
                    <div className="grid grid-cols-3 gap-3">
                      <Button
                        type="button"
                        variant={paymentMethod === 'card' ? 'default' : 'outline'}
                        onClick={() => setPaymentMethod('card')}
                        className="flex flex-col items-center p-4 h-auto"
                      >
                        <CreditCard className="h-6 w-6 mb-2" />
                        <span className="text-xs">Card</span>
                      </Button>
                      <Button
                        type="button"
                        variant={paymentMethod === 'upi' ? 'default' : 'outline'}
                        onClick={() => setPaymentMethod('upi')}
                        className="flex flex-col items-center p-4 h-auto"
                      >
                        <Smartphone className="h-6 w-6 mb-2" />
                        <span className="text-xs">UPI</span>
                      </Button>
                      <Button
                        type="button"
                        variant={paymentMethod === 'netbanking' ? 'default' : 'outline'}
                        onClick={() => setPaymentMethod('netbanking')}
                        className="flex flex-col items-center p-4 h-auto"
                      >
                        <Building className="h-6 w-6 mb-2" />
                        <span className="text-xs">Net Banking</span>
                      </Button>
                    </div>
                  </div>

                  <form onSubmit={handlePayment} className="space-y-4">
                    {paymentMethod === 'card' && (
                      <>
                        <div>
                          <Label htmlFor="cardNumber">Card Number</Label>
                          <Input
                            id="cardNumber"
                            placeholder="1234 5678 9012 3456"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                            required
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="expiryDate">Expiry Date</Label>
                            <Input
                              id="expiryDate"
                              placeholder="MM/YY"
                              value={expiryDate}
                              onChange={(e) => setExpiryDate(e.target.value)}
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="cvv">CVV</Label>
                            <Input
                              id="cvv"
                              placeholder="123"
                              value={cvv}
                              onChange={(e) => setCvv(e.target.value)}
                              required
                            />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="cardholderName">Cardholder Name</Label>
                          <Input
                            id="cardholderName"
                            placeholder="John Doe"
                            value={cardholderName}
                            onChange={(e) => setCardholderName(e.target.value)}
                            required
                          />
                        </div>
                      </>
                    )}

                    {paymentMethod === 'upi' && (
                      <div>
                        <Label htmlFor="upiId">UPI ID</Label>
                        <Input
                          id="upiId"
                          placeholder="yourname@paytm"
                          value={upiId}
                          onChange={(e) => setUpiId(e.target.value)}
                          required
                        />
                      </div>
                    )}

                    {paymentMethod === 'netbanking' && (
                      <div>
                        <Label htmlFor="bank">Select Bank</Label>
                        <select
                          id="bank"
                          value={selectedBank}
                          onChange={(e) => setSelectedBank(e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded-md"
                          required
                        >
                          <option value="">Choose your bank</option>
                          <option value="sbi">State Bank of India</option>
                          <option value="hdfc">HDFC Bank</option>
                          <option value="icici">ICICI Bank</option>
                          <option value="axis">Axis Bank</option>
                          <option value="kotak">Kotak Mahindra Bank</option>
                        </select>
                      </div>
                    )}

                    <Button 
                      type="submit" 
                      className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                      disabled={isProcessing}
                    >
                      {isProcessing ? 'Processing...' : `Pay ₹${subscriptionAmount}`}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <IndianRupee className="mr-2 h-5 w-5" />
                    Order Summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>CFC Membership</span>
                      <span>₹{subscriptionAmount}</span>
                    </div>
                    {referralCode && (
                      <div className="flex justify-between text-green-600">
                        <span>Referral Discount</span>
                        <span>₹0</span>
                      </div>
                    )}
                    <hr />
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>₹{subscriptionAmount}</span>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium mb-2">What you get:</h4>
                    <ul className="text-sm space-y-1 text-gray-600">
                      <li>• Unlimited food worth ₹1000</li>
                      <li>• Earn ₹300 per referral</li>
                      <li>• Access to premium restaurants</li>
                      <li>• 24/7 customer support</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Payment;


import React, { useState, useEffect } from 'react';
import { useAuth } from '@/components/auth/AuthContext';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Eye, EyeOff, ArrowRight } from 'lucide-react';

const Auth = () => {
  const { user, signIn, signUp, loading } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  
  const [isLogin, setIsLogin] = useState(searchParams.get('mode') !== 'signup');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const referralCode = searchParams.get('ref');

  useEffect(() => {
    if (!loading && user) {
      // If user is logged in and came from signup, redirect to payment
      if (searchParams.get('mode') === 'signup') {
        const paymentUrl = referralCode ? `/payment?ref=${referralCode}` : '/payment';
        navigate(paymentUrl);
      } else {
        navigate('/dashboard');
      }
    }
  }, [user, loading, navigate, searchParams, referralCode]);

  useEffect(() => {
    setIsLogin(searchParams.get('mode') !== 'signup');
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (isLogin) {
        const { error } = await signIn(email, password);
        if (error) throw error;
        
        toast({
          title: "Welcome back!",
          description: "You have successfully logged in.",
        });
      } else {
        if (password !== confirmPassword) {
          throw new Error("Passwords don't match");
        }

        if (password.length < 6) {
          throw new Error("Password must be at least 6 characters long");
        }

        const { error } = await signUp(email, password, {
          full_name: fullName,
          phone: phone,
          referral_code: referralCode
        });
        
        if (error) throw error;

        toast({
          title: "Account created!",
          description: "Please check your email to verify your account.",
        });
      }
    } catch (error: any) {
      console.error('Auth error:', error);
      toast({
        title: "Authentication Error",
        description: error.message || 'An error occurred during authentication',
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
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

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold">
                {isLogin ? 'Welcome Back' : 'Join CFC Today'}
              </CardTitle>
              <CardDescription>
                {isLogin 
                  ? 'Sign in to your account to continue' 
                  : 'Create your account to start earning and enjoying unlimited food'
                }
              </CardDescription>
              {referralCode && !isLogin && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-3 mt-4">
                  <p className="text-green-700 text-sm">
                    🎉 You were referred by someone! You'll get special benefits.
                  </p>
                  <p className="text-green-600 text-xs mt-1">
                    Referral Code: <strong>{referralCode}</strong>
                  </p>
                </div>
              )}
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                  <>
                    <div>
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input
                        id="fullName"
                        type="text"
                        placeholder="Enter your full name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="Enter your phone number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                      />
                    </div>
                  </>
                )}
                
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-400" />
                      )}
                    </Button>
                  </div>
                </div>
                
                {!isLogin && (
                  <div>
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Confirm your password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>
                )}
                
                <Button 
                  type="submit" 
                  className="w-full bg-orange-500 hover:bg-orange-600"
                  disabled={isSubmitting}
                >
                  {isSubmitting 
                    ? 'Please wait...' 
                    : isLogin 
                      ? 'Sign In' 
                      : 'Create Account & Continue to Payment'
                  }
                  {!isLogin && <ArrowRight className="ml-2 h-4 w-4" />}
                </Button>
              </form>
              
              <div className="mt-6 text-center text-sm">
                {isLogin ? (
                  <p>
                    Don't have an account?{' '}
                    <Link 
                      to={`/auth?mode=signup${referralCode ? `&ref=${referralCode}` : ''}`}
                      className="text-orange-600 hover:text-orange-500 font-medium"
                    >
                      Sign up here
                    </Link>
                  </p>
                ) : (
                  <p>
                    Already have an account?{' '}
                    <Link 
                      to="/auth"
                      className="text-orange-600 hover:text-orange-500 font-medium"
                    >
                      Sign in here
                    </Link>
                  </p>
                )}
              </div>
              
              {!isLogin && (
                <div className="mt-4 p-3 bg-orange-50 rounded-lg">
                  <p className="text-orange-700 text-xs text-center">
                    After creating your account, you'll be taken to secure payment to complete your CFC membership for just ₹1000.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Auth;

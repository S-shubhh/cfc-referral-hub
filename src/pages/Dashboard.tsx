import React, { useState, useEffect } from 'react';
import { useAuth } from '@/components/auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { 
  User, 
  Wallet, 
  Users, 
  FileText, 
  Copy, 
  CheckCircle, 
  AlertCircle,
  Upload,
  IndianRupee,
  CreditCard,
  RefreshCw
} from 'lucide-react';

interface UserData {
  id: string;
  name: string;
  email: string;
  mobile: string;
  balance: number;
  referral_code: string;
  kyc_status: string;
  can_withdraw: boolean;
  referral_bonus: number;
}

interface ReferralData {
  id: string;
  referred_user_id: string;
  bonus_amount: number;
  created_at: string;
  status: string;
}

const Dashboard = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [userData, setUserData] = useState<UserData | null>(null);
  const [referrals, setReferrals] = useState<ReferralData[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user && !authLoading) {
      fetchUserData();
    }
  }, [user, authLoading]);

  const fetchUserData = async () => {
    if (!user) return;
    
    setLoadingData(true);
    
    try {
      console.log('Fetching user data for:', user.id);
      
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .maybeSingle();

      if (error) {
        console.error('Supabase error:', error);
      }

      // Always set user data - either from database or defaults
      const defaultUserData: UserData = {
        id: user.id,
        name: user.user_metadata?.full_name || user.email?.split('@')[0] || 'User',
        email: user.email || '',
        mobile: user.user_metadata?.phone || '',
        balance: 0,
        referral_code: 'CFC' + Math.random().toString(36).substring(2, 8).toUpperCase(),
        kyc_status: 'pending',
        can_withdraw: false,
        referral_bonus: 0
      };

      setUserData(data || defaultUserData);
      await fetchReferrals();
      
    } catch (error: any) {
      console.error('Error fetching user data:', error);
      // Set default user data on error
      setUserData({
        id: user.id,
        name: user.user_metadata?.full_name || user.email?.split('@')[0] || 'User',
        email: user.email || '',
        mobile: user.user_metadata?.phone || '',
        balance: 0,
        referral_code: 'CFC' + Math.random().toString(36).substring(2, 8).toUpperCase(),
        kyc_status: 'pending',
        can_withdraw: false,
        referral_bonus: 0
      });
      setReferrals([]);
    } finally {
      setLoadingData(false);
    }
  };

  const fetchReferrals = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('referrals')
        .select('*')
        .eq('referrer_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching referrals:', error);
        setReferrals([]);
        return;
      }
      setReferrals(data || []);
    } catch (error) {
      console.error('Error fetching referrals:', error);
      setReferrals([]);
    }
  };

  const copyReferralCode = () => {
    if (userData?.referral_code) {
      navigator.clipboard.writeText(userData.referral_code);
      toast({
        title: "Copied!",
        description: "Referral code copied to clipboard",
      });
    }
  };

  const copyReferralLink = () => {
    if (userData?.referral_code) {
      const referralLink = `${window.location.origin}/auth?mode=signup&ref=${userData.referral_code}`;
      navigator.clipboard.writeText(referralLink);
      toast({
        title: "Copied!",
        description: "Referral link copied to clipboard",
      });
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto mb-4"></div>
            <p>Loading your dashboard...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Show dashboard even if userData is loading or missing
  const displayUserData = userData || {
    id: user?.id || '',
    name: user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User',
    email: user?.email || '',
    mobile: user?.user_metadata?.phone || '',
    balance: 0,
    referral_code: 'CFC' + Math.random().toString(36).substring(2, 8).toUpperCase(),
    kyc_status: 'pending',
    can_withdraw: false,
    referral_bonus: 0
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome back, {displayUserData.name}!</h1>
          <p className="text-gray-600">Manage your CFC account and earnings</p>
          {loadingData && (
            <p className="text-sm text-orange-600 mt-2">Loading your data...</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
              <IndianRupee className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{displayUserData.balance.toFixed(2)}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Referral Bonus</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{displayUserData.referral_bonus.toFixed(2)}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Referrals</CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{referrals.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">KYC Status</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <Badge variant={displayUserData.kyc_status === 'verified' ? 'default' : 'secondary'}>
                {displayUserData.kyc_status}
              </Badge>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="referrals">Referrals</TabsTrigger>
            <TabsTrigger value="kyc">KYC Verification</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button 
                    className="w-full bg-orange-500 hover:bg-orange-600" 
                    onClick={() => navigate('/payment')}
                  >
                    <CreditCard className="mr-2 h-4 w-4" />
                    Subscribe to CFC
                  </Button>
                  <Button 
                    className="w-full" 
                    onClick={() => navigate('/wallet')}
                    disabled={!displayUserData.can_withdraw}
                  >
                    <Wallet className="mr-2 h-4 w-4" />
                    Withdraw Earnings
                  </Button>
                  {!displayUserData.can_withdraw && (
                    <p className="text-sm text-gray-600">
                      You need at least 3 referrals to withdraw earnings
                    </p>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Your Referral Code</CardTitle>
                  <CardDescription>Share this code to earn referral bonuses</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <code className="flex-1 p-2 bg-gray-100 rounded text-lg font-mono">
                      {displayUserData.referral_code}
                    </code>
                    <Button size="sm" onClick={copyReferralCode}>
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button 
                    onClick={copyReferralLink}
                    variant="outline"
                    className="w-full"
                  >
                    Copy Referral Link
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="referrals">
            <Card>
              <CardHeader>
                <CardTitle>Your Referrals</CardTitle>
                <CardDescription>
                  You earn ₹300 for each direct referral and ₹100 for indirect referrals
                </CardDescription>
              </CardHeader>
              <CardContent>
                {referrals.length === 0 ? (
                  <div className="text-center py-8">
                    <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 text-lg mb-2">No referrals yet</p>
                    <p className="text-gray-500">Start sharing your referral code to earn bonuses!</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {referrals.map((referral) => (
                      <div key={referral.id} className="flex items-center justify-between p-4 border rounded">
                        <div>
                          <p className="font-medium">Referral #{referral.id.slice(0, 8)}</p>
                          <p className="text-sm text-gray-600">
                            {new Date(referral.created_at).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-green-600">+₹{referral.bonus_amount}</p>
                          <Badge variant={referral.status === 'completed' ? 'default' : 'secondary'}>
                            {referral.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="kyc">
            <Card>
              <CardHeader>
                <CardTitle>KYC Verification</CardTitle>
                <CardDescription>
                  Complete your KYC to unlock all features
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center space-x-2">
                    {displayUserData.kyc_status === 'verified' ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-yellow-500" />
                    )}
                    <span className="font-medium">
                      Status: {displayUserData.kyc_status}
                    </span>
                  </div>

                  {displayUserData.kyc_status !== 'verified' && (
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2">Required Documents:</h4>
                        <ul className="space-y-2 text-sm text-gray-600">
                          <li>• Aadhaar Card (Front & Back)</li>
                          <li>• PAN Card</li>
                        </ul>
                      </div>

                      <Button>
                        <Upload className="mr-2 h-4 w-4" />
                        Upload Documents
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Name</label>
                  <p className="text-gray-600">{displayUserData.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Email</label>
                  <p className="text-gray-600">{displayUserData.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Mobile</label>
                  <p className="text-gray-600">{displayUserData.mobile || 'Not provided'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Referral Code</label>
                  <p className="text-gray-600 font-mono">{displayUserData.referral_code}</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;

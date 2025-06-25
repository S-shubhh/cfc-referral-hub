
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/components/auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/integrations/supabase/client';
import DashboardStats from '@/components/dashboard/DashboardStats';
import QuickActions from '@/components/dashboard/QuickActions';
import ReferralCode from '@/components/dashboard/ReferralCode';
import ReferralsList from '@/components/dashboard/ReferralsList';
import KYCVerification from '@/components/dashboard/KYCVerification';
import ProfileInfo from '@/components/dashboard/ProfileInfo';

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

        <DashboardStats 
          userData={displayUserData} 
          referralsCount={referrals.length} 
        />

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="referrals">Referrals</TabsTrigger>
            <TabsTrigger value="kyc">KYC Verification</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <QuickActions canWithdraw={displayUserData.can_withdraw} />
              <ReferralCode referralCode={displayUserData.referral_code} />
            </div>
          </TabsContent>

          <TabsContent value="referrals">
            <ReferralsList referrals={referrals} />
          </TabsContent>

          <TabsContent value="kyc">
            <KYCVerification kycStatus={displayUserData.kyc_status} />
          </TabsContent>

          <TabsContent value="profile">
            <ProfileInfo userData={displayUserData} />
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;

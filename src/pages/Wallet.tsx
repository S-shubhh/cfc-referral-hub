
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/components/auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { 
  IndianRupee, 
  ArrowDownLeft, 
  Clock, 
  CheckCircle, 
  XCircle,
  CreditCard
} from 'lucide-react';

interface UserData {
  id: string;
  balance: number;
  can_withdraw: boolean;
}

interface Transaction {
  id: string;
  amount: number;
  type: string;
  description: string;
  status: string;
  created_at: string;
}

interface Withdrawal {
  id: string;
  amount: number;
  status: string;
  created_at: string;
  bank_name: string;
  account_holder_name: string;
}

const Wallet = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [userData, setUserData] = useState<UserData | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [withdrawals, setWithdrawals] = useState<Withdrawal[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  
  // Withdrawal form state
  const [showWithdrawForm, setShowWithdrawForm] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [ifscCode, setIfscCode] = useState('');
  const [accountHolderName, setAccountHolderName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user) {
      fetchWalletData();
    }
  }, [user]);

  const fetchWalletData = async () => {
    try {
      // Fetch user data
      const { data: userRes, error: userError } = await supabase
        .from('users')
        .select('id, balance, can_withdraw')
        .eq('id', user?.id)
        .single();

      if (userError) throw userError;
      setUserData(userRes);

      // Fetch transactions
      const { data: transactionsRes, error: transError } = await supabase
        .from('transactions')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (transError) throw transError;
      setTransactions(transactionsRes || []);

      // Fetch withdrawals
      const { data: withdrawalsRes, error: withdrawError } = await supabase
        .from('withdrawals')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (withdrawError) throw withdrawError;
      setWithdrawals(withdrawalsRes || []);

    } catch (error) {
      console.error('Error fetching wallet data:', error);
      toast({
        title: "Error",
        description: "Failed to load wallet data",
        variant: "destructive",
      });
    } finally {
      setLoadingData(false);
    }
  };

  const handleWithdrawSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userData) return;

    const amount = parseFloat(withdrawAmount);
    if (amount <= 0 || amount > userData.balance) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid withdrawal amount",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('withdrawals')
        .insert({
          user_id: user?.id,
          amount: amount,
          bank_name: bankName,
          bank_account_number: accountNumber,
          ifsc_code: ifscCode,
          account_holder_name: accountHolderName,
          status: 'pending'
        });

      if (error) throw error;

      toast({
        title: "Withdrawal Requested",
        description: "Your withdrawal request has been submitted and is being processed",
      });

      // Reset form and close
      setShowWithdrawForm(false);
      setWithdrawAmount('');
      setBankName('');
      setAccountNumber('');
      setIfscCode('');
      setAccountHolderName('');
      
      // Refresh data
      fetchWalletData();

    } catch (error) {
      console.error('Error submitting withdrawal:', error);
      toast({
        title: "Error",
        description: "Failed to submit withdrawal request",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'rejected':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'default';
      case 'pending':
        return 'secondary';
      case 'rejected':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  if (loading || loadingData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p>Loading wallet...</p>
        </div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-20">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Error Loading Wallet</h1>
            <p className="text-gray-600 mb-4">Unable to load your wallet data.</p>
            <Button onClick={() => window.location.reload()}>Reload Page</Button>
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
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">My Wallet</h1>
          <p className="text-gray-600">Manage your earnings and withdrawals</p>
        </div>

        {/* Balance Card */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <IndianRupee className="mr-2 h-5 w-5" />
              Available Balance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-green-600 mb-4">
              ₹{userData.balance.toFixed(2)}
            </div>
            <div className="flex space-x-4">
              <Button 
                onClick={() => setShowWithdrawForm(true)}
                disabled={!userData.can_withdraw || userData.balance <= 0}
                className="bg-orange-500 hover:bg-orange-600"
              >
                <ArrowDownLeft className="mr-2 h-4 w-4" />
                Withdraw Money
              </Button>
              {!userData.can_withdraw && (
                <p className="text-sm text-gray-600 flex items-center">
                  You need at least 3 referrals to withdraw earnings
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Withdrawal Form */}
        {showWithdrawForm && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Withdraw Money</CardTitle>
              <CardDescription>Enter your bank details to withdraw funds</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleWithdrawSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="amount">Withdrawal Amount</Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="Enter amount"
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    max={userData.balance}
                    min="1"
                    required
                  />
                  <p className="text-sm text-gray-600 mt-1">
                    Maximum: ₹{userData.balance.toFixed(2)}
                  </p>
                </div>

                <div>
                  <Label htmlFor="accountHolder">Account Holder Name</Label>
                  <Input
                    id="accountHolder"
                    placeholder="Enter account holder name"
                    value={accountHolderName}
                    onChange={(e) => setAccountHolderName(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="bankName">Bank Name</Label>
                  <Input
                    id="bankName"
                    placeholder="Enter bank name"
                    value={bankName}
                    onChange={(e) => setBankName(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="accountNumber">Account Number</Label>
                  <Input
                    id="accountNumber"
                    placeholder="Enter account number"
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="ifsc">IFSC Code</Label>
                  <Input
                    id="ifsc"
                    placeholder="Enter IFSC code"
                    value={ifscCode}
                    onChange={(e) => setIfscCode(e.target.value.toUpperCase())}
                    required
                  />
                </div>

                <div className="flex space-x-4">
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Processing...' : 'Submit Withdrawal'}
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setShowWithdrawForm(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Withdrawal History */}
          <Card>
            <CardHeader>
              <CardTitle>Withdrawal History</CardTitle>
            </CardHeader>
            <CardContent>
              {withdrawals.length === 0 ? (
                <p className="text-gray-600">No withdrawals yet</p>
              ) : (
                <div className="space-y-4">
                  {withdrawals.map((withdrawal) => (
                    <div key={withdrawal.id} className="flex items-center justify-between p-4 border rounded">
                      <div>
                        <p className="font-medium">₹{withdrawal.amount.toFixed(2)}</p>
                        <p className="text-sm text-gray-600">{withdrawal.bank_name}</p>
                        <p className="text-sm text-gray-600">
                          {new Date(withdrawal.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(withdrawal.status)}
                        <Badge variant={getStatusColor(withdrawal.status)}>
                          {withdrawal.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Transaction History */}
          <Card>
            <CardHeader>
              <CardTitle>Transaction History</CardTitle>
            </CardHeader>
            <CardContent>
              {transactions.length === 0 ? (
                <p className="text-gray-600">No transactions yet</p>
              ) : (
                <div className="space-y-4">
                  {transactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-4 border rounded">
                      <div>
                        <p className="font-medium">{transaction.description || transaction.type}</p>
                        <p className="text-sm text-gray-600">
                          {new Date(transaction.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className={`font-bold ${transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'}`}>
                          {transaction.type === 'credit' ? '+' : '-'}₹{transaction.amount.toFixed(2)}
                        </p>
                        <Badge variant={getStatusColor(transaction.status)}>
                          {transaction.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
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

export default Wallet;

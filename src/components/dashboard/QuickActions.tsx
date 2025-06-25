
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CreditCard, Wallet } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface QuickActionsProps {
  canWithdraw: boolean;
}

const QuickActions = ({ canWithdraw }: QuickActionsProps) => {
  const navigate = useNavigate();

  return (
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
          disabled={!canWithdraw}
        >
          <Wallet className="mr-2 h-4 w-4" />
          Withdraw Earnings
        </Button>
        {!canWithdraw && (
          <p className="text-sm text-gray-600">
            You need at least 3 referrals to withdraw earnings
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default QuickActions;

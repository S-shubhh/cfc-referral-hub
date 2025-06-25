
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users } from 'lucide-react';

interface ReferralData {
  id: string;
  bonus_amount: number;
  created_at: string;
  status: string;
}

interface ReferralsListProps {
  referrals: ReferralData[];
}

const ReferralsList = ({ referrals }: ReferralsListProps) => {
  return (
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
  );
};

export default ReferralsList;

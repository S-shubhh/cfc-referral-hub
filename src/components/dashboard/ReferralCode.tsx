
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ReferralCodeProps {
  referralCode: string;
}

const ReferralCode = ({ referralCode }: ReferralCodeProps) => {
  const { toast } = useToast();

  const copyReferralCode = () => {
    navigator.clipboard.writeText(referralCode);
    toast({
      title: "Copied!",
      description: "Referral code copied to clipboard",
    });
  };

  const copyReferralLink = () => {
    const referralLink = `${window.location.origin}/auth?mode=signup&ref=${referralCode}`;
    navigator.clipboard.writeText(referralLink);
    toast({
      title: "Copied!",
      description: "Referral link copied to clipboard",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Referral Code</CardTitle>
        <CardDescription>Share this code to earn referral bonuses</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-2">
          <code className="flex-1 p-2 bg-gray-100 rounded text-lg font-mono">
            {referralCode}
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
  );
};

export default ReferralCode;


import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, AlertCircle, Upload } from 'lucide-react';

interface KYCVerificationProps {
  kycStatus: string;
}

const KYCVerification = ({ kycStatus }: KYCVerificationProps) => {
  return (
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
            {kycStatus === 'verified' ? (
              <CheckCircle className="h-5 w-5 text-green-500" />
            ) : (
              <AlertCircle className="h-5 w-5 text-yellow-500" />
            )}
            <span className="font-medium">
              Status: {kycStatus}
            </span>
          </div>

          {kycStatus !== 'verified' && (
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
  );
};

export default KYCVerification;

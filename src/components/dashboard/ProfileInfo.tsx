
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface UserData {
  name: string;
  email: string;
  mobile: string;
  referral_code: string;
}

interface ProfileInfoProps {
  userData: UserData;
}

const ProfileInfo = ({ userData }: ProfileInfoProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-medium">Name</label>
          <p className="text-gray-600">{userData.name}</p>
        </div>
        <div>
          <label className="text-sm font-medium">Email</label>
          <p className="text-gray-600">{userData.email}</p>
        </div>
        <div>
          <label className="text-sm font-medium">Mobile</label>
          <p className="text-gray-600">{userData.mobile || 'Not provided'}</p>
        </div>
        <div>
          <label className="text-sm font-medium">Referral Code</label>
          <p className="text-gray-600 font-mono">{userData.referral_code}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileInfo;

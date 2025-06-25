
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, userData: any) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('Setting up auth state listener');
    
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.id);
        setSession(session);
        setUser(session?.user ?? null);
        
        // If user has a session, ensure they have a user record
        if (session?.user && event === 'SIGNED_IN') {
          await createUserRecordIfNeeded(session.user);
        }
        
        setLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('Initial session check:', session?.user?.id);
      setSession(session);
      setUser(session?.user ?? null);
      
      // If there's an existing session, ensure user record exists
      if (session?.user) {
        createUserRecordIfNeeded(session.user).then(() => {
          setLoading(false);
        });
      } else {
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const createUserRecordIfNeeded = async (authUser: User) => {
    try {
      console.log('Checking user record for:', authUser.id);
      
      // First check if user already exists
      const { data: existingUser, error: checkError } = await supabase
        .from('users')
        .select('id')
        .eq('id', authUser.id)
        .maybeSingle();

      if (checkError) {
        console.error('Error checking user record:', checkError);
        return;
      }

      if (!existingUser) {
        console.log('Creating new user record for:', authUser.id);
        
        // Generate referral code
        const referralCode = 'CFC' + Math.random().toString(36).substring(2, 8).toUpperCase();
        
        // Use upsert to handle potential race conditions
        const { error: insertError } = await supabase
          .from('users')
          .upsert({
            id: authUser.id,
            name: authUser.user_metadata?.full_name || authUser.email?.split('@')[0] || 'User',
            email: authUser.email || '',
            mobile: authUser.user_metadata?.phone || '',
            password_hash: '', // Not needed for Supabase Auth users
            aadhaar_number: '',
            pan_number: '',
            aadhaar_image_path: '',
            pan_image_path: '',
            referral_code: referralCode,
            balance: 0,
            referral_bonus: 0,
            can_withdraw: false,
            kyc_status: 'pending'
          }, { 
            onConflict: 'id',
            ignoreDuplicates: true 
          });

        if (insertError) {
          console.error('Error creating user record:', insertError);
        } else {
          console.log('User record created successfully');
        }
      } else {
        console.log('User record already exists');
      }
    } catch (error) {
      console.error('Error in createUserRecordIfNeeded:', error);
    }
  };

  const signUp = async (email: string, password: string, userData: any) => {
    console.log('Signing up user:', email);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData
      }
    });
    return { error };
  };

  const signIn = async (email: string, password: string) => {
    console.log('Signing in user:', email);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    return { error };
  };

  const signOut = async () => {
    console.log('Signing out user');
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{
      user,
      session,
      loading,
      signUp,
      signIn,
      signOut
    }}>
      {children}
    </AuthContext.Provider>
  );
};

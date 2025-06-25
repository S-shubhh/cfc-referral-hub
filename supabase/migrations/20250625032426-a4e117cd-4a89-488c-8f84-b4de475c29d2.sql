
-- Enable RLS on users table if not already enabled
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Create policy for users to view their own records
CREATE POLICY "Users can view own record" ON public.users
FOR SELECT
USING (auth.uid() = id);

-- Create policy for edge functions to insert user records (using service role)
CREATE POLICY "Service role can insert users" ON public.users
FOR INSERT
WITH CHECK (true);

-- Create policy for users to update their own records
CREATE POLICY "Users can update own record" ON public.users
FOR UPDATE
USING (auth.uid() = id);

-- Enable RLS on other tables and create policies
ALTER TABLE public.referrals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own referrals" ON public.referrals
FOR SELECT
USING (auth.uid() = referrer_id OR auth.uid() = referred_user_id);

CREATE POLICY "Service role can insert referrals" ON public.referrals
FOR INSERT
WITH CHECK (true);

ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own transactions" ON public.transactions
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Service role can insert transactions" ON public.transactions
FOR INSERT
WITH CHECK (true);

ALTER TABLE public.withdrawals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own withdrawals" ON public.withdrawals
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own withdrawals" ON public.withdrawals
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Service role can update withdrawals" ON public.withdrawals
FOR UPDATE
USING (true);

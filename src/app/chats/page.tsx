'use client';
import React from 'react';
import ChatList from '@/components/ChatList';
import { logout } from '@/store/services/usersSlice';
import { useAppDispatch } from '@/lib/reduxHelpers';
import ReduxProvider from '@/components/ReduxProvider';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
// Create a single supabase client for interacting with your database
import { SUPABASE_ANON_KEY, SUPABASE_URL } from '@/lib/supabaseConfig';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
type Props = {};

const Page: React.FC<Props> = () => {
  const router = useRouter();

  const dispatch = useAppDispatch();
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    dispatch(logout());
    if (error) {
      console.error('Error logging out:', error.message);
    } else {
      console.log('Logged out successfully');
      router.push('/');
    }
  };

  // https://levelup.gitconnected.com/say-goodbye-to-otps-using-login-with-whatsapp-2c3418e7cce9
  return (
    <ReduxProvider>
      <button onClick={handleLogout}>Logout</button>
    </ReduxProvider>
  );
};

export default Page;

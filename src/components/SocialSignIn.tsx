import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faGithub } from '@fortawesome/free-brands-svg-icons';
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import { SUPABASE_ANON_KEY, SUPABASE_URL } from '@/lib/supabaseConfig';
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
enum fontawesomeIcons {
  google = 'google',
  github = 'github'
}

type Props = {
  provider: string;
  icon: fontawesomeIcons;
};

export default function SocialSignIn({ provider, icon }: Props) {
  const iconDefinition = icon === fontawesomeIcons.github ? faGithub : faGoogle;
  const router = useRouter();

  const handleSocialSignIn = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: provider as any,
      options: {
        queryParams: {
          access_type: 'offline',
          prompt: 'consent'
        }
      }
    });
    // const { error } = await supabase.auth.signIn( {provider: provider });
    if (error) {
      console.error('Error signing in:', error.message);
    } else {
      console.log('Signed in successfully');
      // router.push("/chats")
    }
  };
  return (
    <button onClick={handleSocialSignIn}>
      <FontAwesomeIcon
        icon={iconDefinition}
        style={{
          color: 'red',
          backgroundColor: 'green',
          padding: '0',
          margin: '0'
        }}
      />
    </button>
  );
}

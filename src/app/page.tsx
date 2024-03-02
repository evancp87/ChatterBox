import Image from 'next/image';
// import styles from './page.module.css'
import ReduxProvider from '@/components/ReduxProvider';
import Authorisation from '@/components/Authorisation';
import Login from '@/components/Login';
export default function Home() {
  return (
    <ReduxProvider>
      <main>
        <Authorisation />
      </main>
    </ReduxProvider>
  );
}

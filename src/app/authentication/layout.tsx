// import './globals.css';
import styles from '@/styles/style.module.css';

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}

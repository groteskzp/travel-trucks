import type { Metadata } from 'next';
import './globals.css';
import { Inter, Manrope } from 'next/font/google';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
import { Toaster } from 'sonner';
import Header from '@/components/Header/Header';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-family',
  display: 'swap',
});
const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--second-family',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'TravelTrucks',
  description: 'Camper rental: find and book the camper of your dreams',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={`${inter.variable} ${manrope.variable}`}>
      <body>
        <Header />
        <TanStackProvider>{children}</TanStackProvider>
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}

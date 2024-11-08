import type { Metadata } from 'next';
import { SessionProvider } from 'next-auth/react';
import { auth } from '@/lib/auth';
import { Navbar } from './_components/navbar';

export const metadata: Metadata = {
  title: 'Магазин одежды',
  description: 'Продажа одежды',
  icons: {
    icon: '/logo.png',
  },
};

const FaceLayout = async ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const session = await auth();

  return (
    <>
      <SessionProvider session={session}>
        <Navbar />
      </SessionProvider>
      <main id="main" className="h-full pt-[60px] pb-2 md:pb-6 bg-face-background text-face-foreground overflow-auto">
        {children}
      </main>
    </>
  );
};

export default FaceLayout;

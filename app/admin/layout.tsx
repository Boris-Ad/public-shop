import type { Metadata } from 'next';
import { SessionProvider } from 'next-auth/react';
import { auth } from '@/lib/auth';
import { Navbar } from './_components/navbar';
import { Sidebar } from './_components/sidebar';
import { Toaster } from '@/components/ui/toaster';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Admin Page',
  description: 'Dashboard',
  icons: {
    icon: '/vercel.png',
  },
};

const AdminLayout = async ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const session = await auth();
  return (
    <>
      <h2 className='lg:hidden p-6 text-center'>Не отображается на маленьком экране!</h2>
      <SessionProvider session={session}>
        <Navbar />
      </SessionProvider>
      <Sidebar />
      <main className="hidden lg:flex flex-1 xl:ml-60 ml-none px-4 py-6 overflow-auto flex-col">{children}</main>
      <Toaster />
    </>
  );
};

export default AdminLayout;

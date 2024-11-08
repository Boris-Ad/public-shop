import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Auth',
    description: 'Authentication',
    icons: {
      icon: '/vercel.png',
    },
  };

const AuthLayout = ({children}: Readonly<{children: React.ReactNode}>) => {
    return (
        <main className="p-2 flex-1 flex justify-center items-center ">
            {children}
        </main>
    )
}

export default AuthLayout
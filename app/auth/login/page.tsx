import Link from 'next/link';
import { signIn } from '@/lib/auth';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { LoginForm } from '../_components/login-form';
import { X } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const LoginPage = ({ searchParams: { callbackUrl } }: { searchParams: { callbackUrl: string | undefined } }) => {
  return (
    <Card className="w-full max-w-[400px]">
      <CardHeader>
        <CardTitle className="text-xl text-center relative">
          Авторизация
          <Link href={callbackUrl || '/'} className="absolute end-0 top-1/2 -translate-y-1/2 hover:text-foreground/70">
            <X />
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <LoginForm />
      </CardContent>

      <CardFooter className="flex-col gap-y-6">
        <Separator className='relative'>
          <span className='px-1 absolute text-sm text-foreground/70 start-1/2 -translate-y-1/2 -translate-x-1/2 bg-card'>или</span>
        </Separator>
        <SignInWithGoogle />
      </CardFooter>

      <CardFooter className="justify-center">
        <Link href={'/auth/register'} className="hover:text-muted-foreground hover:underline">
          Нет аккаунта?
        </Link>
      </CardFooter>
    </Card>
  );
};

export default LoginPage;

const SignInWithGoogle = () => {
  return (
    <form
      action={async () => {
        'use server';
        await signIn('google');
      }}
      className="w-full"
    >
      <Button type="submit" size="lg" variant="outline" className="w-full">
        <Image src="/goog.png" alt="google" width={24} height={24} className='w-6 h-auto' />
      </Button>
    </form>
  );
};

import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { RegisterForm } from '../_components/register-form';
import { X } from 'lucide-react';

const RegisterPage = ({ searchParams: { callbackUrl } }: { searchParams: { callbackUrl: string | undefined } }) => {
  return (
    <Card className="w-full max-w-[400px]">
      <CardHeader>
        <CardTitle className='text-lg text-center relative'>
          Регистрация
          <Link href={callbackUrl || '/'} className="absolute end-0 top-1/2 -translate-y-1/2 hover:text-foreground/70">
            <X />
          </Link>
          </CardTitle>
      </CardHeader>
      <CardContent>
        <RegisterForm />
      </CardContent>
      <CardFooter className="justify-center">
        <Link href={'/auth/login'} className='hover:text-muted-foreground hover:underline'>Есть регистрация</Link>
      </CardFooter>
    </Card>
  );
};

export default RegisterPage;


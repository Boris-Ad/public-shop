'use client';

import { signOut, useSession } from 'next-auth/react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export const ExitButton = () => {
  const { data } = useSession();
  if (data == null) notFound();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={data.user?.image || undefined} />
          <AvatarFallback className='bg-pink-600'>{data.user?.name && data.user.name[0].toUpperCase()}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{data?.user?.email}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild >
          <Link href='/catalog'>Магазин</Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => signOut({ redirectTo: '/' })}>Выход</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

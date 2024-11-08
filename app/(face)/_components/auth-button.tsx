'use client';

import React from 'react';
import Image from 'next/image';
import { useSession, signOut, signIn } from 'next-auth/react';
import { LogOut, LogIn, User2Icon, FileSliders } from 'lucide-react';

import { DropMenu } from '@/app/(face)/_components/drop-menu';
import Link from 'next/link';

export const AuthButton = () => {
  const { data: session } = useSession();
  const [isVisible, setIsVisible] = React.useState(false);
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const isAdmin = session?.user?.role === 'ADMIN';

  const onSignOut = () => {
    signOut();
  };

  return (
    <>
      <button ref={buttonRef} onClick={() => setIsVisible(true)} className="size-8 bg-face-primary rounded-full flex justify-center items-center relative">
        {session?.user?.image ? (
          <Image src={session.user.image} alt="userName" fill sizes="32px 32px" className="object-contain rounded-full" />
        ) : session?.user?.name ? (
          session.user.name[0].toUpperCase()
        ) : (
          <User2Icon />
        )}
      </button>
      <DropMenu isVisible={isVisible} setIsVisible={setIsVisible} elementRef={buttonRef}>
        <div className="min-w-44 p-2.5 bg-face-card text-face-foreground rounded-md">
          {session ? (
            <div className="flex flex-col gap-y-1">
              <h3 className="">{session.user?.name}</h3>
              <hr className="h-[1px] my-1 border-none bg-face-popover" />
              {isAdmin && (
                <Link href="/admin" className="p-1 rounded flex gap-x-2 items-center hover:bg-face-popover">
                  <FileSliders size={18} />
                  Админка
                </Link>
              )}

              <button onClick={onSignOut} className="p-1 rounded flex gap-x-2 items-center hover:bg-face-popover">
                <LogOut size={18} />
                Выход
              </button>
            </div>
          ) : (
            <button onClick={() => signIn()} className="w-full p-1 rounded flex gap-x-2 items-center hover:bg-face-popover">
              <LogIn size={18} />
              Войти
            </button>
          )}
        </div>
      </DropMenu>
    </>
  );
};

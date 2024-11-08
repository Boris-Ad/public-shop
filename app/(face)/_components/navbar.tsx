import Image from 'next/image';
import { AuthButton } from './auth-button';
import { NavbarNav } from './navbar-nav';
import { CartLink } from './cart-link';

export const Navbar = () => {
  return (
    <header className="shadow-md h-[60px] fixed w-full bg-face-background text-face-foreground z-40">
      <div className="h-full container flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <Image src="/logo.png" alt="logo" width={32} height={32} />
          <h1 className="font-comfortaa text-lg">Магазин одежды</h1>
        </div>
        <div className="flex items-center space-x-6">
          <CartLink />
          <NavbarNav />
          <AuthButton />
        </div>
      </div>
    </header>
  );
};

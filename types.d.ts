import { JWT } from 'next-auth/jwt';
import { YMap } from '@yandex/ymaps3-types';

declare module 'next-auth' {
  interface User {
    role?: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id?: string;
    role?: string;
  }
}

declare global {
  interface Window {
    map: YMap | null;
  }
}
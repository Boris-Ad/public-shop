import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@auth/prisma-adapter';
import bcrypt from 'bcryptjs';
import prisma from './db';
import { loginSchema } from './zod-schemas';

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt' },
  pages: {
    signIn: '/auth/login',
  },
  providers: [
    Google,
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async credentials => {
        const { email, password } = await loginSchema.parseAsync(credentials);
        const user = await prisma.user.findUnique({ where: { email } });
        if (user == null || !user.password) return null;
        const pwHash = await bcrypt.compare(password, user.password);
        if (pwHash) return user;
        return null;
      },
    }),
  ],
  callbacks: {
    redirect: async ({ url, baseUrl }) => {
      const searchParams = url.split('?').pop();
      const callbackUrl = new URLSearchParams(searchParams).get('callbackUrl');
      if (callbackUrl != null) return callbackUrl;

      if (url.startsWith('/')) return `${baseUrl}${url}`;
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
    jwt: ({ token, user }) => {
      if (user && user.id) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    session: ({ session, token }) => {
      session.user.id = token.id || '';
      session.user.role = token.role;
      return session;
    },
  },
});

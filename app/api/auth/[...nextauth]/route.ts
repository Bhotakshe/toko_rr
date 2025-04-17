import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

// Extend the built-in session types
declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    }
  }
}

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
  ],
  pages: {
    signIn: '/auth/signin',
    error: '/auth/signin',
  },
  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider === "google") {
        // Hanya izinkan email Gmail
        return profile?.email?.endsWith("@gmail.com") || false;
      }
      return true;
    },
    async jwt({ token, account, profile }) {
      if (account) {
        token.accessToken = account.access_token;
        token.id = profile?.sub;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      // Redirect ke halaman profil setelah login
      if (url.startsWith("/")) return `${baseUrl}/account`;
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    }
  },
  session: {
    strategy: "jwt",
  },
});

export { handler as GET, handler as POST }; 
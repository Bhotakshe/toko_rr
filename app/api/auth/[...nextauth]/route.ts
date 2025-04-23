import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';

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

// Simulasi database pengguna (dalam aplikasi nyata, ini akan disimpan di database)
const users = [
  {
    id: '1',
    name: 'Demo User',
    email: 'demo@example.com',
    password: 'password',
  }
];

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
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        name: { label: "Name", type: "text" },
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email dan password diperlukan');
        }

        // Cek apakah user sudah ada
        const existingUser = users.find(user => user.email === credentials.email);
        
        if (existingUser) {
          // Jika user sudah ada, cek password
          if (existingUser.password === credentials.password) {
            return {
              id: existingUser.id,
              name: existingUser.name,
              email: existingUser.email,
            };
          }
          throw new Error('Password salah');
        }

        // Jika user belum ada, buat user baru
        const newUser = {
          id: Date.now().toString(),
          name: credentials.name,
          email: credentials.email,
        };
        
        users.push({
          ...newUser,
          password: credentials.password,
        });

        return newUser;
      }
    })
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
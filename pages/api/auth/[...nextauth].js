import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  secret: process.env.SECRET,
  jwt: {
    encryption: true,
  },
  callbacks: {
    jwt: async ({ token, account, user }) => {
      if (account?.access_token) {
        token.accessToken = account.access_token;
      }
      if (user) {
        token.user = user;
      }
      return token;
    },
    redirect: async (url, _baseUrl) => {
      // if (url === "/profile") {
      //   return Promise.resolve("/");
      // }
      return Promise.resolve("/Questions");
    },
    session: async ({ session, token }) => {
      session.user = token.user || session.user;
      session.accessToken = token.accessToken;
      return session;
    },
    // pages: {
    //   signIn: '/auth',
    //   signOut: '/auth',
    //   error: '/auth', // Error code passed in query string as ?error=
    // },
  },
});

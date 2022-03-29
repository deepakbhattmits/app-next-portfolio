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
  // pages: {
  //   signIn: '/auth',
  //   signOut: '/auth',
  //   error: '/auth', // Error code passed in query string as ?error=
  // },
  callbacks: {
    jwt: async (token, account) => {
      if (account?.accessToken) {
        token.accessToken = account?.accessToken;
      }
      return token;
    },
    // session: async ({ session, token, user }) => {
    //   // Send properties to the client, like an access_token from a provider.
    //   session.accessToken = token.accessToken;
    //   return session;
    // },
    redirect: async (url, _baseUrl) => {
      // if (url === "/profile") {
      //   return Promise.resolve("/");
      // }
      return Promise.resolve("/Questions");
    },
  },
  secret: process.env.SECRET,
  jwt: {
    // secret: process.env.SECRET,
    encryption: true,
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
});

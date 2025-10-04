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
    jwt: async (token, account) => {
      if (account?.accessToken) {
        token.accessToken = account?.accessToken;
      }
      return token;
    },
    redirect: async (url, _baseUrl) => {
      // if (url === "/profile") {
      //   return Promise.resolve("/");
      // }
      return Promise.resolve("/Questions");
    },
    session: async ({ session, token, user }) => {
      // Send properties to the client, like an access_token from a provider.
      session = {
        user: token?.token["user"],
      };
      return session;
    },
    // pages: {
    //   signIn: '/auth',
    //   signOut: '/auth',
    //   error: '/auth', // Error code passed in query string as ?error=
    // },
  },
});

import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/prisma"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        username: {},
        password: {},
      
      },
      authorize: async (credentials):Promise<any | null> => {
        try {
          let user = null
          const { username, password } = credentials;
          console.log("credentials", credentials);
          
   
          // logic to salt and hash password
          if (!username || !password) {
            // No user found, so this is their first attempt to login
            // Optionally, this is also the place you could do a user registration
            // throw new Error("Invalid credentials.")
            return null;
          }
          const checkAdmin = await prisma.user.findFirst({where:{username:username}});
  
          if(!checkAdmin){
            return null;
          }
  
          const compare = await bcrypt.compare(password as string, checkAdmin.password);
          if(!compare){
            return null;
          }
  
          user = {
            id: checkAdmin.id,
            name: checkAdmin.username,
          }
          // return user object with their profile data
          return user 
        } catch (error) {
          if(error instanceof Error){
            console.log(error.message);
          }
          return null;
        }
      }
    
    }),
  ],
  pages: {
    signIn: "/login"
  },
  session: {
    strategy: "jwt",
    maxAge: 3000,
  },
  callbacks: {
    authorized: async ({ auth }) => {
      // Logged in users are authenticated, otherwise redirect to login page
      return !!auth
    },
    async session({ session, token, user }) {
      // Attach the user information to the session
      session.user.id = token.id as string;
   
      console.log("Session Callback:", session);
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
     
      }
      return token;
    },
  },
})
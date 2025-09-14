import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { User } from "@/models/userDashShema";
import { Payment } from "@/models/payment";
import connectDb from "@/db/connectDb";

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account , profile , email  ,credentials}) {
      if (!process.env.GITHUB_ID || !process.env.GITHUB_SECRET) {
        console.error("❌ GitHub OAuth credentials are missing.");
        return false;
      }

      if (account.provider === "github") {
        await connectDb();
        
        let currentUser = await User.findOne({email:user.email})
        if(!currentUser){
          const currentUser = await User.create({
            email : user.email , 
            username : user.email.split("@")[0]
          })
        }

        return true; 
      }

      return false; // Reject sign-in if provider is not GitHub
    },

    async session({ session, token, user }) {
      
      const dbUser = await User.findOne({email:session.user.email})
      if(dbUser){
        session.user.name = dbUser.username
      }

      return session
    }
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

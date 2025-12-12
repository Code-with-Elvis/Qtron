import { connectToDB } from "@/lib/db/mongoose";
import User from "@/lib/modals/userModal";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Please provide email and password");
        }

        try {
          await connectToDB();

          // == Find user with password field (it's excluded by default) ==

          const user = await User.findOne({ email: credentials.email }).select(
            "+password"
          );

          if (!user) {
            throw new Error("Invalid email or password");
          }

          // == Check if user is active ==

          if (!user.active) {
            throw new Error("Your account has been deactivated");
          }

          // == Verify password ==

          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!isPasswordValid) {
            throw new Error("Invalid email or password");
          }

          // === Return user object (password will be excluded) ===
          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
            role: user.role,
            photo: user.photo,
            phone: user.phone,
            isVerified: user.isVerified,
          };
        } catch (error) {
          console.error("Auth error:", error);
          throw error;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.isVerified = user.isVerified;
        token.photo = user.photo;
        token.phone = user.phone;
      }

      // Refetch user data when session is updated
      if (trigger === "update") {
        const updatedUser = await User.findById(token.id).select("-password");
        if (updatedUser) {
          token.name = updatedUser.name;
          token.photo = updatedUser.photo;
          token.phone = updatedUser.phone;
          token.isVerified = updatedUser.isVerified;
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.isVerified = token.isVerified as boolean;
        session.user.photo = token.photo as string;
        session.user.phone = token.phone as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/signin",
    error: "/signin",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

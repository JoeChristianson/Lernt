import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { UserService } from "@lernt/application";
import { db, schema } from "@lernt/db";
import type { UserModel } from "@lernt/domain";
import { env } from "@lernt/env"; // ✅ use shared validated env
import NextAuth, { type AuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";

export const authOptions: AuthOptions = {
	adapter: DrizzleAdapter(db),
	session: { strategy: "jwt" },
	secret: env.NEXTAUTH_SECRET,
	providers: [
		Google({
			clientId: env.GOOGLE_ID,
			clientSecret: env.GOOGLE_SECRET,
		}),
		GitHub({
			clientId: env.GITHUB_ID,
			clientSecret: env.GITHUB_SECRET,
		}),
		Credentials({
			credentials: { email: {}, password: {} },
			async authorize(c) {
				if (!c?.email || !c?.password) return null;
				const result = await db.transaction(async (tx) => {
					const userService = UserService({ _tag: "unsessioned", tx, schema });
					return await userService.login({ email: c.email, password: c.password });
				});
				return result;
			},
		}),
	],
	callbacks: {
		async jwt({ token, user }) {
			if (user) token.id = user.id;
			return token;
		},
		async session({ session, token }) {
			if (token) session.user = token as UserModel.Type;
			return session;
		},
	},
};

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);

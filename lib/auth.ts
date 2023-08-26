import { NextAuthOptions } from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { db } from '@/lib/db';
import { db as prisma } from '@/lib/db';

import bcrypt from 'bcrypt';

import CredentialProvider from 'next-auth/providers/credentials';
import GithubProvider from 'next-auth/providers/github';

export const authOptions: NextAuthOptions = {
	adapter: PrismaAdapter(db as any), //bug in prisma adapter
	providers: [
		GithubProvider({
			clientId: process.env.GITHUB_CLIENTID!,
			clientSecret: process.env.GITHUB_SECRET!,
		}),
		CredentialProvider({
			name: 'credentials',
			credentials: {
				email: { label: 'Email', type: 'text', placeholder: 'jsmith' },
				password: { label: 'Password', type: 'password' },
				username: { label: 'Name', type: 'text', placeholder: 'John Smith' },
			},
			async authorize(credentials, req): Promise<any> {
				console.log('Authorize Method', credentials);

				if (!credentials?.email || !credentials?.password)
					throw new Error('Dados de login necessários');

				const user = await prisma.user.findUnique({
					where: {
						email: credentials.email,
					},
				});

				if (!user || !user.hashedPassword) {
					throw new Error('Usuário não registrado');
				}

				const matchPassword = await bcrypt.compare(
					credentials.password,
					user.hashedPassword
				);

				if (!matchPassword) {
					throw new Error('Email ou senha incorretos');
				}

				return user;
			},
		}),
	],
	session: {
		strategy: 'jwt',
	},
	secret: process.env.SECRET,
	debug: process.env.NODE_ENV === 'development',
	pages: {
		signIn: '/login',
	},
};

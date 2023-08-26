import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import AuthProvider from '@/components/auth-provider';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@/styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Horizon - Authenticate',
	description: 'Your favorite website',
};

export default function AuthLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en'>
			<body className={`${inter.className} min-h-screen}`}>
				<AuthProvider>{children}</AuthProvider>
				<ToastContainer />
			</body>
		</html>
	);
}


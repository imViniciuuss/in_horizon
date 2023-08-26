import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import '@/styles/globals.css';
import AuthProvider from '@/components/auth-provider';
import Header from '@/components/ui/Header';

const inter = Inter({ subsets: ['latin'], preload: true });

export const metadata: Metadata = {
	title: 'In Horizon - Plans Website',
	description: 'Your website favourite',
};

export default function LandingLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en'>
			<body className={`${inter.className} min-h-screen bg-[#25252F]`}>
				<AuthProvider>
					<Header />
					{children}
				</AuthProvider>
				<ToastContainer />
			</body>
		</html>
	);
}


import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';

import ReactQueryProvider from './utils/ReactQueryProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Next Full Stack',
	description: 'Template for generating fullstack NextJS apps'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<ClerkProvider>
			<html lang='en'>
				<body className={inter.className}>
					<ReactQueryProvider>{children}</ReactQueryProvider>
				</body>
			</html>
		</ClerkProvider>
	);
}

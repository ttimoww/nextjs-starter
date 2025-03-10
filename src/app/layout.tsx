import { Toaster } from 'sonner';
import './globals.css';

import { TanstackQueryProvider } from '@/components/providers/tanstack-query';

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en">
			<TanstackQueryProvider>
				<body className="antialiased">
					{children}
					<Toaster />
				</body>
			</TanstackQueryProvider>
		</html>
	);
}

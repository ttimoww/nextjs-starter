import { Toaster } from 'sonner';
import './globals.css';

import { TanstackQueryProvider } from '@/components/tanstack-query-provider';

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

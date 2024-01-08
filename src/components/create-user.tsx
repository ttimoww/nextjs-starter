'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createUser } from '@/server/user/user.actions';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface CreateUserProps extends React.HTMLAttributes<HTMLDivElement> {}
export function CreateUser({ className, ...props }: CreateUserProps) {
	const router = useRouter();

	const [name, setName] = useState('');

	async function handleCreateUser() {
		await createUser({ name });
		router.refresh();
	}

	return (
		<div className={cn('flex gap-2 max-w-md', className)} {...props}>
			<Input value={name} onChange={(e) => setName(e.target.value)} />
			<Button onClick={handleCreateUser}>Create User</Button>
		</div>
	);
}

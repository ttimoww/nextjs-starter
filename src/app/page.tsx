import { AllUsers } from '@/components/all-users';
import { CreateUser } from '@/components/create-user';

export default function Home() {
	return (
		<main className="p-4 text-slate-800 container">
			<h1 className="text-3xl font-bold mb-3">NextJS & Prisma</h1>
			{/* @ts-expect-error Server Component */}
			<AllUsers className="mb-3" />
			<CreateUser />
		</main>
	);
}

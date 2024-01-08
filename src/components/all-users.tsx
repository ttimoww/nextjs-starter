import { UserService } from '@/server/user/user.service';
import { cn } from '@/lib/utils';
import { User } from '@/components/user';

interface AllUsersProps extends React.HTMLAttributes<HTMLDivElement> {}
export async function AllUsers({ className, ...props }: AllUsersProps) {
	const users = await UserService.getUsers();

	return (
		<div className={cn('grid grid-cols-2 lg:grid-cols-3 gap-3', className)} {...props}>
			{users.map((user) => (
				<User key={user.id} user={user} />
			))}
		</div>
	);
}

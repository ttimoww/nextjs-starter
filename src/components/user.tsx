'use client';

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { User } from '@prisma/client';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { deleteUser } from '@/server/user/user.actions';

interface UserProps {
    user: User
};
export function User({ user }: UserProps) {
    const router = useRouter();

    async function handleDelete() {
        await deleteUser({ id: user.id});
        router.refresh();
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>{user.name}</CardTitle>
                <CardDescription>{user.name} has 0 pets</CardDescription>
            </CardHeader>
            <CardContent>
                <p>todo</p>
            </CardContent>
            <CardFooter>
                <Button variant="secondary" onClick={handleDelete}>Delete</Button>
            </CardFooter>
        </Card>
    )
}

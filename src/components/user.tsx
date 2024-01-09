'use client';

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Pet, User } from '@prisma/client';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { deleteUser } from '@/server/user/user.actions';
import { createPet } from "@/server/pet/pet.actions";
import { useState } from "react";
import { Input } from "@/components/ui/input";

interface UserProps {
    user: User & { pets: Pet[]}
};
export function User({ user }: UserProps) {
    const router = useRouter();
    const [pet, setPet] = useState<string>("");

    async function handleDelete() {
        await deleteUser({ id: user.id});
        router.refresh();
    }

    async function handleCreatePet() {
        await createPet({ name: pet, owner: user.id})
        router.refresh();
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>{user.name}</CardTitle>
                <CardDescription>{user.name} has 0 pets</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
                <ul className="p-2 border rounded">
                    {user.pets.map(pet => (
                        <li key={pet.id}>{pet.name}</li>
                    ))}
                </ul>
                <div className="flex gap-2">
                <Input placeholder="Pet name" value={pet} onChange={e => setPet(e.target.value)} /> 
                <Button onClick={handleCreatePet}>Create pet</Button>
                </div>
            </CardContent>
            <CardFooter>
                <Button variant="secondary" onClick={handleDelete}>Delete</Button>
            </CardFooter>
        </Card>
    )
}

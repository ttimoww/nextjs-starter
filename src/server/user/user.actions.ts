'use server';

import { UserService } from '@/server/user/user.service';
import { User } from '@prisma/client';
import { z } from 'zod';
import { withValidation } from '@/lib/utils';

const createUserSchema = z.object({
	name: z.string().min(1, 'Name is required')
});

async function handleCreateUser(data: { name: string }): Promise<User> {
	return await UserService.createUser(data.name);
}

const deleteSchema = z.object({
	id: z.number().positive('ID must be positive')
});
async function handleDeleteUser(data: { id: number }): Promise<void> {
	return await UserService.deleteUser(data.id);
}

export const createUser = withValidation(createUserSchema, handleCreateUser);
export const deleteUser = withValidation(deleteSchema, handleDeleteUser);

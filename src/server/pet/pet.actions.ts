'use server';

import { PetService } from '@/server/pet/pet.service';
import { z } from 'zod';
import { withValidation } from '@/lib/utils';

const createPetSchema = z.object({
	owner: z.number(),
	name: z.string().min(1).max(255)
});

async function handleCreatePet(data: { owner: number; name: string }) {
	return PetService.createPet(data.owner, data.name);
}

export const createPet = withValidation(createPetSchema, handleCreatePet);

import prisma from '@/lib/prisma';

export class PetService {
	static async createPet(owner: number, name: string) {
		return prisma.pet.create({
			data: {
				name,
				userId: owner
			}
		});
	}
}

import prisma from '@/lib/prisma';

export class UserService {
	/**
	 * Gets all users
	 * @returns All users with their pets
	 */
	public static getUsers() {
		return prisma.user.findMany({
			include: {
				pets: true
			}
		});
	}

	/**
	 * Creates a new user
	 * @param name The name of the user to create
	 * @returns The created user
	 */
	public static async createUser(name: string) {
		const user = await prisma.user.create({
			data: {
				name
			}
		});

		return user;
	}

	/**
	 * Deletes a user
	 * @param id The ID of the user to delete
	 */
	public static async deleteUser(id: number): Promise<void> {
		await prisma.user.delete({
			where: {
				id
			}
		});
	}
}

import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { ZodSchema } from 'zod';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

/**
 * Validates a server action against a Zod schema
 * @param schema The Zod schema to validate against
 * @param func The function to wrap with validation
 * @returns The wrapped function
 */
export function withValidation<T, F extends (data: T) => any>(schema: ZodSchema<T>, func: F): F {
	return (async (data: any) => {
		const result = schema.safeParse(data);

		if (!result.success) {
			throw new Error('Validation failed');
		}

		return func(result.data);
	}) as F;
}

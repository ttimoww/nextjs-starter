import { ZodSchema } from 'zod';

import { BaseError } from '@/lib/exceptions';
import { ErrorLevel } from '@/lib/global.types';

interface ActionParams<TInput> {
	parsedInput: TInput;
}

type ActionFunction<TInput, TReturn> = (params: ActionParams<TInput>) => Promise<TReturn>;

type ActionResult<TReturn> = { success: true; data: TReturn } | { success: false; error: ActionError };

export type ActionError = { customerMessage: string; staffMessage?: string; level: ErrorLevel };

type Middleware = (ctx: { next: () => Promise<any> }) => Promise<any>;

type ActionBuilder<TInput = unknown> = {
	schema: <TNewInput>(schema: ZodSchema<TNewInput>) => ActionBuilder<TNewInput>;
	action: <TReturn>(fn: ActionFunction<TInput, TReturn>) => (input?: TInput) => Promise<ActionResult<TReturn>>;
	use: (middleware: Middleware) => ActionBuilder<TInput>;
};

const createActionClient = <TInput = unknown>(
	schema?: ZodSchema<TInput>,
	middleware?: Middleware
): ActionBuilder<TInput> => {
	return {
		schema<TNewInput>(newSchema: ZodSchema<TNewInput>) {
			return createActionClient(newSchema, middleware);
		},

		action<TReturn>(fn: ActionFunction<TInput, TReturn>): (input?: TInput) => Promise<ActionResult<TReturn>> {
			return async (input?: TInput) => {
				const parsedInput = schema ? schema.parse(input) : input;

				const execute = async () => fn({ parsedInput } as ActionParams<TInput>);

				try {
					const result = await (middleware ? middleware({ next: execute }) : execute());

					return { success: true, data: result };
				} catch (error) {
					return exceptionHandler(error, { parsedInput });
				}
			};
		},

		use(newMiddleware: Middleware) {
			return createActionClient(schema, newMiddleware);
		}
	};
};

// Default action client
export const actionClient = createActionClient();

// Exception handler
async function exceptionHandler(error: unknown, utils: any): Promise<ActionResult<{ success: false; error: string }>> {
	if (error instanceof BaseError) {
		console.error(error.message, error.toLogObject());

		return {
			success: false,
			error: {
				customerMessage: error.customerMessage,
				level: error.level
			}
		};
	}

	if (process.env.NODE_ENV === 'development') console.error(error);
	console.error('Unexpected Error', { error: (error as Error).message, action: utils });

	return { success: false, error: { customerMessage: 'Something went wrong', level: 'error' } };
}

import { ErrorLevel } from '@/lib/global.types';

export class BaseError extends Error {
	public name: string;
	public customerMessage = 'Something went wrong!';
	public level: ErrorLevel = 'error';

	constructor({
		name,
		message,
		customerMessage,
		level
	}: {
		name: string;
		message: string;
		customerMessage?: string;
		level?: ErrorLevel;
	}) {
		super(message);
		this.name = name;
		if (customerMessage) this.customerMessage = customerMessage;
		if (level) this.level = level;
	}

	toLogObject(): Record<string, unknown> {
		return {
			name: this.name,
			message: this.message,
			level: this.level,
			customerMessage: this.customerMessage
		};
	}
}

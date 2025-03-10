import { ActionError } from '@/actions/safe-action';
import { clsx, type ClassValue } from 'clsx';
import { toast } from 'sonner';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

/**
 * Toasts an error message based on the level of the error
 * @param error The error returned by a server action
 */
export function actionErrorToast(error: ActionError) {
	const toasts = {
		error: toast.error,
		warning: toast.warning,
		info: toast.info
	};

	toasts[error.level](error.customerMessage, { description: error.staffMessage });
}
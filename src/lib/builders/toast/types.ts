import type { BuilderReturn } from '$lib/internal/types.js';
import type { createToaster } from './create.js';
export type { ToastComponentEvents } from './events.js';
export type EmptyType = Record<never, never>;

export type CreateToasterProps = {
	closeDelay?: number;
	type?: 'foreground' | 'background';
};

export type AddToastProps<T = object> = CreateToasterProps & {
	data: T;
};

export type Toast<T = object> = {
	id: string;
	ids: {
		content: string;
		title: string;
		description: string;
	};
	closeDelay: number;
	type: 'foreground' | 'background';
	data: T;
	timeout: number;
	createdAt: number;
	pausedAt?: number;
	pauseDuration: number;
	getPercentage: () => number;
};

export type Toasts = BuilderReturn<typeof createToaster>;
export type ToastsElements = Toasts['elements'];
export type ToastsOptions = Toasts['options'];
export type ToastsStates = Toasts['states'];
export type ToastsHelpers = Toasts['helpers'];

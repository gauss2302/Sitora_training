// src/lib/logger.ts
type LogLevel = 'info' | 'warn' | 'error' | 'debug';

type LogData = {
	message: string;
	metadata?: Record<string, unknown>;
	timestamp?: string;
	level?: LogLevel;
};

export function logInfo(message: string, metadata?: Record<string, unknown>): void {
	log({ message, metadata, level: 'info' });
}

export function logError(message: string, metadata?: Record<string, unknown>): void {
	log({ message, metadata, level: 'error' });
}

function log({ message, metadata, level = 'info', timestamp = new Date().toISOString() }: LogData): void {
	// In production, this would send to a logging service like DataDog, New Relic, etc.
	if (process.env.NODE_ENV === 'production') {
		// Example: send to logging service
		console[level]({
			message,
			metadata,
			timestamp,
			level,
		});
	} else {
		// Local development logging
		console[level](`[${timestamp}] [${level.toUpperCase()}]: ${message}`, metadata || '');
	}
}

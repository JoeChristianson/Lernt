export type ErrorSeverity = "info" | "warn" | "error" | "critical";

export const HandlingStrategies = ["log-warning", "log-error", "500-response"] as const;
export type HandlingStrategy = (typeof HandlingStrategies)[number];

export type BaseAppError = {
	id?: string;
	tenantId?: string;
	service: string;
	message: string;
	details?: unknown;
	severity: ErrorSeverity;
	timestamp: Date;
	context?: Record<string, unknown>;
	stack?: string | undefined;
};

type LogWarningError = BaseAppError & {
	_strategy: "log-warning";
};

type LogErrorError = BaseAppError & {
	_strategy: "log-error";
};

type Response500Error = BaseAppError & {
	_strategy: "500-response";
	clientMessage: string;
	httpStatusCode: 500;
};

export type AppError = LogWarningError | LogErrorError | Response500Error;

export type APIError = Pick<
	Response500Error,
	"clientMessage" | "httpStatusCode" | "service" | "severity"
>;

import { match } from "ts-pattern";
import type { APIError, AppError } from "./error.types";

export interface ErrorService {
  log(error: AppError): Promise<void>;
  capture(exception: unknown, context?: Partial<AppError>): Promise<void>;
  getAPIError(error: AppError): APIError;
  mapErrorToHTTPStatus: (error: AppError) => number;
}

export const errorService: ErrorService = {
  async log(error) {
    // for now, just console + optional db write
    console.error(`[${error.service}] ${error.message}`, {
      severity: error.severity,
      details: error.details,
      context: error.context,
      stack: error.stack,
    });
  },

  async capture(exception, context = {}) {
    const message = exception instanceof Error ? exception.message : String(exception);

    const isLogWarningError = true;
    if (isLogWarningError) {
      this.log({
        _strategy: "log-warning",
        service: context.service ?? "unknown",
        message,
        details:
          exception instanceof Error ? { name: exception.name, cause: exception.cause } : exception,
        severity: context.severity ?? "error",
        timestamp: new Date(),
        context,
        stack: exception instanceof Error ? exception.stack : undefined,
      });
    }
    const isLogErrorError = true;
    if (isLogErrorError) {
      this.log({
        _strategy: "log-error",
        service: context.service ?? "unknown",
        message,
        details:
          exception instanceof Error ? { name: exception.name, cause: exception.cause } : exception,
        severity: context.severity ?? "error",
        timestamp: new Date(),
        context,
        stack: exception instanceof Error ? exception.stack : undefined,
      });
    }
    const isResponse500Error = true;
    if (isResponse500Error) {
      const clientMessage = "An internal server error occurred.";
      this.log({
        _strategy: "500-response",
        service: context.service ?? "unknown",
        message,
        details:
          exception instanceof Error ? { name: exception.name, cause: exception.cause } : exception,
        severity: context.severity ?? "error",
        timestamp: new Date(),
        context,
        stack: exception instanceof Error ? exception.stack : undefined,
        clientMessage,
        httpStatusCode: 500,
      });
    }
  },
  mapErrorToHTTPStatus(error: AppError): number {
    switch (error.severity) {
      case "info":
        return 200;
      case "warn":
        return 400;
      case "error":
        return 500;
      case "critical":
        return 503;
      default:
        return 500;
    }
  },
  getAPIError(error: AppError): APIError {
    const clientMessage = match(error._strategy)
      .with("log-warning", () => "A warning occurred.")
      .with("log-error", () => "An error occurred.")
      .with("500-response", () => 'clientMessage' in error ? error.clientMessage : "An error occurred.")
      .exhaustive();
    return {
      service: error.service,
      clientMessage,
      severity: error.severity,
      httpStatusCode: 500,
    };
  },
};

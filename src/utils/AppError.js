export class AppError extends Error {
    statusCode;
    isOperational;
    details;
    constructor(statusCode, message, details, isOperational = true) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = this.constructor.name;
        this.statusCode = statusCode;
        this.details = details;
        this.isOperational = isOperational;
        Error.captureStackTrace(this);
    }
}
export class BadRequestError extends AppError {
    constructor(message = "Bad Request", details) {
        super(400, message, details);
    }
}
export class UnauthorizedError extends AppError {
    constructor(message = "Unauthorized") {
        super(401, message);
    }
}
export class ForbiddenError extends AppError {
    constructor(message = "Forbidden") {
        super(403, message);
    }
}
export class NotFoundError extends AppError {
    constructor(message = "Resource not found") {
        super(404, message);
    }
}
export class ConflictError extends AppError {
    constructor(message = "Conflict") {
        super(409, message);
    }
}
export class ValidationError extends AppError {
    constructor(message = "Validation failed", details) {
        super(422, message, details);
    }
}
export class DatabaseError extends AppError {
    constructor(message = "Database operation failed", details) {
        super(500, message, details);
    }
}
export class InternalServerError extends AppError {
    constructor(message = "Internal Server Error") {
        super(500, message);
    }
}

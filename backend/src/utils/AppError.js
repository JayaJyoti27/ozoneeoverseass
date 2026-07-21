"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalServerError = exports.DatabaseError = exports.ValidationError = exports.ConflictError = exports.NotFoundError = exports.ForbiddenError = exports.UnauthorizedError = exports.BadRequestError = exports.AppError = void 0;
class AppError extends Error {
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
exports.AppError = AppError;
class BadRequestError extends AppError {
    constructor(message = "Bad Request", details) {
        super(400, message, details);
    }
}
exports.BadRequestError = BadRequestError;
class UnauthorizedError extends AppError {
    constructor(message = "Unauthorized") {
        super(401, message);
    }
}
exports.UnauthorizedError = UnauthorizedError;
class ForbiddenError extends AppError {
    constructor(message = "Forbidden") {
        super(403, message);
    }
}
exports.ForbiddenError = ForbiddenError;
class NotFoundError extends AppError {
    constructor(message = "Resource not found") {
        super(404, message);
    }
}
exports.NotFoundError = NotFoundError;
class ConflictError extends AppError {
    constructor(message = "Conflict") {
        super(409, message);
    }
}
exports.ConflictError = ConflictError;
class ValidationError extends AppError {
    constructor(message = "Validation failed", details) {
        super(422, message, details);
    }
}
exports.ValidationError = ValidationError;
class DatabaseError extends AppError {
    constructor(message = "Database operation failed", details) {
        super(500, message, details);
    }
}
exports.DatabaseError = DatabaseError;
class InternalServerError extends AppError {
    constructor(message = "Internal Server Error") {
        super(500, message);
    }
}
exports.InternalServerError = InternalServerError;

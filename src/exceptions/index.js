export class RequestError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.name = 'RequestError';
        this.statusCode = statusCode;
    }
}

export class APIError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.name = 'APIError';
        this.statusCode = statusCode;
    }
} 
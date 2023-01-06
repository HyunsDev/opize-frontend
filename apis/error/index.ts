export class HTTPError extends Error {
    name: string
    statusCode?: number

    constructor(statusCode?: number, message?: string) {
        super(message);
        this.name = 'HTTPError';
        this.statusCode = statusCode;
    }
}

export class OpizeHTTPError <T extends string> extends HTTPError {
    code?: T;
    name: string

    constructor(statusCode?: number, code?: T, message?: string) {
        super(statusCode, message);
        this.name = 'OpizeHTTPError'
        this.code = code
    }
}
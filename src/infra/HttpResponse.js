class HttpResponse {
    // eslint-disable-next-line no-restricted-syntax
    constructor(success, message, status = 200, headers = {}) {
        this.success = success;
        this.message = message;
        this.status = status;
        this.headers = headers;
    }

    toJSON = () => {
        return JSON.stringify({
            success: this.success,
            message: this.message,
        });
    };

    toResponse = () => {
        const body = this.toJSON();
        return new Response(body, {
            status: this.status,
            headers: {
                "Content-Type": "application/json",
                ...this.headers,
            },
        });
    };
}

module.exports = HttpResponse;

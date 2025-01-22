export class Endpoint {
    constructor(client) {
        this._client = client;
        this._endpointURL = '';
    }

    async getAll(params = null) {
        return this._client.GET(`/${this._endpointURL}`, params);
    }

    async getById(id) {
        return this._client.GET(`/${this._endpointURL}/${id}`);
    }
} 
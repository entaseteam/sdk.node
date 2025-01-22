import { Endpoint } from '../Endpoint.js';

export class Productions extends Endpoint {
    constructor(client) {
        super(client);
        this._endpointURL = 'productions';
    }

    async list(params = {}) {
        return this._client.GET('/productions', params);
    }

    async get(id) {
        return this._client.GET(`/productions/${id}`);
    }
} 
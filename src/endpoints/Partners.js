import { Endpoint } from '../Endpoint.js';
import { RequestError } from '../exceptions/index.js';

export class Partners extends Endpoint {
    constructor(client) {
        super(client);
        this._endpointURL = 'partners';
    }

    async getAll() {
        throw new RequestError('GetAll method not supported for Partners endpoint.');
    }

    async me() {
        return this._client.GET(`/${this._endpointURL}/me`);
    }
} 
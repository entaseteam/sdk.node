import { Endpoint } from '../Endpoint.js';

export class Events extends Endpoint {
    constructor(client) {
        super(client);
        this._endpointURL = 'events';
    }
} 
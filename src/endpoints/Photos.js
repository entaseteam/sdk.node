import { Endpoint } from '../Endpoint.js';

export class Photos extends Endpoint {
    constructor(client) {
        super(client);
        this._endpointURL = 'photos';
    }

    // Override parent methods since they're not supported
    async getAll() {
        throw new Error('GetAll method not supported for Photos endpoint. Use getByObject instead.');
    }

    async getById() {
        throw new Error('GetById method not supported for Photos endpoint. Use getByObject instead.');
    }

    /**
     * Get photos for a specific object
     * @param {string} objref - Object reference (e.g., 'Production:123456')
     * @param {object} options - Options object
     * @param {string[]} options.serve - Array of size strings (e.g., ['300x300'])
     */
    async getByObject(objref, options = null) {
        return this._client.GET(`/${this._endpointURL}/object/${objref}`, options);
    }
} 
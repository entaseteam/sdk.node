import fetch from 'node-fetch';
import { Env } from './Env.js';
import { APIError, RequestError } from './exceptions/index.js';
import { ObjectCollection } from './ObjectCollection.js';

// Endpoints
import { Productions } from './endpoints/Productions.js';
import { Events } from './endpoints/Events.js';
import { Photos } from './endpoints/Photos.js';
import { Partners } from './endpoints/Partners.js';
import { BookingOrders } from './endpoints/BookingOrders.js';

export class Client {
    constructor(secretKey) {
        this._secretKey = secretKey;
        
        // Initialize endpoints
        this.productions = new Productions(this);
        this.events = new Events(this);
        this.photos = new Photos(this);
        this.partners = new Partners(this);
        this.bookingOrders = new BookingOrders(this);
    }

    async GET(endpoint, data = null) {
        return this._query(endpoint, data, 'GET');
    }

    async POST(endpoint, data = null) {
        return this._query(endpoint, data, 'POST');
    }

    async _query(endpoint, data, method) {
        const url = endpoint.startsWith('https://') ? endpoint : `${Env.APIURL.replace(/\/$/, '')}/${endpoint.replace(/^\//, '')}`;
        const headers = {
            'Authorization': `Bearer ${this._secretKey}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        };

        let finalUrl = url;
        const options = {
            method,
            headers,
        };

        if (method === 'GET' && data) {
            const queryString = this._objectToQueryString(data);
            finalUrl += (url.includes('?') ? '&' : '?') + queryString;
        } else if (method === 'POST' && data) {
            options.body = this._objectToQueryString(data);
        }

        if (Env.DebugMode) {
            console.log('Request URL:', finalUrl);
            if (data) console.log('Request Data:', data);
        }

        try {
            const response = await fetch(finalUrl, options);
            const result = await response.json();

            if (!response.ok) {
                const msg = result.msg || 'General request error.';
                const errCode = result.code ? ` Code: ${result.code}` : '';
                throw new RequestError(`${msg}${errCode}`, response.status);
            }

            if ((result.status || '') !== 'ok') {
                const msg = result.msg || 'General API error.';
                const errCode = result.code ? ` Code: ${result.code}` : '';
                throw new APIError(`${msg}${errCode}`, response.status);
            }

            const resource = result.resource || null;
            if (resource && resource['::'] === 'ObjectCollection') {
                const collection = new ObjectCollection({
                    items: resource.data || [],
                    total: (resource.data || []).length,
                    cursor: resource.cursor || null
                });
                collection.setClient(this);
                return collection;
            }

            return resource;
        } catch (error) {
            if (error instanceof RequestError || error instanceof APIError) {
                throw error;
            }
            throw new Error(`Network error: ${error.message}`);
        }
    }

    _objectToQueryString(obj, prefix = '') {
        const parts = [];
        
        for (const [key, value] of Object.entries(obj)) {
            const newPrefix = prefix ? `${prefix}[${key}]` : key;
            
            if (value !== null && typeof value === 'object') {
                parts.push(this._objectToQueryString(value, newPrefix));
            } else {
                parts.push(`${encodeURIComponent(newPrefix)}=${encodeURIComponent(value)}`);
            }
        }
        
        return parts.join('&');
    }
} 
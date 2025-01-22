import { ObjectBase } from './ObjectBase.js';
import { ObjectCursor } from './ObjectCursor.js';

export class ObjectCollection extends ObjectBase {
    constructor(data = {}) {
        super(data);
        this.items = data.items || [];
        this.total = data.total || 0;
        
        if (data.cursor) {
            this._cursor = new ObjectCursor(data.cursor);
        }
    }

    async next() {
        if (!this._cursor || !this._cursor.hasMore || !this._client) return null;
        return this._client.GET(this._cursor.nextURL);
    }

    async previous() {
        if (!this._cursor || !this._cursor.previousURL || !this._client) return null;
        return this._client.GET(this._cursor.previousURL);
    }

    map(callback) {
        return this.items.map(callback);
    }

    forEach(callback) {
        return this.items.forEach(callback);
    }

    [Symbol.iterator]() {
        return this.items[Symbol.iterator]();
    }
} 
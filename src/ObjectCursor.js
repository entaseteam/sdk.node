import { ObjectBase } from './ObjectBase.js';

export class ObjectCursor extends ObjectBase {
    constructor(data = {}) {
        super(data);
        this.nextURL = data.nextURL || null;
        this.previousURL = data.previousURL || null;
        this.hasMore = data.hasMore || false;
    }
} 
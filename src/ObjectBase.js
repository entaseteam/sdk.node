export class ObjectBase {
    constructor(data = {}) {
        Object.assign(this, data);
    }

    static cast(data) {
        if (!data) return null;
        return new this(data);
    }

    setClient(client) {
        this._client = client;
        return this;
    }
} 
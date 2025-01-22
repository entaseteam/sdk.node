import { Endpoint } from '../Endpoint.js';

export class BookingOrders extends Endpoint {
    constructor(client) {
        super(client);
        this._endpointURL = 'bookingorders';
    }

    async getByCode(orderCode) {
        return this.getById(orderCode);
    }

    async getAllTicketsByOrder(orderIdOrCode) {
        return this._client.GET(`/${this._endpointURL}/${orderIdOrCode}/tickets`);
    }

    async getTicketByOrder(orderIdOrCode, ticketIdOrCode) {
        return this._client.GET(`/${this._endpointURL}/${orderIdOrCode}/tickets/${ticketIdOrCode}`);
    }
} 
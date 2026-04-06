import HttpClient from "./utils/HttpClient";

class ContactsService {
    constructor() {
        this.httpCliente = new HttpClient("http://localhost:3001");
    }

    async listContacts(orderBy = "asc") {
        return this.httpCliente.get(`/contacts?orderBy=${orderBy}`);
    }

    async createContact(contact) {
        return this.httpCliente.post(`/contacts`, {
            body: contact,
        });
    }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new ContactsService();

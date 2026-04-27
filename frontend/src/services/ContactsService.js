import HttpClient from "./utils/HttpClient";

class ContactsService {
    constructor() {
        this.httpCliente = new HttpClient("http://localhost:3001");
    }

    listContacts(orderBy = "asc") {
        return this.httpCliente.get(`/contacts?orderBy=${orderBy}`);
    }

    getContactById(id) {
        return this.httpCliente.get(`/contacts/${id}`);
    }

    createContact(contact) {
        return this.httpCliente.post(`/contacts`, {
            body: contact,
        });
    }

    updateContact(id, contact) {
        return this.httpCliente.put(`/contacts/${id}`, {
            body: contact,
        });
    }

    deleteContact(id){
        return this.httpCliente.delete(`/contacts/${id}`);
    }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new ContactsService();

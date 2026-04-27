import HttpClient from "./utils/HttpClient";

class CategoriesService {
    constructor() {
        this.httpCliente = new HttpClient("http://localhost:3001");
    }

    listCategories() {
        return this.httpCliente.get("/categories");
    }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new CategoriesService();

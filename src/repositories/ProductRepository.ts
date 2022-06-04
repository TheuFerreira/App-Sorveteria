import ProductResponse from "../models/responses/ProductResponse";
import { urlAPI } from "./ConfigRepository";

export default class ProductRepository {
    async getByCategory(idCategory: number, search: string) : Promise<Array<ProductResponse>> {
        const data = {
            id_category: idCategory,
            search: search
        }

        const res = await fetch(`${urlAPI}/API-Sorveteria/routes/product/get_by_category.php`, {
            method: 'POST',
            body: JSON.stringify(data)
        }).then(async (response) => {
            const jsons = await response.json();

            const products = Array<ProductResponse>();
            for (let i = 0; i < jsons.length; i++) {
                const json = jsons[i];

                const productResponse = new ProductResponse();
                productResponse.idProduct = json.idProduct;
                productResponse.title = json.title;
                productResponse.price = json.price;
                productResponse.img = json.img;

                products.push(productResponse);
            }

            return products;
        }).catch(() => {
            const products = Array<ProductResponse>();
            return products;
        });

        return res;
    }
}
import ProductInfoResponse from "../models/responses/ProductInfoResponse";
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

    async getAll(search: string) : Promise<Array<ProductResponse>> {
        const data = {
            search: search
        }

        const res = await fetch(`${urlAPI}/API-Sorveteria/routes/product/get_all.php`, {
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

    async getById(idProduct: number) : Promise<ProductInfoResponse> {
        const data = {
            id_product: idProduct
        }

        const res = await fetch(`${urlAPI}/API-Sorveteria/routes/product/get_by_id.php`, {
            method: 'POST',
            body: JSON.stringify(data)
        }).then(async (response) => {
            const json = await response.json();

            const productResponse = new ProductInfoResponse();
            productResponse.idProduct = json.idProduct;
            productResponse.title = json.title;
            productResponse.price = json.price;
            productResponse.img = json.img;
            productResponse.description = json.description;

            return productResponse;
        }).catch(() => {
            const products = new ProductInfoResponse();
            return products;
        });

        return res;
    }

    async getMostSelled(limit: number) : Promise<Array<ProductResponse>> {
        const data = {
            limit: limit,
        }

        const res = await fetch(`${urlAPI}/API-Sorveteria/routes/product/get_most_selled.php`, {
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
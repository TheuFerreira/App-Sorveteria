import SaleProductRequests from "../models/requests/SaleProductRequests";
import { urlAPI } from "./ConfigRepository";

export default class SaleRepository {
    async finish(idUser: number, products: Array<SaleProductRequests>) : Promise<boolean> {
        const data = {
            id_user: idUser,
            products: products
        };

        const response = await fetch(`${urlAPI}/API-Sorveteria/routes/sale/finish.php`, {
            method: 'POST',
            body: JSON.stringify(data)
        }).then(async (res) => {
            const json = await res.json();
            return json;
        }).catch(() => {
            return false
        });

        return response;
    }
}
import CategoryResponse from "../models/responses/CategoryResponse";
import urlAPI from "./ConfigRepository";

export default class CategoryRepository {
    async getAll() : Promise<Array<CategoryResponse>> {

        const res = await fetch(`${await urlAPI()}/API-Sorveteria/routes/category/get_all_categories.php`).then(async (response) => {
            const json = await response.json();

            const categories = Array<CategoryResponse>();
            for (let i = 0; i < json.length; i++) {
                const row = json[i];

                const category = new CategoryResponse();
                category.idCategory = row.id_category;
                category.description = row.description;
                category.img = row.img;

                categories.push(category);
            }

            return categories;
        }).catch(() => {
            const categories = Array<CategoryResponse>();
            return categories;
        });

        return res;
    }
}
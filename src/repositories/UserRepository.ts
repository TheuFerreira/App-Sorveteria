import { urlAPI } from "./ConfigRepositoru";

export default class UserRepository {
    async getUser(userName: string, password: string) : Promise<boolean> {

        const body = {
            userName: userName,
            password: password
        };

        const response = await fetch(`${urlAPI}/API-Sorveteria/routes/user/get_user.php`, {
            method: 'POST',
            body: JSON.stringify(body)
        }).then(async (response) => {
            const json = await response.json();
            console.log(json);
            return json > 0;
        }).catch(() => {
            return false;
        });

        return response;
    }
}
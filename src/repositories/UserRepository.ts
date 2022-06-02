import RegisterResponse from "../models/responses/RegisterResponse";
import { urlAPI } from "./ConfigRepositoru";

export default class UserRepository {

    async registerUser(name: string, userName: string, address: string, cellphone: string, password: string) : Promise<RegisterResponse> {
        
        const body = {
            name,
            user_name: userName,
            address: address,
            cellphone: cellphone,
            password: password,
        };

        const res = await fetch(`${urlAPI}/API-Sorveteria/routes/user/register_user.php`, {
            method: 'POST',
            body: JSON.stringify(body),
        }).then(async (response) => {
            const json = await response.json();
            const register = new RegisterResponse();
            register.success = json.success;
            register.message = json.message;
            return register;
        }).catch((error) => {
            const register = new RegisterResponse();
            register.success = false;
            register.message = error;
            return register;
        });
        
        return res;
    }

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
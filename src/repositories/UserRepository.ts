import LoginResponse from "../models/responses/LoginResponse";
import RegisterResponse from "../models/responses/RegisterResponse";
import { urlAPI } from "./ConfigRepository";

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
        }).catch(() => {
            const register = new RegisterResponse();
            register.success = false;
            register.message = 'Erro ao comunicar com o servidor';
            return register;
        });
        
        return res;
    }

    async login(userName: string, password: string) : Promise<LoginResponse> {

        const body = {
            user_name: userName,
            password: password
        };

        const response = await fetch(`${urlAPI}/API-Sorveteria/routes/user/login.php`, {
            method: 'POST',
            body: JSON.stringify(body)
        }).then(async (response) => {
            const json = await response.json();

            const loginResponse = new LoginResponse();
            loginResponse.idUser = json.idUser;
            loginResponse.name = json.name;
            loginResponse.address = json.address;
            loginResponse.message = json.message;
            return loginResponse;
        }).catch(() => {
            const loginResponse = new LoginResponse();
            loginResponse.idUser = -1;
            loginResponse.name = '';
            loginResponse.address = '';
            loginResponse.message = 'Erro ao comunicar com o servidor';
            return loginResponse;
        });

        return response;
    }
}
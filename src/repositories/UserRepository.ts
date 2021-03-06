import LoginResponse from "../models/responses/LoginResponse";
import RegisterResponse from "../models/responses/RegisterResponse";
import urlAPI from "./ConfigRepository";

export default class UserRepository {

    async registerUser(name: string, userName: string, address: string, cellphone: string, password: string) : Promise<RegisterResponse> {
        
        const body = {
            name,
            user_name: userName,
            address: address,
            cellphone: cellphone,
            password: password,
        };

        const res = await fetch(`${await urlAPI()}/routes/user/register_user.php`, {
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

        const response = await fetch(`${await urlAPI()}/routes/user/login.php`, {
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

    async updateName(idUser: number, name: string): Promise<boolean> {
        
        const data = {
            id_user: idUser,
            name: name
        };

        const response = await fetch(`${await urlAPI()}/routes/user/update_name.php`, {
            method: 'POST',
            body: JSON.stringify(data)
        }).then(async (response) => {
            const json = await response.json();
            return json;
        }).catch(() => {
            return false;
        });

        return response;
    } 

    async updateUsername(idUser: number, username: string): Promise<boolean> {
        
        const data = {
            id_user: idUser,
            user_name: username
        };

        const response = await fetch(`${await urlAPI()}/routes/user/update_username.php`, {
            method: 'POST',
            body: JSON.stringify(data)
        }).then(async (response) => {
            const json = await response.json();
            return json;
        }).catch(() => {
            return false;
        });

        return response;
    } 

    async updateAddress(idUser: number, address: string): Promise<boolean> {
        
        const data = {
            id_user: idUser,
            address: address
        };

        const response = await fetch(`${await urlAPI()}/routes/user/update_address.php`, {
            method: 'POST',
            body: JSON.stringify(data)
        }).then(async (response) => {
            const json = await response.json();
            return json;
        }).catch(() => {
            return false;
        });

        return response;
    } 

    async updateCellphone(idUser: number, cellphone: string): Promise<boolean> {
        
        const data = {
            id_user: idUser,
            cellphone: cellphone
        };

        const response = await fetch(`${await urlAPI()}/routes/user/update_cellphone.php`, {
            method: 'POST',
            body: JSON.stringify(data)
        }).then(async (response) => {
            const json = await response.json();
            return json;
        }).catch(() => {
            return false;
        });

        return response;
    } 

    async updatePassword(idUser: number, password: string): Promise<boolean> {
        
        const data = {
            id_user: idUser,
            password: password
        };

        const response = await fetch(`${await urlAPI()}/routes/user/update_password.php`, {
            method: 'POST',
            body: JSON.stringify(data)
        }).then(async (response) => {
            const json = await response.json();
            return json;
        }).catch(() => {
            return false;
        });

        return response;
    } 
}
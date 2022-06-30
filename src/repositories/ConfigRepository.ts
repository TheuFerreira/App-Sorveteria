import AsyncStorage from "@react-native-async-storage/async-storage";

const urlAPI = async () => {
    return 'https://apisorveteria.000webhostapp.com';
    return 'http://localhost/API-Sorveteria';
    const result = await AsyncStorage.getItem('ip');
    return result == null ? '' : result;
}

export default urlAPI;
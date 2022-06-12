import AsyncStorage from "@react-native-async-storage/async-storage";

const urlAPI = async () => {
    const result = await AsyncStorage.getItem('ip');
    return result == null ? '' : result;
}

export default urlAPI;
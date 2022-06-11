import AsyncStorage from "@react-native-async-storage/async-storage";

export async function saveJson(object: any) {
    const json = JSON.stringify(object);
    await AsyncStorage.setItem('product', json);
}

export async function getJson() : Promise<any | null> {
    const jsonValue = await AsyncStorage.getItem('product');
    return jsonValue != null ? JSON.parse(jsonValue) : null;
}
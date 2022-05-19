import { loadAsync } from "expo-font";
import { useEffect, useState } from "react";
import { ScrollView, Text, TouchableNativeFeedback, TouchableWithoutFeedback, View } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ImageAccountComponent from "./components/image_account_component";

let _products = [
    { id: '1', name: 'Açaí 500ML', price: 21.50, quantity: 2 },
    { id: '2', name: 'Açaí 200ML', price: 13, quantity: 26 },
    { id: '3', name: 'Açaí 700ML', price: 17, quantity: 3 },
    { id: '4', name: 'Açaí 200ML', price: 13, quantity: 5 },
    { id: '5', name: 'Açaí 700ML', price: 17, quantity: 1 },
    { id: '6', name: 'Milk Shake 700ML', price: 17, quantity: 8 },
];

export default function AccountPage() {

    const [loaded, setLoaded] = useState(false);
    const [totalValue, setTotalValue] = useState(0);
    const [products, setProducts] = useState(_products);
    let tempArr = [...products];

    useEffect(() => {
        loadFonts();
    }, []);

    useEffect(() => {
        let total = 0;
        for (let i = 0; i < products.length; i++) {
            const value =  products[i].price * products[i].quantity;
            total += value;
        }
        setTotalValue(total);

        return () => {
            products
        };
    }, [products]);

    const loadFonts = async () => {
        await loadAsync({
            Pulang: require('../../../assets/fonts/Pulang.ttf'),
            FuturaHandwritten: require('../../../assets/fonts/FuturaHandwritten.ttf'),
        });

        setLoaded(true);
    }

    if (!loaded) {
        return (
            <ScrollView>
                <Text>Carregando</Text>
            </ScrollView>
        );
    }

    const minusClick = (id: String) => {
        for (let i = 0; i < tempArr.length; i++) {
            const product = tempArr[i];
            if (product.id !== id) {
                continue;
            } 

            product.quantity -= 1;
            if (product.quantity <= 0) {
                tempArr.splice(i, 1);
            } else {
                tempArr[i] = product;
            }

            setProducts(tempArr);
            break;
        }
    }

    const plusClick = (id: String) => {
        for (let i = 0; i < tempArr.length; i++) {
            const product = tempArr[i];
            if (product.id !== id) {
                continue;
            } 

            product.quantity += 1;
            tempArr[i] = product;
            setProducts(tempArr);
            break;
        }
    }

    return (
        <ScrollView style={{flex: 1}}>
            <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 8, marginHorizontal: 8}}>
                <Text style={{fontFamily: 'Pulang', fontSize: 24}}>Perfil</Text>
            </View>

            <View style={{position: 'relative'}}>
                <View>
                    <View style={{height: 50}}></View>
                    <View style={{height: 50, backgroundColor: 'white', borderTopEndRadius: 16, borderTopStartRadius: 16, }}></View>
                </View>

                <View style={{position: 'absolute', justifyContent: 'center', alignItems: 'center'}}>
                    <ImageAccountComponent/>
                </View>
            </View>

            <View style={{backgroundColor: 'white', padding: 8, display: 'flex', flex: 1}}>
                <TouchableWithoutFeedback>
                    <View style={{flexDirection: 'row', justifyContent: 'center', paddingVertical: 16, marginVertical: 8, borderWidth: 2, borderRadius: 16, borderColor: 'black', backgroundColor: '#FF9934'}}>
                        <Text style={{fontWeight: 'bold', fontSize: 16}}>Sair</Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        </ScrollView>
    );
}
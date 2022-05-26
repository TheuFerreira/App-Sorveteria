import { loadAsync } from "expo-font";
import { useEffect, useState } from "react";
import { Image, ScrollView, Text, TouchableNativeFeedback, View } from "react-native";
import ImageAccountComponent from "./components/image_account_component";
import OptionButtonComponent from "./components/option_button_component";

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

    return (
        <ScrollView style={{flex: 1}} contentContainerStyle={{flex: 1}}>
            <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 8, marginHorizontal: 8}}>
                <Text style={{fontFamily: 'Pulang', fontSize: 24}}>Perfil</Text>
            </View>

            <View style={{position: 'relative'}}>
                <View>
                    <View style={{height: 50}}></View>
                    <View style={{height: 50, backgroundColor: 'white', borderTopEndRadius: 16, borderTopStartRadius: 16, }}></View>
                </View>

                <View style={{position: 'absolute', left: 0, right: 0, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                    <ImageAccountComponent/>
                </View>
            </View>

            <View style={{backgroundColor: 'white', padding: 8, display: 'flex', flex: 1, justifyContent: 'space-between'}}>

                <View style={{alignItems: 'center', paddingBottom: 24}}>
                    <Text style={{fontFamily: 'FuturaHandwritten', fontSize: 22}}>Paulo Puto</Text>
                </View>

                <View>
                    <OptionButtonComponent content='Alterar nome de usuário'/>

                    <View style={{height: 1, backgroundColor: '#1b1b1b45'}}></View>

                    <OptionButtonComponent content='Alterar senha'/>

                    <View style={{height: 1, backgroundColor: '#1b1b1b45'}}></View>

                    <OptionButtonComponent content='Alterar endereço'/>

                    <View style={{height: 1, backgroundColor: '#1b1b1b45'}}></View>

                    <OptionButtonComponent content='Alterar telefone'/>
                </View>

                <View>

                    <View style={{justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>

                        <Image source={require('../../../assets/imgs/others/vaca.png')} width={20} height={20} style={{height: 20, width: 20}}/>

                        <View style={{marginHorizontal: 8}}>
                            <Text style={{fontFamily: 'FuturaHandwritten', fontSize: 10}}>Developed by Ferreira</Text>
                            <Text style={{fontFamily: 'FuturaHandwritten', fontSize: 10}}>Designed by Alessandra</Text>
                        </View>
                    </View>

                    <TouchableNativeFeedback>
                        <View style={{flexDirection: 'row', justifyContent: 'center', paddingVertical: 12, marginVertical: 8, borderWidth: 2, borderRadius: 16, borderColor: 'black', backgroundColor: '#FF9934'}}>
                            <Text style={{fontWeight: 'bold', fontSize: 20}}>Sair</Text>
                        </View>
                    </TouchableNativeFeedback>
                </View>
            </View>
        </ScrollView>
    );
}
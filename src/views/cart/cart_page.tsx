import { loadAsync } from "expo-font";
import { useEffect, useState } from "react";
import { FlatList, ScrollView, Text, TouchableNativeFeedback, TouchableWithoutFeedback, View } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ItemCardComponent from "./components/item_cart_component";

const products = [
    { id: '1', name: 'Açaí 500ML', price: 21.50, quantity: 2 },
    { id: '2', name: 'Açaí 200ML', price: 13, quantity: 26 },
    { id: '3', name: 'Açaí 700ML', price: 17, quantity: 3 },
    { id: '4', name: 'Açaí 200ML', price: 13, quantity: 5 },
    { id: '5', name: 'Açaí 700ML', price: 17, quantity: 1 },
    { id: '6', name: 'Milk Shake 700ML', price: 17, quantity: 8 },
];

export default function CartPage() {

    const [loaded, setLoaded] = useState(false);
    const [totalValue, setTotalValue] = useState(0);

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
        <FlatList
            data={products}
            keyExtractor={item => item.id}
            style={{marginHorizontal: 8}}
            ListHeaderComponent={() => {
                return (
                    <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 8}}>
                        <Text style={{fontFamily: 'Pulang', fontSize: 24}}>Carrinho</Text>

                        <TouchableNativeFeedback>
                            <View style={{width: 40, height: 40, borderRadius: 20, borderColor: 'black', borderWidth: 2, backgroundColor: '#FF9934', justifyContent: 'center', alignItems: 'center'}}>
                                <MaterialCommunityIcons name='plus' size={24}/>
                            </View>
                        </TouchableNativeFeedback>
                    </View>
                );
            }}
            ListFooterComponent={() => {
                return (
                    <TouchableWithoutFeedback>
                        <View style={{flexDirection: 'row', justifyContent: 'center', paddingVertical: 16, marginVertical: 8, borderWidth: 2, borderRadius: 16, borderColor: 'black', backgroundColor: '#B3C631'}}>
                            <Text style={{fontWeight: 'bold', fontSize: 16}}>Finalizar pedido no valor de R${totalValue.toFixed(2)}</Text>
                        </View>
                    </TouchableWithoutFeedback>
                );
            }}
            renderItem={({item}) => <ItemCardComponent data={item}/>}
        />
    );
}
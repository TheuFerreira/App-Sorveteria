import { loadAsync } from "expo-font";
import { useEffect, useState } from "react";
import { FlatList, Text, TouchableNativeFeedback, View } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ButtonComponent from "../components/button_component";
import LoadingComponent from "../components/loading_component";
import ItemCardComponent from "./components/item_cart_component";

let _products = [
    { id: '1', name: 'Açaí 500ML', price: 21.50, quantity: 2 },
    { id: '2', name: 'Açaí 200ML', price: 13, quantity: 26 },
    { id: '3', name: 'Açaí 700ML', price: 17, quantity: 3 },
    { id: '4', name: 'Açaí 200ML', price: 13, quantity: 5 },
];

export default function CartPage() {

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
        return <LoadingComponent/>;
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
        <FlatList
            data={products}
            extraData={tempArr}
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
                    <View>
                        <View style={{flexDirection: 'row-reverse', marginVertical: 4}}>
                            <Text style={{fontWeight: 'bold', fontSize: 16, fontFamily: 'Pulang', color: '#B3C631'}}>R$ {totalValue.toFixed(2)}</Text>
                            <Text style={{fontWeight: 'bold', fontSize: 16, fontFamily: 'Pulang'}}>Valor total: </Text>
                        </View>

                        <ButtonComponent text='Finalizar pedido' backgroundColor='#B3C631'/>
                    </View>
                );
            }}
            renderItem={({item}) => <ItemCardComponent data={item} minusClick={(id: string) => minusClick(id)} plusClick={(id: string) => plusClick(id)}/>}
        />
    );
}
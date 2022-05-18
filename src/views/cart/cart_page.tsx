import { loadAsync } from "expo-font";
import { useEffect, useState } from "react";
import { FlatList, ScrollView, Text, TouchableNativeFeedback, View } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ItemCardComponent from "./components/item_cart_component";

const products = [
    { id: '1', name: 'Açaí 500ML', price: 21.50 },
    { id: '2', name: 'Açaí 200ML', price: 13 },
    { id: '3', name: 'Açaí 700ML', price: 17 },
    { id: '4', name: 'Açaí 200ML', price: 13 },
    { id: '5', name: 'Açaí 700ML', price: 17 },
    { id: '6', name: 'Milk Shake 700ML', price: 17 },
];

export default function CartPage() {

    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        loadFonts();
    }, []);

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
            renderItem={({item}) => <ItemCardComponent data={item}/>}
        />
    );
}
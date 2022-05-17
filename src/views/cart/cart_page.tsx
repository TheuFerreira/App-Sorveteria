import { loadAsync } from "expo-font";
import { useEffect, useState } from "react";
import { FlatList, ScrollView, Text, View } from "react-native";

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
                    <View>
                        <Text style={{fontFamily: 'Pulang', fontSize: 24}}>Carrinho</Text>
                    </View>
                );
            }}
            renderItem={({item}) => {
                return (
                    <View style={{marginVertical: 8, backgroundColor: 'white', borderRadius: 16, paddingHorizontal: 12, paddingVertical: 8, display: 'flex', flexDirection: 'row'}}>
                        <View style={{flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', marginRight: 8}}>
                            <View>
                                <Text style={{fontFamily: 'Pulang', fontSize: 15}}>{item.name}</Text>
                                <Text style={{fontFamily: 'FuturaHandwritten'}}>Descrição</Text>
                            </View>

                            <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                <Text style={{fontFamily: 'FuturaHandwritten', fontSize: 12}}>R$54,20</Text>
                                <Text>ícone</Text>
                            </View>
                        </View>

                        <View style={{height: 70, backgroundColor: 'red', width: 65}}></View>
                    </View>
                );
            }}
        />
    );
}
import { loadAsync } from "expo-font";
import { useEffect, useState } from "react";
import { Dimensions, FlatList, Image, ScrollView, StatusBar, Text, View } from "react-native";
import SearchComponent from "../components/search_component";
import UserInfoComponent from "../components/user_info_component";
import ProductCardComponent from "../components/product_card_component";

const products = [
    { id: '1', name: 'Açaí 500ML', price: 21.50 },
    { id: '2', name: 'Açaí 200ML', price: 13 },
    { id: '6', name: 'Milk Shake 700ML', price: 17 },
    { id: '6', name: 'Milk Shake sabor chocolate 700ML', price: 17 },
    { id: '3', name: 'Açaí 700ML', price: 17 },
    { id: '4', name: 'Açaí 200ML', price: 13 },
    { id: '5', name: 'Açaí 700ML', price: 17 },
];

export default function ProductsPage({navigation}: any) {

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

    let windowWidth = Dimensions.get('window').width;
    windowWidth = ((windowWidth - 16 - 16) / 2) - 8;

    return (
        <FlatList
            data={products}
            keyExtractor={item => item.id}
            numColumns={2}
            style={{marginHorizontal: 8}}
            ListHeaderComponent={() => {
                return (
                    <View>
                        <StatusBar/>
                        <View style={{marginVertical: 8, display: 'flex', flexDirection: 'row'}}>
                            <UserInfoComponent/>

                            <View style={{flex: 1, alignItems: 'flex-end', justifyContent: 'center'}}>
                                <Image source={require('../../../assets/icons/logo.png')} style={{width: 75, height: 75, resizeMode: 'contain'}}/>
                            </View>
                        </View>

                        <SearchComponent/>

                        <Text style={{marginVertical: 8, fontSize: 24, fontFamily: 'Pulang'}}>Sorvetes:</Text>
                    </View>
                );
            }}
            renderItem={({item}) => <ProductCardComponent name={item.name} price={item.price} maxWidth={windowWidth}/>}
        />
    );
}
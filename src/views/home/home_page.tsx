import { loadAsync } from "expo-font";
import { useEffect, useState } from "react";
import { Dimensions, FlatList, Image, SafeAreaView, ScrollView, StatusBar, Text, View } from "react-native";
import CategoryCardComponent from "./components/category_card_component";
import ProductCardComponent from "./components/product_card_component";
import SearchComponent from "./components/search_component";
import UserInfoComponent from "./components/user_info_component";

const numbers = [
    { id: "00", name: "Açaís", picture: require('../../../assets/imgs/acai.png') },
    { id: "01", name: "Sorvetes", picture: require('../../../assets/imgs/sorvetes.png') },
    { id: "02", name: "Raspadinhas", picture: require('../../../assets/imgs/raspadinhas.jpg') },
    { id: "03", name: "Sucos", picture: require('../../../assets/imgs/sucos.png') },
    { id: "04", name: "Potes", picture: require('../../../assets/imgs/potes.png') },
    { id: "05", name: "Milk Shakes", picture: require('../../../assets/imgs/milk_shake.webp') }
];

const products = [
    { id: '1', name: 'Açaí 500ML', price: 21.50 },
    { id: '2', name: 'Açaí 200ML', price: 13 },
    { id: '6', name: 'Milk Shake 700ML', price: 17 },
    { id: '6', name: 'Milk Shake sabor chocolate 700ML', price: 17 },
    { id: '3', name: 'Açaí 700ML', price: 17 },
    { id: '4', name: 'Açaí 200ML', price: 13 },
    { id: '5', name: 'Açaí 700ML', price: 17 },
];

export default function HomePage() {

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

                        <View>
                            <Text style={{fontSize: 18, fontFamily: 'Pulang'}}>Categorias</Text>

                            <FlatList
                                nestedScrollEnabled
                                data={numbers}
                                keyExtractor={item => item.id}
                                numColumns={3}
                                style={{marginVertical: 8, borderRadius: 16, backgroundColor: 'white', padding: 8}}
                                renderItem={({item}) => <CategoryCardComponent name={item.name} picture={item.picture} fontFamily={'Pulang'}/>}
                            />
                        </View>

                        <Text style={{fontSize: 18, fontFamily: 'Pulang'}}>Produtos mais vendidos</Text>
                    </View>
                );
            }}
            renderItem={({item}) => <ProductCardComponent name={item.name} price={item.price} maxWidth={windowWidth}/>}
        />
    );
}
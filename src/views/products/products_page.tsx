import { loadAsync } from "expo-font";
import { useContext, useEffect, useState } from "react";
import { Dimensions, FlatList, Image, ScrollView, StatusBar, Text, TouchableNativeFeedback, View } from "react-native";
import SearchComponent from "../components/search_component";
import ProductCardComponent from "../components/product_card_component";
import Context from "../../services/ContextService";
import ProductRepository from "../../repositories/ProductRepository";
import ProductResponse from "../../models/responses/ProductResponse";
import LoadingComponent from "../components/loading_component";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function ProductsPage({route, navigation}: any) {

    const [usuario, _]: any = useContext(Context);
    const [loaded, setLoaded] = useState(false);
    const [isSearching, setIsSearching] = useState(false);
    const [products, setProducts] = useState(Array<ProductResponse>());
    const [search, setSearch] = useState('');
    let extraData = [...products];

    const idCategory = route.params.idCategory;

    useEffect(() => {
        loadFonts();
    }, [usuario]);

    const loadFonts = async () => {
        setLoaded(false);

        await loadAsync({
            Pulang: require('../../../assets/fonts/Pulang.ttf'),
            FuturaHandwritten: require('../../../assets/fonts/FuturaHandwritten.ttf'),
        });

        await loadProductsByCategory();

        setLoaded(true);
    }

    const loadProductsByCategory = async () => {
        if (idCategory == null) {
            return;
        }

        const productRepository = new ProductRepository();
        const _products = await productRepository.getByCategory(idCategory, "");
        setProducts(_products);
    }

    useEffect(() => {
        if (idCategory != null) {
            searchProductByCategory(search);
        }
    }, [search]);

    const searchProductByCategory = async (text: string) => {
        setIsSearching(true);

        const productRepository = new ProductRepository();
        extraData = await productRepository.getByCategory(idCategory, text);
        setProducts(extraData);

        setIsSearching(false);
    }

    if (!loaded) {
        return <LoadingComponent/>;
    }

    let windowWidth = Dimensions.get('window').width;
    windowWidth = ((windowWidth - 16 - 16) / 2) - 8;

    const showProducts = () => {
        if (isSearching) {
            return <LoadingComponent/>;
        }

        return (
            <ScrollView horizontal={true}>
                <FlatList
                    data={products}
                    extraData={extraData}
                    keyExtractor={item => item.idProduct}
                    numColumns={2}
                    style={{marginHorizontal: 8}}
                    renderItem={({item}) => 
                        <ProductCardComponent 
                            name={item.title} 
                            price={item.price} 
                            img={item.img}
                            maxWidth={windowWidth}/>}
                />
            </ScrollView>
        );
    }

    return (
        <View style={{flex: 1}}>
            <ScrollView nestedScrollEnabled={true} style={{marginHorizontal: 8}}>
                <View>
                    <StatusBar/>

                    <View style={{marginVertical: 8, display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                        <TouchableNativeFeedback onPress={() => navigation.pop()}>
                            <View>
                                <MaterialCommunityIcons name="arrow-left" size={32}/>
                            </View>
                        </TouchableNativeFeedback>

                        <View style={{flex: 1, alignItems: 'flex-end', justifyContent: 'center'}}>
                            <Image source={require('../../../assets/icons/logo.png')} style={{width: 75, height: 75, resizeMode: 'contain'}}/>
                        </View>
                    </View>

                    <SearchComponent
                        value={search}
                        onChangeText={(text: string) => setSearch(text)}/>

                    <Text style={{marginVertical: 8, fontSize: 24, fontFamily: 'Pulang'}}>Sorvetes:</Text>
                </View>

                { showProducts() }
            </ScrollView>
        </View>
    );

    return (
        <FlatList
            data={products}
            extraData={extraData}
            keyExtractor={item => item.idProduct}
            numColumns={2}
            style={{marginHorizontal: 8}}
            renderItem={({item}) => 
                <ProductCardComponent 
                    name={item.title} 
                    price={item.price} 
                    img={item.img}
                    maxWidth={windowWidth}/>}
        />
    );
}
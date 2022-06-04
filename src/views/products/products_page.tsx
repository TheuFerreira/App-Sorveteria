import { loadAsync } from "expo-font";
import { useContext, useEffect, useState } from "react";
import { Dimensions, FlatList, Image, StatusBar, Text, View } from "react-native";
import SearchComponent from "../components/search_component";
import UserInfoComponent from "../components/user_info_component";
import ProductCardComponent from "../components/product_card_component";
import Context from "../../services/ContextService";
import ProductRepository from "../../repositories/ProductRepository";
import ProductResponse from "../../models/responses/ProductResponse";
import LoadingComponent from "../components/loading_component";

export default function ProductsPage({route, navigation}: any) {

    const [usuario, _]: any = useContext(Context);
    const [loaded, setLoaded] = useState(false);
    const [products, setProducts] = useState(Array<ProductResponse>());
    const idCategory = route.params.idCategory;

    useEffect(() => {
        loadFonts();
    }, []);

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

    if (!loaded) {
        return <LoadingComponent/>;
    }

    let windowWidth = Dimensions.get('window').width;
    windowWidth = ((windowWidth - 16 - 16) / 2) - 8;

    return (
        <FlatList
            data={products}
            keyExtractor={item => item.idProduct}
            numColumns={2}
            style={{marginHorizontal: 8}}
            ListHeaderComponent={() => {
                return (
                    <View>
                        <StatusBar/>
                        <View style={{marginVertical: 8, display: 'flex', flexDirection: 'row'}}>
                            <UserInfoComponent name={usuario.name} address={usuario.address}/>

                            <View style={{flex: 1, alignItems: 'flex-end', justifyContent: 'center'}}>
                                <Image source={require('../../../assets/icons/logo.png')} style={{width: 75, height: 75, resizeMode: 'contain'}}/>
                            </View>
                        </View>

                        <SearchComponent/>

                        <Text style={{marginVertical: 8, fontSize: 24, fontFamily: 'Pulang'}}>Sorvetes:</Text>
                    </View>
                );
            }}
            renderItem={({item}) => 
                <ProductCardComponent 
                    name={item.title} 
                    price={item.price} 
                    img={item.img}
                    maxWidth={windowWidth}/>}
        />
    );
}
import { loadAsync } from "expo-font";
import { useContext, useEffect, useState } from "react";
import { Dimensions, FlatList, Image, StatusBar, Text, View } from "react-native";
import SearchComponent from "../components/search_component";
import UserInfoComponent from "../components/user_info_component";
import CategoryCardComponent from "./components/category_card_component";
import ProductCardComponent from "../components/product_card_component";
import Context from "../../services/ContextService";
import CategoryRepository from "../../repositories/CategoryRepository";
import CategoryResponse from "../../models/responses/CategoryResponse";
import LoadingComponent from "../components/loading_component";

const products = [
    { id: '1', name: 'Açaí 500ML', price: 21.50 },
    { id: '2', name: 'Açaí 200ML', price: 13 },
    { id: '6', name: 'Milk Shake 700ML', price: 17 },
    { id: '6', name: 'Milk Shake sabor chocolate 700ML', price: 17 },
    { id: '3', name: 'Açaí 700ML', price: 17 },
    { id: '4', name: 'Açaí 200ML', price: 13 },
    { id: '5', name: 'Açaí 700ML', price: 17 },
];

export default function HomePage({navigation}: any) {

    const [usuario, _]:any = useContext(Context);
    const [loaded, setLoaded] = useState(false);
    const [categories, setCategories] = useState(Array<CategoryResponse>());

    useEffect(() => {
        loadFonts();
    }, []);

    const loadFonts = async () => {
        setLoaded(false);

        await loadAsync({
            Pulang: require('../../../assets/fonts/Pulang.ttf'),
            FuturaHandwritten: require('../../../assets/fonts/FuturaHandwritten.ttf'),
        });

        await loadCategories();

        setLoaded(true);
    }

    const loadCategories = async () => {
        const categoryRepository = new CategoryRepository();
        const _categories = await categoryRepository.getAll();

        setCategories(_categories);
    }

    if (!loaded) {
        return <LoadingComponent/>;
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
                            <UserInfoComponent name={usuario.name} address={usuario.address}/>

                            <View style={{flex: 1, alignItems: 'flex-end', justifyContent: 'center'}}>
                                <Image source={require('../../../assets/icons/logo.png')} style={{width: 75, height: 75, resizeMode: 'contain'}}/>
                            </View>
                        </View>

                        <SearchComponent/>

                        <View>
                            <Text style={{fontSize: 18, fontFamily: 'Pulang'}}>Categorias</Text>

                            <FlatList
                                nestedScrollEnabled
                                data={categories}
                                keyExtractor={item => item.idCategory}
                                numColumns={3}
                                style={{marginVertical: 8, borderRadius: 16, backgroundColor: 'white', padding: 8}}
                                renderItem={({item}) => 
                                    <CategoryCardComponent 
                                        id={item.idCategory}
                                        name={item.description} 
                                        picture={item.img} 
                                        fontFamily={'Pulang'} 
                                        onClick={(id: any) => navigation.navigate('Products', {
                                            idCategory: id,
                                            idProduct: null,
                                        })}/>
                                }
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
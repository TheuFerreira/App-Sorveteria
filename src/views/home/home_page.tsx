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
import ProductResponse from "../../models/responses/ProductResponse";
import ProductRepository from "../../repositories/ProductRepository";

export default function HomePage({navigation}: any) {

    const [usuario, _]:any = useContext(Context);
    const [loaded, setLoaded] = useState(false);
    const [categories, setCategories] = useState(Array<CategoryResponse>());
    const [mostSelled, setMostSelled] = useState(Array<ProductResponse>());
    const [search, setSearch] = useState('');

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

        await loadMostSelled();

        setLoaded(true);
    }

    const loadCategories = async () => {
        const categoryRepository = new CategoryRepository();
        const _categories = await categoryRepository.getAll();

        setCategories(_categories);
    }

    const loadMostSelled = async () => {
        const productRepository = new ProductRepository();
        const _mostSelled = await productRepository.getMostSelled(10);

        setMostSelled(_mostSelled);
    }

    if (!loaded) {
        return <LoadingComponent/>;
    }

    let windowWidth = Dimensions.get('window').width;
    windowWidth = ((windowWidth - 16 - 16) / 2) - 8;

    const onTapCategory = (idCategory: number) => {
        const data = {
            idCategory: idCategory
        };

        navigation.navigate('Products', data);
    }

    const onSearch = (text: string) => {
        const data = {
            idCategory: null,
            text: text
        };
        
        setSearch(text);

        navigation.navigate('Products', data);
    }

    const onProduct = (idProduct: any) => {
        navigation.navigate('ProductInfo', { idProduct });
    }

    return (
        <FlatList
            data={mostSelled}
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

                        <SearchComponent
                            value={search}
                            onChangeText={onSearch}/>

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
                                        onClick={onTapCategory}/>
                                }
                            />
                        </View>

                        <Text style={{fontSize: 18, fontFamily: 'Pulang'}}>Produtos mais vendidos</Text>
                    </View>
                );
            }}
            renderItem={({item}) => 
                <ProductCardComponent 
                    id={item.idProduct}
                    name={item.title} 
                    price={item.price}
                    img={item.img} 
                    maxWidth={windowWidth}
                    onClick={onProduct}
                />
            }
        />
    );
}
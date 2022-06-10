import { useEffect, useState } from "react";
import { Image, ScrollView, StatusBar, Text, TouchableNativeFeedback, View } from "react-native";
import LoadingComponent from "../components/loading_component";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DefaultButtonComponent from "../components/default_button_component";
import ButtonComponent from "../components/button_component";
import ProductRepository from "../../repositories/ProductRepository";
import ProductInfoResponse from "../../models/responses/ProductInfoResponse";

export default function ProductInfoPage({route, navigation}: any) {

    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState(new ProductInfoResponse());

    const idProduct = route.params.idProduct;

    useEffect(() => {
        loadProduct();
    }, []);

    const loadProduct = async () => {
        setLoading(true);

        const productRepository = new ProductRepository();
        const result = await productRepository.getById(idProduct);

        setProduct(result);
    
        setLoading(false);
    }

    if (loading) {
        return <LoadingComponent/>;
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

                        <Text style={{fontSize: 24, fontWeight: 'bold'}}>{product.title}</Text>

                        <View style={{flex: 1, alignItems: 'flex-end', justifyContent: 'center'}}>
                            <Image source={require('../../../assets/icons/logo.png')} style={{width: 75, height: 75, resizeMode: 'contain'}}/>
                        </View>
                    </View>

                    <View style={{marginHorizontal: 8, paddingHorizontal: 16, paddingVertical: 8, backgroundColor: 'white', borderRadius: 16}}>

                        <Text style={{fontSize: 24, fontWeight: 'bold'}}>{product.title}</Text>

                        <View style={{flexDirection: 'row'}}>
                            <View style={{flex: 1}}>
                                <Text style={{textAlign: 'justify'}}>{product.description}</Text>

                                <View style={{height: 16}}></View>

                                <Text style={{fontSize: 20, fontWeight: 'bold'}}>Valor unitário</Text>
                                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                    <Text style={{fontSize: 20, color: '#B3C631', marginRight: 16}}>R$ {product.price.toFixed(2)}</Text>
                                    
                                    <DefaultButtonComponent icon='minus'/>
                                    <Text style={{fontSize: 14, fontWeight: 'bold', marginHorizontal: 8}}>1</Text>
                                    <DefaultButtonComponent icon='plus'/>
                                </View>
                            </View>

                            <View style={{flex: 1, alignItems: 'center'}}>
                                <Image source={{uri: product.img}} height={50} width={50} style={{height: 200, width: 150}} />
                            </View>
                        </View>
                        

                        <View style={{height: 24}}></View>

                        <View style={{flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center'}}>
                            <Text style={{fontSize: 24, fontWeight: 'bold'}}>Valor total: </Text>
                            <Text style={{fontSize: 24, color: '#B3C631'}}>R$ xx,xx</Text>
                        </View>

                        <ButtonComponent text='Adicionar ao carrinho' backgroundColor='#B3C631'/>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}
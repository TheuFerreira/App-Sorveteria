import { useIsFocused } from "@react-navigation/native";
import { loadAsync } from "expo-font";
import { useContext, useEffect, useState } from "react";
import { FlatList, Text, ToastAndroid, View } from "react-native";
import CartProduct from "../../models/CartProduct";
import SaleProductRequests from "../../models/requests/SaleProductRequests";
import ProductRepository from "../../repositories/ProductRepository";
import SaleRepository from "../../repositories/SaleRepository";
import Context from "../../services/ContextService";
import { getJson, saveJson } from "../../services/storage_service";
import ButtonComponent from "../components/button_component";
import LoadingComponent from "../components/loading_component";
import ItemCardComponent from "./components/item_cart_component";

export default function CartPage() {

    const [usuario, _] : any = useContext(Context);
    const [loaded, setLoaded] = useState(false);
    const [totalValue, setTotalValue] = useState(0);
    const [products, setProducts] = useState(Array<CartProduct>());
    let tempArr = [...products];

    const isFocused = useIsFocused();

    useEffect(() => {
        if (!isFocused) {
            return;
        }

        loadFonts();
    }, [isFocused]);

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
        setLoaded(false);

        await loadAsync({
            Pulang: require('../../../assets/fonts/Pulang.ttf'),
            FuturaHandwritten: require('../../../assets/fonts/FuturaHandwritten.ttf'),
        });

        await loadProducts();

        setLoaded(true);
    }

    const loadProducts = async () => {
        const values = await getJson();
        if (values == null) {
            return;
        }

        tempArr = new Array<CartProduct>();
        for (let i = 0; i < values.length; i++) {
            const value = values[i];
            const idProduct = parseInt(value.idProduct);
            
            const productRepository = new ProductRepository();
            const prod = await productRepository.getById(idProduct);

            const cartProduct = new CartProduct();
            cartProduct.idProduct = value.idProduct;
            cartProduct.name = prod.title;
            cartProduct.description = prod.description;
            cartProduct.price = prod.price;
            cartProduct.quantity = value.quantity;
            cartProduct.img = prod.img;

            tempArr.push(cartProduct);
        }

        setProducts(tempArr);
    }

    if (!loaded) {
        return <LoadingComponent/>;
    }

    const minusClick = async (id: String) => {
        for (let i = 0; i < tempArr.length; i++) {
            const product = tempArr[i];
            if (product.idProduct !== id) {
                continue;
            } 

            product.quantity -= 1;
            if (product.quantity <= 0) {
                tempArr.splice(i, 1);
            } else {
                tempArr[i] = product;
            }

            setProducts(tempArr);
            await saveJson(tempArr);
            break;
        }
    }

    const plusClick = async (id: String) => {
        for (let i = 0; i < tempArr.length; i++) {
            const product = tempArr[i];
            if (product.idProduct !== id) {
                continue;
            } 

            product.quantity += 1;
            tempArr[i] = product;
            setProducts(tempArr);
            await saveJson(tempArr);
            break;
        }
    }

    const finish = async () => {

        if (tempArr.length == 0) {
            return;
        }

        setLoaded(false);

        let finishProducts = Array<SaleProductRequests>();
        for (let i = 0; i < tempArr.length; i++) {
            const t = tempArr[i];

            const saleProduct = new SaleProductRequests();
            saleProduct.id_product = parseInt(t.idProduct);
            saleProduct.price = t.price;
            saleProduct.quantity = t.quantity;

            finishProducts.push(saleProduct);
        }

        const saleRepository = new SaleRepository();
        const response = await saleRepository.finish(usuario.idUser, finishProducts);

        setLoaded(true);

        let message = 'Houve um problema interno'
        if (response) {
            message = 'Pedido finalizado';
            saveJson(null);
            setProducts(Array<CartProduct>());
        }

        ToastAndroid.showWithGravity(
            message,
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM
        );
    }

    return (
        <FlatList
            data={products}
            extraData={tempArr}
            keyExtractor={item => item.idProduct}
            style={{marginHorizontal: 8}}
            ListHeaderComponent={() => {
                return (
                    <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 8}}>
                        <Text style={{fontFamily: 'Pulang', fontSize: 24}}>Carrinho</Text>
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

                        <ButtonComponent 
                            text='Finalizar pedido' 
                            backgroundColor='#B3C631'
                            onClick={finish}/>
                    </View>
                );
            }}
            renderItem={({item}) => 
                <ItemCardComponent 
                    data={item} 
                    minusClick={(id: string) => minusClick(id)} 
                    plusClick={(id: string) => plusClick(id)}
                />
            }
        />
    );
}
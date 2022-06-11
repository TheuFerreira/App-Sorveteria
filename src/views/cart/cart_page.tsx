import { loadAsync } from "expo-font";
import { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import CartProduct from "../../models/CartProduct";
import ProductRepository from "../../repositories/ProductRepository";
import { getJson } from "../../services/storage_service";
import ButtonComponent from "../components/button_component";
import LoadingComponent from "../components/loading_component";
import ItemCardComponent from "./components/item_cart_component";

export default function CartPage() {

    const [loaded, setLoaded] = useState(false);
    const [totalValue, setTotalValue] = useState(0);
    const [products, setProducts] = useState(Array<CartProduct>());
    let tempArr = [...products];

    useEffect(() => {
        loadFonts();
    }, []);

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
        console.log("");
    }

    if (!loaded) {
        return <LoadingComponent/>;
    }

    const minusClick = (id: String) => {
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
            break;
        }
    }

    const plusClick = (id: String) => {
        for (let i = 0; i < tempArr.length; i++) {
            const product = tempArr[i];
            if (product.idProduct !== id) {
                continue;
            } 

            product.quantity += 1;
            tempArr[i] = product;
            setProducts(tempArr);
            break;
        }
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

                        <ButtonComponent text='Finalizar pedido' backgroundColor='#B3C631'/>
                    </View>
                );
            }}
            renderItem={({item}) => <ItemCardComponent data={item} minusClick={(id: string) => minusClick(id)} plusClick={(id: string) => plusClick(id)}/>}
        />
    );
}
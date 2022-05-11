import { loadAsync } from "expo-font";
import { useEffect, useState } from "react";
import { FlatList, StatusBar, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import CardComponent from "./components/card_components";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

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
    { id: '3', name: 'Açaí 700ML', price: 17 },
    { id: '4', name: 'Açaí 200ML', price: 13 },
    { id: '5', name: 'Açaí 700ML', price: 17 }
];

export default function HomePage() {

    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        loadAsync({
            Pulang: require('../../../assets/fonts/Pulang.ttf'),
            FuturaHandwritten: require('../../../assets/fonts/FuturaHandwritten.ttf'),
        }).then(() => {
            setLoaded(true);
        });
    }, []);

    if (loaded == false) {
        return (
            <View>
                <Text>Carregando</Text>
            </View>
        );
    }

    return (
        <View>
            <StatusBar/>
            
            <View style={{padding: 8, display: 'flex', flexDirection: 'row', justifyContent: 'flex-end'}}>
                <Text>Barra de Pesquisa</Text>
                <MaterialCommunityIcons name='magnify' size={26}/>
                <View style={{marginRight: 12}}/>
                <MaterialCommunityIcons name='cart' size={26}/>
            </View>

            <View style={{paddingHorizontal: 8}}>
                <Text style={{fontSize: 18, fontFamily: 'Pulang'}}>Categorias</Text>

                <FlatList
                    data={numbers}
                    keyExtractor={item => item.id}
                    numColumns={3}
                    style={{margin: 8, borderRadius: 8, backgroundColor: 'white', padding: 8}}
                    renderItem={({item}) => <CardComponent name={item.name} picture={item.picture} fontFamily={'Pulang'}/>}
                />
            </View>

            <View style={{paddingHorizontal: 8}}>
                <Text style={{fontSize: 18, fontFamily: 'Pulang'}}>Produtos</Text>

                <FlatList
                    data={products}
                    keyExtractor={item => item.id}
                    numColumns={2}
                    style={{margin: 8}}
                    renderItem={({item}) => {
                        return (
                            <TouchableOpacity style={{
                                margin: 4, 
                                backgroundColor: 'white', 
                                minHeight: 120, 
                                borderRadius: 8, 
                                elevation: 4, 
                                shadowColor: '#000', 
                                flexGrow: 1,
                                shadowOffset: { 
                                    width: 0, 
                                    height: 0 
                                }, 
                                shadowOpacity: .3, 
                                shadowRadius: 0,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                overflow: 'hidden',
                            }}>
                                <View style={{flex: 1, backgroundColor: '#ff9934', width: '100%'}}></View>
                                <View style={{display: 'flex', justifyContent: 'center', alignItems: 'center', margin: 4}}>
                                    <Text style={{fontFamily: 'Pulang', fontSize: 16}}>{item.name}</Text>
                                    <Text style={{fontFamily: 'FuturaHandwritten', fontSize: 12}}>R$ {item.price.toFixed(2).replace('.', ',')}</Text>
                                </View>
                            </TouchableOpacity >
                        );
                    }}
                />
            </View>
        </View>
    );
}
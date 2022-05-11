import { FlatList, StatusBar, Text, View } from "react-native";
import CardComponent from "./components/card_components";

const numbers = [
    { id: "00", name: "Açaí", picture: require('../../../assets/imgs/acai.png') },
    { id: "01", name: "Sorvetes", picture: require('../../../assets/imgs/sorvetes.png') },
    { id: "02", name: "Raspadinhas", picture: require('../../../assets/imgs/raspadinhas.jpg') },
    { id: "03", name: "Sucos", picture: require('../../../assets/imgs/sucos.png') },
    { id: "04", name: "Potes", picture: require('../../../assets/imgs/potes.png') },
    { id: "05", name: "Milk Shakes", picture: require('../../../assets/imgs/milk_shake.webp') }
];

export default function HomePage() {
    return (
        <View>
            <StatusBar/>
            <View style={{paddingHorizontal: 8}}>
                <Text style={{fontWeight: 'bold', fontSize: 18}}>Categorias</Text>

                <FlatList
                    data={numbers}
                    keyExtractor={item => item.id}
                    numColumns={3}
                    style={{margin: 8, borderRadius: 8, backgroundColor: 'white', padding: 8}}
                    renderItem={({item}) => {
                        return (
                            <CardComponent name={item.name} picture={item.picture}/>
                        );
                    }}
                />
                <View style={{paddingHorizontal: 8, paddingVertical: 8, display: 'flex', flexDirection: 'row'}}>
                </View>
            </View>
        </View>
    );
}
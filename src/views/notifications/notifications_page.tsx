import { loadAsync } from "expo-font";
import { useEffect, useState } from "react";
import { FlatList, ScrollView, Text, TouchableNativeFeedback, TouchableWithoutFeedback, View } from "react-native";
import ItemNotificationComponent from "./components/item_notification_component";

let _notifications = [
    { id: '1', type: 3, title: 'Atualizações do seu pedido:', description: 'Seu pedido está a caminho!', date: '11/05/2022 às 16:23' },
    { id: '2', type: 2, title: 'Atualizações do seu pedido:', description: 'Seu pedindo está sendo feito', date: '11/05/2022 às 16:23' },
    { id: '3', type: 1, title: 'Atualizações do seu pedido:', description: 'Pagamento aprovado', date: '11/05/2022 às 16:23' },
];

export default function NotificationsPage() {
    
    const [loaded, setLoaded] = useState(false);
    const [notifications, setProducts] = useState(_notifications);
    let tempArr = [...notifications];

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

    return (
        <FlatList
            data={notifications}
            extraData={tempArr}
            keyExtractor={item => item.id}
            style={{marginHorizontal: 8}}
            ListHeaderComponent={() => {
                return (
                    <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 8}}>
                        <Text style={{fontFamily: 'Pulang', fontSize: 24}}>Notificações</Text>
                    </View>
                );
            }}
            renderItem={({item}) => <ItemNotificationComponent data={item} />}
        />
    );
}
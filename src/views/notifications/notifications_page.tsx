import { loadAsync } from "expo-font";
import { useContext, useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import NotificationResponse from "../../models/responses/NotificationResponse";
import NotificationRepository from "../../repositories/NotificationRepository";
import Context from "../../services/ContextService";
import LoadingComponent from "../components/loading_component";
import ItemNotificationComponent from "./components/item_notification_component";

export default function NotificationsPage() {
    
    const [usuario]: any = useContext(Context);
    const [loaded, setLoaded] = useState(false);
    const [notifications, setNotifications] = useState(Array<NotificationResponse>());

    useEffect(() => {
        loadFonts();
    }, []);

    const loadFonts = async () => {
        setLoaded(false);

        await loadAsync({
            Pulang: require('../../../assets/fonts/Pulang.ttf'),
            FuturaHandwritten: require('../../../assets/fonts/FuturaHandwritten.ttf'),
        });

        await getAllNotifications();

        setLoaded(true);
    }

    const getAllNotifications = async () => {
        const idUser = usuario.idUser;
        const notificationRepository = new NotificationRepository();
        const _notifications = await notificationRepository.getAllByUser(idUser);
        setNotifications(_notifications);
    }

    if (!loaded) {
        return <LoadingComponent/>;
    }

    return (
        <FlatList
            data={notifications}
            keyExtractor={item => item.idNotification}
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
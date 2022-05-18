import { Image, Text, View } from "react-native";

export default function ItemNotificationComponent(props: any) {
    const data = props.data;

    let img = require('../../../../assets/imgs/notifications/credit_card.png');
    if (data.type == 3) {
        img = require('../../../../assets/imgs/notifications/delivery.png');
    } else if (data.type == 2) {
        img = require('../../../../assets/imgs/notifications/ice.png');
    }

    return (
        <View key={data.id} style={{marginVertical: 8, backgroundColor: 'white', borderRadius: 16, paddingHorizontal: 12, paddingVertical: 8, display: 'flex', flexDirection: 'row'}}>
            <View style={{flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', marginRight: 8}}>
                <View>
                    <Text style={{fontFamily: 'Pulang', fontSize: 15}}>{data.title}</Text>
                    <Text style={{fontFamily: 'FuturaHandwritten'}}>{data.description}</Text>
                </View>

                <Text style={{fontFamily: 'FuturaHandwritten', fontSize: 12}}>{data.date}</Text>
            </View>

            <View style={{height: 70, width: 65}}>
                <Image source={img} style={{height: 70, width: 65}} resizeMode='cover'/>
            </View>
        </View>
    );
}
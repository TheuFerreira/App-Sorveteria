import { View } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function ImageAccountComponent() {
    return (
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <View style={{backgroundColor: '#5b5b5b', height: 100, width: 100, borderRadius: 50, position: 'relative', justifyContent: 'center', alignItems: 'center'}}>
                <MaterialCommunityIcons name='account' size={90}/>
            </View>
        </View>
    );
}
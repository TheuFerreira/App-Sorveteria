import { TouchableNativeFeedback, View } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function ImageAccountComponent() {
    return (
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <View style={{backgroundColor: '#5b5b5b', height: 100, width: 100, borderRadius: 50, position: 'relative', justifyContent: 'center', alignItems: 'center'}}>
                <MaterialCommunityIcons name='account' size={90}/>

                <View style={{width: 25, height: 25, right: 0, bottom: 0, position: 'absolute', marginRight: 16, marginBottom: 16}}>
                    <TouchableNativeFeedback>
                        <View style={{width: 40, height: 40, borderRadius: 20, borderColor: 'black', borderWidth: 2, backgroundColor: '#FFC018', justifyContent: 'center', alignItems: 'center'}}>
                            <MaterialCommunityIcons name='plus' size={24}/>
                        </View>
                    </TouchableNativeFeedback>
                </View>
            </View>
        </View>
    );
}
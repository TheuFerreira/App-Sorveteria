import { TouchableNativeFeedback, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function DefaultButtonComponent(props: any) {
    return (
        <TouchableNativeFeedback>
            <View style={{borderRadius: 20, backgroundColor: '#FF9934', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 4, paddingVertical: 2}}>
                <MaterialCommunityIcons name={props.icon} size={16}/>
            </View>
        </TouchableNativeFeedback>
    );
}
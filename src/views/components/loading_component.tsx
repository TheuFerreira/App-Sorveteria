import { ActivityIndicator, Text, View } from "react-native";

export default function LoadingComponent() {
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size={62} color={'#d66b00'}/>
            <View style={{height: 16}}></View>
            <Text style={{fontSize: 20, color: '#d66b00'}}>Carregando</Text>
        </View>
    );
}
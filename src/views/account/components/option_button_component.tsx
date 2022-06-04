import { Text, TouchableNativeFeedback, View } from "react-native";

export default function OptionButtonComponent(props: any) {
    return (
        <TouchableNativeFeedback onPress={() => props.onClick()}>
            <View style={{paddingHorizontal: 12, paddingVertical: 18}}>
                <Text style={{fontFamily: 'Pulang', fontSize: 20}}>{props.content}</Text>
            </View>
        </TouchableNativeFeedback>
);
}
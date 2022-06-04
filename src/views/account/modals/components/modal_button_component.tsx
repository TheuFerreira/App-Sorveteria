import { StyleSheet, Text, TouchableNativeFeedback, View } from "react-native";

export default function ModalButtonComponent(props: any) {
    return (
        <TouchableNativeFeedback onPress={() => props.onClick()}>
            <View style={styles.container}>
                <Text style={{color: props.color}}>{props.text}</Text>
            </View>
        </TouchableNativeFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16
    }
});
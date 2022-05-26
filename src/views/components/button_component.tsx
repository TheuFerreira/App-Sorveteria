import { StyleSheet, Text, TouchableNativeFeedback, View } from "react-native";

export default function ButtonComponent(props: any) {
    return (
        <TouchableNativeFeedback>
            <View style={[styles.container, {backgroundColor: props.backgroundColor}]}>
                <Text style={styles.text}>{props.text}</Text>
            </View>
        </TouchableNativeFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row', 
        justifyContent: 'center', 
        paddingVertical: 12, 
        marginVertical: 8, 
        borderWidth: 2, 
        borderRadius: 16, 
        borderColor: 'black', 
    },
    text: {
        fontWeight: 'bold', fontSize: 20
    }
});
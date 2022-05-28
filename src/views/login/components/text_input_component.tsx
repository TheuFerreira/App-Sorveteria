import { StyleSheet, Text, TextInput, View } from "react-native";

export default function TextInputComponent(props: any) {
    return (
        <View>
            <Text style={styles.textHeader}>{props.header}</Text>
            <TextInput placeholder={props.placeholder} style={styles.textInput}/>
        </View>
    );
}

const styles = StyleSheet.create({
    textHeader: {
        fontSize: 16, 
        fontWeight: 'bold',
        marginTop: 8
    },
    textInput: {
        backgroundColor: 'white',
        marginVertical: 8,
        marginHorizontal: 8,
        borderRadius: 16,
        fontSize: 16,
        paddingVertical: 14,
        paddingHorizontal: 16
    }
});
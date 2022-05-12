import { Image, StyleSheet, Text, TouchableNativeFeedback, View } from "react-native";

export default function CategoryCardComponent(props: any) {

    return (
        <TouchableNativeFeedback style={styles.button} onPress={() => {}}>
            <View style={styles.view}>
                <Image source={props.picture} style={styles.image} />
                <Text style={{fontFamily: props.fontFamily}}>{props.name}</Text>
            </View>
        </TouchableNativeFeedback>
    );
}

const styles = StyleSheet.create({
    button: {
        margin: 4
    },
    view: {
        flexGrow: 1, 
        alignItems: 'center'
    },
    image: {
        width: 80, 
        height: 80, 
        resizeMode: 'contain'
    }
});
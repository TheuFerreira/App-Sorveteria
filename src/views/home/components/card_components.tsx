import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function CardComponent(props: any) {

    return (
        <TouchableOpacity style={styles.button}>
            <View style={styles.view}>
                <Image source={props.picture} style={styles.image} />
                <Text style={{fontFamily: props.fontFamily}}>{props.name}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        flexGrow: 1, 
        margin: 4
    },
    view: {
        alignItems: 'center'
    },
    image: {
        width: 80, 
        height: 80, 
        resizeMode: 'contain'
    }
});
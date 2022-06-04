import { Easing, Image, StyleSheet, Text, TouchableNativeFeedback, View } from "react-native";
import TextTicker from "react-native-text-ticker";

export default function ProductCardComponent(props: any) {

    return (
        <TouchableNativeFeedback onPress={() => {}}>
            <View style={[{
                minWidth: props.maxWidth,
                maxWidth: props.maxWidth,
            }, styles.container]}>
                <View style={styles.imageContainer}>
                    <Image source={{uri: props.img}} height={50} width={50} style={{resizeMode: 'contain', width: 90, height: 60}}/>
                </View>
                <View style={styles.textContainer}>
                    <TextTicker duration={7000} easing={Easing.linear} style={{fontFamily: 'Pulang', fontSize: 16, minWidth: props.maxWidth - 8}}>{props.name}</TextTicker>
                    <Text style={{fontFamily: 'FuturaHandwritten', fontSize: 12}}>R$ {props.price.toFixed(2).replace('.', ',')}</Text>
                </View>
            </View>
        </TouchableNativeFeedback >
    );
}

const styles = StyleSheet.create({
    container: {
        margin: 4,
        marginVertical: 8, 
        backgroundColor: 'white', 
        minHeight: 120, 
        borderRadius: 16, 
        elevation: 4, 
        shadowColor: '#000', 
        flexGrow: 1,
        shadowOffset: { 
            width: 0, 
            height: 0 
        }, 
        shadowOpacity: .3, 
        shadowRadius: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    imageContainer: {
        flex: 1, backgroundColor: '#ffc018', width: '100%', justifyContent: 'center', alignItems: 'center'
    },
    textContainer: {
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        margin: 4
    }
});
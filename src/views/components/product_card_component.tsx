import { Easing, Image, StyleSheet, Text, TouchableNativeFeedback, View } from "react-native";
import TextTicker from "react-native-text-ticker";

export default function ProductCardComponent(props: any) {

    return (
        <TouchableNativeFeedback onPress={() => {}}>
            <View style={{
                margin: 4,
                marginVertical: 8, 
                backgroundColor: 'white', 
                minHeight: 120, 
                minWidth: props.maxWidth,
                maxWidth: props.maxWidth,
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
            }}>
                <View style={{flex: 1, backgroundColor: '#ffc018', width: '100%'}}></View>
                <View style={{display: 'flex', justifyContent: 'center', alignItems: 'center', margin: 4}}>
                    <TextTicker duration={7000} easing={Easing.linear} style={{fontFamily: 'Pulang', fontSize: 16}}>{props.name}</TextTicker>
                    <Text style={{fontFamily: 'FuturaHandwritten', fontSize: 12}}>R$ {props.price.toFixed(2).replace('.', ',')}</Text>
                </View>
            </View>
        </TouchableNativeFeedback >
    );
}

const styles = StyleSheet.create({
    
});
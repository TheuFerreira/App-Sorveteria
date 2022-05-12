import { Image, StyleSheet, Text, TouchableNativeFeedback, View } from "react-native";

export default function ProductCardComponent(props: any) {

    return (
        <TouchableNativeFeedback onPress={() => {}}>
            <View style={{
                margin: 4, 
                backgroundColor: 'white', 
                minHeight: 120, 
                borderRadius: 8, 
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
                    <Text style={{fontFamily: 'Pulang', fontSize: 16}}>{props.name}</Text>
                    <Text style={{fontFamily: 'FuturaHandwritten', fontSize: 12}}>R$ {props.price.toFixed(2).replace('.', ',')}</Text>
                </View>
            </View>
        </TouchableNativeFeedback >
    );
}

const styles = StyleSheet.create({
    
});
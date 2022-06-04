import { Image, StyleSheet, Text, View } from "react-native";

export default function CopyrightComponent() {
    return (
        <View style={styles.container}>
            <Image source={require('../../../../assets/imgs/others/vaca.png')} width={20} height={20} style={{height: 20, width: 20}}/>

            <View style={{marginHorizontal: 8}}>
                <Text style={{fontFamily: 'FuturaHandwritten', fontSize: 10}}>Developed by Ferreira</Text>
                <Text style={{fontFamily: 'FuturaHandwritten', fontSize: 10}}>Designed by Alessandra</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center', 
        alignItems: 'center', 
        flexDirection: 'row'
    }
});
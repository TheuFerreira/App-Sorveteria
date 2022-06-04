import { Easing, StyleSheet, Text, View } from "react-native";
import TextTicker from "react-native-text-ticker";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function UserInfoComponent(props: any) {
    return (
        <View style={styles.container}>
            <View style={styles.pictureContainer}>
                <MaterialCommunityIcons name='account' size={52}/>
            </View>
            
            <View style={styles.divider}></View>

            <View style={styles.infoContainer}>
                <Text style={styles.nameStyle}>Olá, {props.name}</Text>
                <View style={{height: 4}}></View>
                <TextTicker duration={7000} easing={Easing.linear} style={styles.addressStyles}>{props.address}</TextTicker>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 8, 
        backgroundColor: 'white', 
        borderRadius: 35, 
        height: 70, 
        flex: 2, 
        display: 'flex', 
        flexDirection: 'row'
    },
    pictureContainer: {
        maxHeight: 60, 
        width: 55, 
        borderRadius: 35
    },
    divider: {
        width: 8,
    },
    infoContainer: {
        flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center'
    },
    nameStyle: {
        fontFamily: 'FuturaHandwritten'
    },
    addressStyles: {
        fontFamily: 'Pulang', 
        fontSize: 16
    }
});
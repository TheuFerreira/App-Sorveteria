import { StyleSheet, TextInput, View } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function SearchComponent(props: any) {
    return (
        <View style={styles.container}>
            <TextInput 
                value={props.value}
                placeholder="Clique aqui para procurar o item desejado" 
                style={styles.input}
                onChangeText={(text) => props.onChangeText(text)}/>
            <MaterialCommunityIcons name='magnify' size={26}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 8, 
        display: 'flex', 
        flexDirection: 'row', 
        backgroundColor: 'white', 
        paddingVertical: 4, 
        paddingHorizontal: 12, 
        borderRadius: 16
    },
    input: {
        flex: 1
    },
});
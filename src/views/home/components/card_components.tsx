import { Image, Text, View } from "react-native";

export default function CardComponent(props: any) {

    return (
        <View style={{alignItems: 'center', flexGrow: 1, margin: 4}}>
            <Image source={props.picture} style={{width: 80, height: 80, resizeMode: 'contain'}} />
            <Text style={{fontFamily: props.fontFamily}}>{props.name}</Text>
        </View>
    );
}
import { loadAsync } from "expo-font";
import { useEffect, useState } from "react";
import { Image, ScrollView, StatusBar, Text, View } from "react-native";
import ButtonComponent from "../components/button_component";
import TextInputComponent from "./components/text_input_component";

export default function LoginPage() {

    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        loadFonts();
    }, []);

    const loadFonts = async () => {
        await loadAsync({
            Pulang: require('../../../assets/fonts/Pulang.ttf'),
            FuturaHandwritten: require('../../../assets/fonts/FuturaHandwritten.ttf'),
        });

        setLoaded(true);
    }

    if (!loaded) {
        return (
            <ScrollView>
                <Text>Carregando</Text>
            </ScrollView>
        );
    }

    return (
        <ScrollView style={{
            margin: 16,
        }}>
            <StatusBar/>

            <View style={{flexDirection: 'row'}}>
                <Image source={require('../../../assets/icons/logo.png')} width={50} height={50} style={{width: 110, height: 150}}/>

                <View style={{justifyContent: 'center', marginLeft: 8, flexShrink: 1}}>
                    <Text style={{textAlign: 'justify', fontFamily: 'FuturaHandwritten'}}>Para você engordar direitinho</Text>
                    <Text style={{fontSize: 22, textAlign: 'justify', fontFamily: 'Pulang'}}>FERREIRINHA SORVETES</Text>
                    <Text style={{textAlign: 'justify', fontFamily: 'FuturaHandwritten'}}>Rua dos Cornos, n. 22, Centro, Peçanha</Text>
                </View>
            </View>

            <View style={{
                backgroundColor: '#FFD054',
                padding: 16,
                marginVertical: 16,
                borderRadius: 16
            }}>

                <TextInputComponent header='Usuário:' placeholder="Digite seu nome de usuário"/>
                <TextInputComponent header='Senha:' placeholder="Digite sua senha"/>

                <ButtonComponent text='Entrar' backgroundColor='#B3C631'/>

                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 16, marginVertical: 8}}>
                    <View style={{height: 1, flex: 1, backgroundColor: '#00000063'}}></View>
                    <Text style={{marginHorizontal: 16, fontWeight: 'bold', fontSize: 18}}>ou</Text>
                    <View style={{height: 1, flex: 1, backgroundColor: '#00000063'}}></View>
                </View>

                <ButtonComponent text='Cadastrar' backgroundColor='#FF9934'/>
            </View>
        </ScrollView>
    );
}

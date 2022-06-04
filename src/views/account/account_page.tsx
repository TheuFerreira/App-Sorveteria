import { loadAsync } from "expo-font";
import { useContext, useEffect, useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";
import Context from "../../services/ContextService";
import ButtonComponent from "../components/button_component";
import LoadingComponent from "../components/loading_component";
import ImageAccountComponent from "./components/image_account_component";
import OptionButtonComponent from "./components/option_button_component";

export default function AccountPage() {

    const [_, setUsuario] : any = useContext(Context);
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
        return <LoadingComponent/>;
    }

    return (
        <ScrollView style={{flex: 1}} contentContainerStyle={{flex: 1}}>
            <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 8, marginHorizontal: 8}}>
                <Text style={{fontFamily: 'Pulang', fontSize: 24}}>Perfil</Text>
            </View>

            <View style={{position: 'relative'}}>
                <View>
                    <View style={{height: 50}}></View>
                    <View style={{height: 50, backgroundColor: 'white', borderTopEndRadius: 16, borderTopStartRadius: 16, }}></View>
                </View>

                <View style={{position: 'absolute', left: 0, right: 0, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                    <ImageAccountComponent/>
                </View>
            </View>

            <View style={{backgroundColor: 'white', padding: 8, display: 'flex', flex: 1, justifyContent: 'space-between'}}>

                <View style={{alignItems: 'center', paddingBottom: 24}}>
                    <Text style={{fontFamily: 'FuturaHandwritten', fontSize: 22}}>Paulo Puto</Text>
                </View>

                <View>
                    <OptionButtonComponent content='Alterar nome de usuário'/>

                    <View style={{height: 1, backgroundColor: '#1b1b1b45'}}></View>

                    <OptionButtonComponent content='Alterar senha'/>

                    <View style={{height: 1, backgroundColor: '#1b1b1b45'}}></View>

                    <OptionButtonComponent content='Alterar endereço'/>

                    <View style={{height: 1, backgroundColor: '#1b1b1b45'}}></View>

                    <OptionButtonComponent content='Alterar telefone'/>
                </View>

                <View>

                    <View style={{justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>

                        <Image source={require('../../../assets/imgs/others/vaca.png')} width={20} height={20} style={{height: 20, width: 20}}/>

                        <View style={{marginHorizontal: 8}}>
                            <Text style={{fontFamily: 'FuturaHandwritten', fontSize: 10}}>Developed by Ferreira</Text>
                            <Text style={{fontFamily: 'FuturaHandwritten', fontSize: 10}}>Designed by Alessandra</Text>
                        </View>
                    </View>

                    <ButtonComponent text='Sair' backgroundColor='#FF9934' onClick={() => setUsuario({})}/>
                </View>
            </View>
        </ScrollView>
    );
}
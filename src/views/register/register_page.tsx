import { ScrollView, StatusBar, Text, TouchableNativeFeedback, View } from "react-native";
import ButtonComponent from "../components/button_component";
import TextInputComponent from "../components/text_input_component";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function RegisterPage({navigation}: any) {

    const onRegister = () => {
        navigation.navigate('Login', { replace: true });
    }

    return (
        <ScrollView style={{
            padding: 16
        }}>
            <StatusBar/>

            <View style={{alignItems: 'center', display: 'flex'}}>
                <View style={{height: 100, width: 100, backgroundColor: '#F9F4F4', borderRadius: 50}}>
                    <View style={{height: 100, width: 100, justifyContent: 'center', alignItems: 'center'}}>
                        <MaterialCommunityIcons name='camera' size={48}/>
                    </View>

                    <View style={{position: 'absolute', height: 40, width: 40, right: 0, bottom: 0, borderRadius: 20}}>
                        <TouchableNativeFeedback>
                            <View style={{width: 40, height: 40, borderRadius: 20, borderColor: 'black', borderWidth: 2, backgroundColor: '#FFC018', justifyContent: 'center', alignItems: 'center'}}>
                                <MaterialCommunityIcons name='plus' size={24}/>
                            </View>
                        </TouchableNativeFeedback>
                    </View>
                </View>
            </View>

            <TextInputComponent header='Seu nome:' placeholder='Digite seu nome'/>
            <TextInputComponent header='Seu endereço:' placeholder='Digite seu endereço'/>
            <TextInputComponent header='Seu telefone:' placeholder='Digite seu telefone'/>
            <TextInputComponent header='Crie uma senha:' placeholder='Digite sua senha'/>
            <TextInputComponent header='Digite novamente sua senha:' placeholder='Digite novamente sua senha'/>

            <ButtonComponent text='Criar conta' backgroundColor='#B3C631' onClick={onRegister}/>

        </ScrollView>
    );
}
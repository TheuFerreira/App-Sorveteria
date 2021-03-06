import { loadAsync } from "expo-font";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Image, ScrollView, StatusBar, Text, ToastAndroid, View } from "react-native";
import UserRepository from "../../repositories/UserRepository";
import Context from "../../services/ContextService";
import ButtonComponent from "../components/button_component";
import LoadingComponent from "../components/loading_component";
import TextInputComponent from "../components/text_input_component";

export default function LoginPage({navigation}: any) {

    const [usuario, setUsuario] : any = useContext(Context);
    const [loaded, setLoaded] = useState(false);
    const { register, setValue, handleSubmit, formState: { errors } } = useForm();

    useEffect(() => {
        loadFonts();
    }, []);

    useEffect(() => {
        register('userName', {
            required: 'Insira um usuário'
        });
        register('password', {
            required: 'Insira uma senha'
        });
    }, [register]);

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

    const onLogin = async (data: any) => {
        const userRepository = new UserRepository();
        const result = await userRepository.login(data.userName, data.password);
        if (result.idUser === -1) {
            ToastAndroid.showWithGravity(
                result.message,
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM
            );
            return;
        }
        setUsuario(result);
    }

    const onRegister = () => {
        navigation.navigate('Register');
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

                <TextInputComponent 
                    header='Usuário:' 
                    placeholder="Digite seu nome de usuário" 
                    onChangeText={(text: any) => setValue('userName', text)}
                    errorMessage={errors.userName?.message}/>

                <TextInputComponent 
                    header='Senha:' 
                    placeholder="Digite sua senha" 
                    onChangeText={(text: any) => setValue('password', text)}
                    errorMessage={errors.password?.message}/>

                <ButtonComponent text='Entrar' backgroundColor='#B3C631' onClick={handleSubmit(onLogin)}/>

                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 16, marginVertical: 8}}>
                    <View style={{height: 1, flex: 1, backgroundColor: '#00000063'}}></View>
                    <Text style={{marginHorizontal: 16, fontWeight: 'bold', fontSize: 18}}>ou</Text>
                    <View style={{height: 1, flex: 1, backgroundColor: '#00000063'}}></View>
                </View>

                <ButtonComponent text='Cadastrar' backgroundColor='#FF9934' onClick={onRegister}/>
            </View>
        </ScrollView>
    );
}

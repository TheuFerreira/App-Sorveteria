import { ScrollView, StatusBar, Text, ToastAndroid, TouchableNativeFeedback, View } from "react-native";
import ButtonComponent from "../components/button_component";
import TextInputComponent from "../components/text_input_component";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import UserRepository from "../../repositories/UserRepository";

export default function RegisterPage({navigation}: any) {

    const { register, setValue, handleSubmit, formState: { errors } } = useForm();

    useEffect(() => {
        register('name', {
            required: 'Insira seu nome',
        });
        register('userName', {
            required: 'Insira um nome de usuário',
        });
        register('address', {
            required: 'Insira um endereço'
        });
        register('cellphone', {
            required: 'Insira o seu telefone'
        });
        register('password', {
            required: 'Insira uma senha'
        });
    }, [register])

    const onRegister = async (data: any) => {
        const name = data.name;
        const userName = data.userName;
        const address = data.address;
        const cellphone = data.cellphone;
        const password = data.password;

        const userRepository = new UserRepository();
        const result = await userRepository.registerUser(name, userName, address, cellphone, password);
        if (result.success !== true) {
            ToastAndroid.showWithGravity(
                result.message,
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM
            );
            return;
        }

        navigation.navigate('Login', { replace: true });
    }

    return (
        <ScrollView style={{
            paddingHorizontal: 16,
        }}>
            <StatusBar/>

            <View style={{alignItems: 'center', display: 'flex', paddingVertical: 16}}>
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

            <TextInputComponent 
                header='Seu nome:' 
                placeholder='Digite seu nome' 
                onChangeText={(text: any) => setValue('name', text)}
                errorMessage={errors.name?.message}/>

            <TextInputComponent 
                header='Seu nome de usuário:' 
                placeholder='Digite seu nome de usuário' 
                onChangeText={(text: any) => setValue('userName', text)}
                errorMessage={errors.userName?.message}/>

            <TextInputComponent 
                header='Seu endereço:' 
                placeholder='Digite seu endereço' 
                onChangeText={(text: any) => setValue('address', text)}
                errorMessage={errors.address?.message}/>

            <TextInputComponent 
                header='Seu telefone:' 
                placeholder='Digite seu telefone' 
                onChangeText={(text: any) => setValue('cellphone', text)}
                errorMessage={errors.cellphone?.message}/>

            <TextInputComponent 
                header='Crie uma senha:' 
                placeholder='Digite sua senha' 
                onChangeText={(text: any) => setValue('password', text)}
                errorMessage={errors.password?.message}/>

            <ButtonComponent text='Criar conta' backgroundColor='#B3C631' onClick={handleSubmit(onRegister)}/>

        </ScrollView>
    );
}
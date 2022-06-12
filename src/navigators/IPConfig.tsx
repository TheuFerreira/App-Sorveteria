import AsyncStorage from "@react-native-async-storage/async-storage";
import { loadAsync } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ScrollView, ToastAndroid, View } from "react-native";
import TestRepository from "../repositories/TestRepository";
import IPContext from "../services/IPContextService";
import ButtonComponent from "../views/components/button_component";
import LoadingComponent from "../views/components/loading_component";
import TextInputComponent from "../views/components/text_input_component";

const IPConfig = () => {

    const [loaded, setLoaded] = useState(false);
    const { register, setValue, handleSubmit, formState: { errors } } = useForm();
    const [ip, setIP]:any = useContext(IPContext);

    useEffect(() => {
        loadFonts();
    }, []);

    useEffect(() => {
        register('ip', {
            required: 'Insira o IP do servidor'
        });
    }, [register]);

    const loadFonts = async () => {
        await loadAsync({
            Pulang: require('../../assets/fonts/Pulang.ttf'),
            FuturaHandwritten: require('../../assets/fonts/FuturaHandwritten.ttf'),
        });

        setLoaded(true);
    }

    if (!loaded) {
        return <LoadingComponent/>;
    }

    const saveIP = async (data: any) => {
        const testRepository = new TestRepository();
        const response = await testRepository.testServer(data.ip);

        let message = 'Servidor inválido';
        if (response) {
            setIP(data.ip);
            await AsyncStorage.setItem('ip', data.ip);
            message = 'Sucesso';
        }

        ToastAndroid.showWithGravity(
            message,
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM
        );
    }

    return (
        <ScrollView style={{
            margin: 16,
        }}>
            <StatusBar/>

            <View style={{height: 32}}/>

            <View style={{
                backgroundColor: '#FFD054',
                padding: 16,
                marginVertical: 16,
                borderRadius: 16,
            }}>

                <TextInputComponent 
                    header='IP:' 
                    placeholder="http://192.168.1.0" 
                    onChangeText={(text: any) => setValue('ip', text)}
                    errorMessage={errors.ip?.message}/>

                <ButtonComponent 
                    text='Conectar' 
                    backgroundColor='#B3C631'
                    onClick={handleSubmit(saveIP)}/>
            </View>
        </ScrollView>
    );
}

export default IPConfig;
import { loadAsync } from "expo-font";
import { useContext, useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import Context from "../../services/ContextService";
import ButtonComponent from "../components/button_component";
import LoadingComponent from "../components/loading_component";
import CopyrightComponent from "./components/copyright_component";
import ImageAccountComponent from "./components/image_account_component";
import OptionButtonComponent from "./components/option_button_component";
import QuestionModal from "./modals/question_modal";

enum ModalType {
    name = 1,
    username = 2,
    address = 3,
    cellphone = 4,
    password = 5,
}

export default function AccountPage() {

    const [usuario, setUsuario] : any = useContext(Context);
    const [loaded, setLoaded] = useState(false);
    const [visible, setVisible] = useState(false);
    const [modalData, setModalData] = useState({});

    useEffect(() => {
        loadFonts();
    }, []);

    const loadFonts = async () => {
        setLoaded(false);

        await loadAsync({
            Pulang: require('../../../assets/fonts/Pulang.ttf'),
            FuturaHandwritten: require('../../../assets/fonts/FuturaHandwritten.ttf'),
        });

        setLoaded(true);
    }

    if (!loaded) {
        return <LoadingComponent/>;
    }

    const alterName = () => {
        const data = {
            type: ModalType.name,
            header: 'Insira seu novo nome:',
            placeholder: 'Digite aqui'
        };

        setModalData(data);
        setVisible(true);
    }

    const alterUsername = () => {
        const data = {
            type: ModalType.username,
            header: 'Insira seu novo nome de usuário:',
            placeholder: 'Digite aqui'
        };

        setModalData(data);
        setVisible(true);
    }

    const alterAddress = () => {
        const data = {
            type: ModalType.address,
            header: 'Insira seu novo endereço:',
            placeholder: 'Digite aqui'
        };

        setModalData(data);
        setVisible(true);
    }

    const alterCellphone = () => {
        const data = {
            type: ModalType.cellphone,
            header: 'Insira seu novo telefone:',
            placeholder: 'Digite aqui'
        };

        setModalData(data);
        setVisible(true);
    }

    const alterPassword = () => {
        const data = {
            type: ModalType.password,
            header: 'Insira sua nova senha:',
            placeholder: 'Digite aqui'
        };

        setModalData(data);
        setVisible(true);
    }

    const onConfirmModal = (data: any) => {
        console.log(data);
        setVisible(false);
    }

    return (
        <View style={{flex: 1}}>
            <ScrollView style={{flex: 1}} >
                <QuestionModal 
                    data={modalData} 
                    visible={visible} 
                    onCancel={() => setVisible(false)} 
                    onConfirm={onConfirmModal}/>

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

                    <View style={{alignItems: 'center', paddingBottom: 4}}>
                        <Text style={{fontFamily: 'FuturaHandwritten', fontSize: 22}}>{usuario.name}</Text>
                    </View>

                    <View>
                        <OptionButtonComponent content='Alterar nome' onClick={alterName}/>

                        <View style={{height: 1, backgroundColor: '#1b1b1b45'}}></View>

                        <OptionButtonComponent content='Alterar nome de usuário' onClick={alterUsername}/>

                        <View style={{height: 1, backgroundColor: '#1b1b1b45'}}></View>

                        <OptionButtonComponent content='Alterar endereço' onClick={alterAddress}/>

                        <View style={{height: 1, backgroundColor: '#1b1b1b45'}}></View>

                        <OptionButtonComponent content='Alterar telefone' onClick={alterCellphone}/>

                        <View style={{height: 1, backgroundColor: '#1b1b1b45'}}></View>

                        <OptionButtonComponent content='Alterar senha' onClick={alterPassword}/>
                    </View>

                    <View style={{marginTop: 16}}>
                        <CopyrightComponent/>
                        <ButtonComponent text='Sair' backgroundColor='#FF9934' onClick={() => setUsuario({})}/>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}
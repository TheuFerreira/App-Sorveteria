import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Modal, StyleSheet, View } from "react-native";
import TextInputComponent from "../../components/text_input_component";
import ModalButtonComponent from "./components/modal_button_component";

export default function QuestionModal(props: any) {

    const { register, setValue, handleSubmit, formState: { errors } } = useForm();

    useEffect(() => {
        register('field', {
            required: 'Insira um valor para o campo'
        });
    }, [register]);

    const onSubmit = (data: any) => {
        data.type = props.data.type;
        props.onConfirm(data);
    }

    return (
        <Modal
            transparent 
            visible={props.visible}>

            <View style={styles.modal}>

                <View style={styles.container}>
                    <View style={{
                        paddingHorizontal: 16,
                        marginVertical: 8
                    }}>
                        <TextInputComponent 
                            header={props.data.header}
                            placeholder={props.data.placeholder}
                            onChangeText={(text: any) => setValue('field', text)}
                            errorMessage={errors.field?.message}
                            style={{
                                borderColor: 'black',
                                borderWidth: 1
                            }}
                        />
                    </View>

                    <View style={styles.containerButton}>
                        <ModalButtonComponent 
                            onClick={() => props.onCancel()}
                            text='Cancelar'
                            color={'#FF9934'}
                        />

                        <ModalButtonComponent 
                            onClick={handleSubmit(onSubmit)}
                            text='Concluído'
                            color={'#96A721'}
                        />
                    </View>
                </View>

            </View>

        </Modal>
    );
}

const styles = StyleSheet.create({
    modal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00000026'
    },
    container: {
        backgroundColor: 'white',
        borderRadius: 8,
        width: 300
    },
    containerButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
});
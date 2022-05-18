import { Text, View } from "react-native";
import DefaultButtonComponent from "./default_button_component";

export default function ItemCardComponent(props: any) {
    const data = props.data;
    return (
        <View style={{marginVertical: 8, backgroundColor: 'white', borderRadius: 16, paddingHorizontal: 12, paddingVertical: 8, display: 'flex', flexDirection: 'row'}}>
            <View style={{flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', marginRight: 8}}>
                <View>
                    <Text style={{fontFamily: 'Pulang', fontSize: 15}}>{data.name}</Text>
                    <Text style={{fontFamily: 'FuturaHandwritten'}}>Descrição</Text>
                </View>

                <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Text style={{fontFamily: 'FuturaHandwritten', fontSize: 12}}>R$54,20</Text>

                    <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                        <DefaultButtonComponent icon='minus'/>
                        <Text style={{marginHorizontal: 8}}>1</Text>
                        <DefaultButtonComponent icon='plus'/>
                    </View>
                </View>
            </View>

            <View style={{height: 70, backgroundColor: 'red', width: 65}}></View>
        </View>
    );
}
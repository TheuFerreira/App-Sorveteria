import { Text, View } from "react-native";
import DefaultButtonComponent from "../../components/default_button_component";

export default function ItemCardComponent(props: any) {
    const data = props.data;
    return (
        <View key={data.id} style={{marginVertical: 8, backgroundColor: 'white', borderRadius: 16, paddingHorizontal: 12, paddingVertical: 8, display: 'flex', flexDirection: 'row'}}>
            <View style={{flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', marginRight: 8}}>
                <View>
                    <Text style={{fontFamily: 'Pulang', fontSize: 15}}>{data.name}</Text>
                    <Text style={{fontFamily: 'FuturaHandwritten'}}>Descrição</Text>
                </View>

                <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Text style={{fontFamily: 'FuturaHandwritten', fontSize: 12}}>R${data.price.toFixed(2)}</Text>

                    <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                        <DefaultButtonComponent icon='minus' onClick={() => props.minusClick(data.id)}/>
                        <Text style={{marginHorizontal: 8}}>{data.quantity}</Text>
                        <DefaultButtonComponent icon='plus' onClick={() => props.plusClick(data.id)}/>
                    </View>
                </View>
            </View>

            <View style={{height: 70, backgroundColor: 'red', width: 65}}></View>
        </View>
    );
}
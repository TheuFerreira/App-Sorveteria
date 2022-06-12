import * as React from 'react';
import Context from './src/services/ContextService';
import LoginArea from './src/navigators/LoginArea';
import Aplicativo from './src/navigators/Aplicativo';
import IPConfig from './src/navigators/IPConfig';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import Stack from './src/navigators/stack';
import Theme from './src/navigators/Theme';
import IPContext from './src/services/IPContextService';

export default function App() {

  const [usuario, setUsuario] = React.useState({});
  const [ip, setIP] = React.useState(null);

  if (ip == null) {
    return (
      <IPContext.Provider value={[ip, setIP]}>
        <SafeAreaProvider>
            <NavigationContainer theme={Theme}>
                <Stack.Navigator 
                  initialRouteName='IP'
                  screenOptions={{
                      headerShown: false,
                  }}>
                  <Stack.Screen name='IP' component={IPConfig}/>
                </Stack.Navigator>
            </NavigationContainer>
        </SafeAreaProvider>
      </IPContext.Provider>
    );
  }

  return (
    <Context.Provider value={[usuario, setUsuario]}>
      { Object.keys(usuario).length === 0 ? <LoginArea/> : <Aplicativo/> }
    </Context.Provider>
  );
}
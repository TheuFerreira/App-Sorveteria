import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import LoginPage from '../views/login/login_page';
import RegisterPage from '../views/register/register_page';
import Stack from './stack';
import Theme from './Theme';

const LoginArea = () => {
    return (
        <SafeAreaProvider>
            <NavigationContainer theme={Theme}>
                <Stack.Navigator 
                initialRouteName='Login'
                screenOptions={{
                    headerShown: false,
                }}>
                <Stack.Screen name='Login' component={LoginPage}/>
                <Stack.Screen name='Register' component={RegisterPage}/>
                </Stack.Navigator>
            </NavigationContainer>
        </SafeAreaProvider>
    );
}

export default LoginArea;
import * as React from 'react';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AccountPage from './src/views/account/account_page';
import HomePage from './src/views/home/home_page';
import NotificationsPage from './src/views/notifications/notifications_page';
import CartPage from './src/views/cart/cart_page';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ProductsPage from './src/views/products/products_page';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginPage from './src/views/login/login_page';
import RegisterPage from './src/views/register/register_page';
import Context from './src/services/ContextService';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#FFE6A4'
  }
}

const HomeNavigator = () => {
  return (
    <Stack.Navigator 
      initialRouteName='Initial'
      screenOptions={{
        headerShown: false,
      }}>
        
      <Stack.Screen name='Initial' component={HomePage}/>
      <Stack.Screen name='Products' component={ProductsPage}/>
    </Stack.Navigator>
  );
}

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

const Aplicativo = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer theme={Theme}>
        <Tab.Navigator 
          screenOptions={ ({route}) => ({
            headerShown: false,
            tabBarShowLabel: false,
            tabBarIcon: ({focused, size}) => {
              const icons : Record<string, string> = {
                'Home': 'home',
                'Cart': 'cart',
                'Notifications': 'bell',
                'Profile': 'account' 
              };

              const name = route.name;
              
              return (
                <MaterialCommunityIcons 
                  name={icons[name]} 
                  color={focused ? '#d66b00' : '#ff9934'} 
                  size={size} />
              );
            },
          })}>
          <Tab.Screen name="Home" component={HomeNavigator} />
          <Tab.Screen name='Cart' component={CartPage}/>
          <Tab.Screen name='Notifications' component={NotificationsPage} />
          <Tab.Screen name="Profile" component={AccountPage} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default function App() {

  const [usuario, setUsuario] = React.useState({});

  return (
    <Context.Provider value={[usuario, setUsuario]}>
      { Object.keys(usuario).length === 0 ? <LoginArea/> : <Aplicativo/> }
    </Context.Provider>
  );
}
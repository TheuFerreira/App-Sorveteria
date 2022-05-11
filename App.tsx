import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AccountPage from './src/views/account/account_page';
import HomePage from './src/views/home/home_page';
import NotificationsPage from './src/views/notifications/notifications_page';
import CartPage from './src/views/cart/cart_page';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator 
          screenOptions={ ({route}) => ({
            headerShown: false,
            tabBarShowLabel: false,
            tabBarIcon: ({color, size}) => {
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
                  color={color} 
                  size={size} />
              );
            },
          })}>
          <Tab.Screen name="Home" component={HomePage} />
          <Tab.Screen name='Cart' component={CartPage}/>
          <Tab.Screen name='Notifications' component={NotificationsPage} />
          <Tab.Screen name="Profile" component={AccountPage} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
    
  );
}
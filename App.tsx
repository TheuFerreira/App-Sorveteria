import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AccountPage from './src/views/account/account_page';
import HomePage from './src/views/home/home_page';
import NotificationsPage from './src/views/notifications/notifications_page';
import CartPage from './src/views/cart/cart_page';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomePage} />
        <Tab.Screen name='Carrinho' component={CartPage}/>
        <Tab.Screen name='Notificações' component={NotificationsPage} />
        <Tab.Screen name="Conta" component={AccountPage} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
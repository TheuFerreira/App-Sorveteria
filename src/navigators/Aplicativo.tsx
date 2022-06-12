import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AccountPage from "../views/account/account_page";
import CartPage from "../views/cart/cart_page";
import NotificationsPage from "../views/notifications/notifications_page";
import HomeNavigator from "./HomeNavigator";
import Theme from "./Theme";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

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

  export default Aplicativo;
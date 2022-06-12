import HomePage from "../views/home/home_page";
import ProductsPage from "../views/products/products_page";
import ProductInfoPage from "../views/product_info/product_info_page";
import Stack from "./stack";

const HomeNavigator = () => {
    return (
      <Stack.Navigator 
        initialRouteName='Initial'
        screenOptions={{
          headerShown: false,
        }}>
          
        <Stack.Screen name='Initial' component={HomePage}/>
        <Stack.Screen name='Products' component={ProductsPage}/>
        <Stack.Screen name='ProductInfo' component={ProductInfoPage}/>
      </Stack.Navigator>
    );
}

export default HomeNavigator;
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Ionicons, Fontisto, FontAwesome, FontAwesome5} from '@expo/vector-icons';
import Categories from './Categories';
import Order from './Order';
import Me from './Me';
import Home from './home';

const Tab = createMaterialBottomTabNavigator();

export default function TabRouting() {
  return (
    <Tab.Navigator
        activeColor='#F5AF22'
        inactiveColor='#A9A9B8'
        barStyle={{
            backgroundColor: '#fff',
            height: 80
        }}
    >
      <Tab.Screen name="Home" 
        component={Home}
        options ={{
            tabBarLabel : "Home",
            tabBarIcon : ({color}) => (
                <Ionicons name="md-home" size={24} color = {color} />
            )
        }} 
        />
      <Tab.Screen name="Order" 
        component={Order} 
        options ={{
            tabBarLabel : "Order",
            tabBarIcon : ({color}) => (
                <Fontisto name="shopping-bag-1" size={24} color={color} />            
            )
        }} 
        />
      <Tab.Screen name= "Categories" 
        component={Categories} 
        options ={{
            tabBarLabel : "Active Orders",
            tabBarIcon : ({color}) => (
            <FontAwesome5 name="layer-group" size={24} color= {color} />             
            )
        }} 
        />
      <Tab.Screen name='Me' 
        component={Me} 
        options ={{
            tabBarLabel : "Me",
            tabBarIcon : ({color}) => (
                <FontAwesome name="user" size={24} color={color} />
            )
        }} 
      />
    </Tab.Navigator>
  );
}
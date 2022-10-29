import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler';
import { StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import Signup from './screens/Signup';
import Startup from './screens/startup';
import Login from './screens/login';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabRouting from './screens/tabRouting';
import Restaurant from './screens/Restaurant';
import MealScreen from './screens/MealScreen';
import { Provider } from 'react-redux';
import { store } from './store';
import CartShop from './components/CartShop';
import PreparingOrder from './screens/PreparingOrder';
import OrderDetails from './screens/OrderDetails';
import ActiveOrderDetails from './screens/ActiveOrderDetails';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Provider store ={store}>
        <Stack.Navigator>
          <Stack.Screen
            name = "startup"
            component={Startup}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name = "login"
            component={Login}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name = "signup"
            component={Signup}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name = "tabRouting"
            component={TabRouting}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name = "Restaurant"
            component={Restaurant}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name = "MealScreen"
            component={MealScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name = "CartShop"
            component={CartShop}
            options={{presentation:'modal', headerShown: false}}
          />
          <Stack.Screen
            name = "PreparingOrder"
            component={PreparingOrder}
            options={{presentation:'fullScreenModal', headerShown: false}}
          />
          <Stack.Screen
            name = "OrderDetails"
            component={OrderDetails}
            options={{presentation:'fullScreenModal', headerShown: false}}
          />
          <Stack.Screen
            name = "ActiveOrderDetails"
            component={ActiveOrderDetails}
            options={{presentation:'fullScreenModal', headerShown: false}}
          />
          
        </Stack.Navigator>
      </Provider>
    </NavigationContainer>
    
    // <View style={styles.container}>
    //   <Startup />
    //   <StatusBar style="auto" />
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical:40,
    flex:1,
    backgroundColor: '#290038',
    justifyContent: 'center',
  },
  getstartedButton: {
    backgroundColor: '#F5AF22',
    width:312,
    height:48,
    borderRadius:'14',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10

  },
  loginButton: {
    width:312,
    height:48,
    borderRadius:'14',
    borderStyle: 'solid',
    borderColor: '#F5AF22',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  getstartedTextStyle: {
    fontWeight: '500',
    fontSize: 16,
    fontStyle: 'normal',
    color: '#290038'
  },
  loginTextStyle: {
    fontWeight: '500',
    fontSize: 16,
    fontStyle: 'normal',
    color: '#F5AF22'
  }
});

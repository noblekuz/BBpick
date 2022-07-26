import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler';
import { StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import Signup from './screens/Signup';
import Startup from './screens/startup';
import Login from './screens/login';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name = "Home"
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
      </Stack.Navigator>
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

import React from 'react'
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Startup from '../screens/startup';
import Login from '../screens/login';


const screens = {
    Startup:{
        screen: Startup
    },
    Login: {
        screen: Login
    }
    
    
}
const homestack = createStackNavigator(screens);


export default createAppContainer(homestack)
import React from 'react'
//import PushNotification from "react-native-push-notification";
import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  Touchable,
  Alert
} from 'react-native';
import { Entypo } from '@expo/vector-icons'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUser} from '../feature/UserSlice';
//import { storeUser, getUser } from '../utils';

async function fetchCountriesData() {
    const res = await fetch('https://restcountries.com/v3.1/all?fields=flags,idd,name')
    const data = await res.json()
  
    return data
}

const Login = ({navigation}) => {
 
    const [countries, SetCountries] = useState([])
    const [filteredCountries, SetFilteredCountries] = useState([])
    const [isLoaded, SetIsLoaded] = useState(false)
    const [isDropdownActive, SetIsDropdownActive] = useState(false)
    const [selectedCountry, SetSelectedCountry] = useState({})
    const [searchText, SetSearchText] = useState('')

    const dispatch = useDispatch()


    let initialSelectedCountryName = 'ghana';

/*     const createChannels = () => {
      PushNotification.createChannel(
          {
              channelId: "test-channel",
              channelName: "Test Channel",
          } 
      )
  } */
  const handleNotification=()=>{

/*     PushNotification.localNotification({
      channelId: "test-channel",
      title:'Fuck You',

    }) */
  }
useEffect(()=>{
  //createChannels();
})

  // ! Add useClickOutside
    function toggleDropdown(force) {
      if (force == null) SetIsDropdownActive((v) => !v)
      else SetIsDropdownActive(force)
      SetSearchText('')
    }

    function find(text, expression) {
      return expression.toLowerCase().includes(text.toLowerCase())
    }

    useEffect(() => {
        async function tempFunc() {
        const data = await fetchCountriesData()
        const mappedData = data?.map(country => {
            return {
            flag: country.flags.png,
            name: country.name.common,
            codes: country.idd.suffixes?.map(
                suffix => `${country.idd.root}${suffix}`
            ) ?? [country.idd.root],
            }
        })

      SetCountries(mappedData)

      SetIsLoaded(true)
    }

    tempFunc()
  }, [])

  useEffect(() => {
    SetSelectedCountry(countries.filter(country => {
      return find(initialSelectedCountryName, country.name)
    })[0])
    SetFilteredCountries(countries)
  }, [countries])

  useEffect(() => {
    SetFilteredCountries(countries.filter(country => {
      return find(searchText, country.name)
    }))
  }, [searchText])

  useEffect(() => {
    //console.log(filteredCountries?.length)
  }, [filteredCountries])

  let head = {
    headers:{
        'Content-Type': 'application/json',
        'X-Parse-Application-Id': 'jUTET8D4ZARJa3QeLmu9P1wn6PCYtDiphlg1cQ7t',
        'X-Parse-REST-API-Key': 'BftEOnyYCXwBn81sycpKcTw03xxJ8nkVA362b9Om'
                }
        }
  //Signup function.... Cloud
  const loginNow = async() =>{
            
            let payload = { email: email, pss: password};
            
             await axios.post(`https://parseapi.back4app.com/functions/login`, payload, head )
                .then(async function(response) {

                  //console.log(response.data.result)

                  if(response.data.result.resCode===143){
                    // response.data.result  output of logged in user can be saved in local storage and accessed throuout the app
                    //const {email, firstname, lastname, phone, nickname, username} = response.data.result
                    //console.log(response.data.result)
                    let accDet = response.data.result.accDet
                    let user = response.data.result.user
                    let mySettings = response.data.result.mySettings
              
                    dispatch(setUser({user, mySettings, accDet}))
                    //dispatch(setRestaurant({details, meal}))
                   
                    //await storeUser(response.data.result)
                    navigation.navigate('tabRouting')
                  }else{

                  }

                }).catch(function(error){
                    
                    
                    console.log('error ' + error.response.request._response);
                    const {error: errorMsg} = JSON.parse(error.response.request._response)

                    Alert.alert("Login unsuccessful", errorMsg)
                });
    
}


  
  let [email, setEmail] = useState("")
 function emailInputHandler(input){
  setEmail(input);
  }

  let [password, setPassword] = useState("")
 function passInputHandler(input){
  setPassword(input);
  }
  

  
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.bigText}>Login</Text>
          <Text style={styles.normalText}>Ready to run with the team</Text>
  
        </View>
  
        <View style={styles.form}>
          

  
          <View style={{ marginTop: 10 }}>
            <Text style={styles.label}>Email Address</Text>
            <TextInput style={styles.input} value={email} onChangeText={emailInputHandler} placeholder="Enter email address" keyboardType='email-address' />
          </View>
          <View style={{ marginTop: 10 }}>
            <Text style={styles.label}>Password</Text>
            <TextInput style={styles.input} value={password} onChangeText={passInputHandler} placeholder="Enter Password" secureTextEntry={true} />
          </View>
        
          
  
          <View style={{flex:1, top: 50 }}>
            <TouchableOpacity style={styles.button} onPress={loginNow}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <View style={{flexDirection: 'row', justifyContent:'center', alignContent: 'flex-end', marginTop: 20}}>
              <Text style={styles.bottomText}>New here? </Text>
              <TouchableOpacity onPress={()=> navigation.navigate("signup")}>
                <Text style={{...styles.bottomText, color:'#0af', fontSize: 18, marginLeft: 5}}>Sign up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
  
        <StatusBar style="auto" />
      </View>
)}


export default Login
const styles = StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      paddingTop: 30,
    //   paddingVertical:40,
    //   paddingHorizontal:20,
    //   flex:1,
    //   backgroundColor: 'white',
    //   alignItems: 'center',
    //   justifyContent: 'center',
    },
  
    header: {
      alignItems: 'center',
      paddingVertical: 20,
      flex: 0
    },
  
    bigText: {
      fontSize: 24,
      fontWeight: 'bold'
    },
  
    normalText: {
      fontSize: 16,
    },
  
    twoColumn: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
  
    form: {
      paddingHorizontal: 20,
      flex: 3
    },
  
    label: {
      fontSize: 14,
      fontWeight: 'bold',
      color: '#666'
    },
  
    input: {
      backgroundColor: '#0002',
      borderRadius: 8,
      fontSize: 16,
      paddingVertical: 10,
      paddingHorizontal: 15,
      width: '100%',
    },
  
    rawInput: {
      fontSize: 16,
      paddingVertical: 10,
      paddingRight: 15,
      width: '100%',
    },
  
    phoneInput: {
      backgroundColor: '#0002',
      borderRadius: 8,
      flexDirection: 'row',
      alignItems: 'center'
    },
  
    countryImage: {
      width: 30,
      height: 18,
      marginLeft: 10,
      borderRadius: 7,
      overflow: 'hidden',
    },
  
    dropdownContainer: {
      position: 'absolute',
      top: 120,
      left: 30,
      zIndex: 10,
      padding: 20,
      paddingBottom: 5,
      borderRadius: 10,
      backgroundColor: '#f4f4f4',
      borderColor: '#000',
      borderWidth: 1,
      // Box shadow
      // elevation: 1,
      // shadowColor: '#000a',
      // shadowRadius: 2,
    },
  
    dropdownListItem: {
      flexDirection: 'row',
      paddingHorizontal: 5,
      paddingVertical: 10,
    },
  
    fave: {
      
      backgroundColor: '#e0c736',
      borderRadius: 25,
      top: 300,
      paddingStart: 1,
      textAlign: 'center',
      fontWeight: 'bold'
    },
    button: {
      backgroundColor: '#e0c736',
      padding: 15,
      borderWidth: 2,
      borderRadius: 10,
    },
    buttonText:{
      fontSize: 18,
      textAlign: 'center',
      color: '#333',
      fontWeight: 'bold',
    },
    bottomText: {
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    
  });
  

  
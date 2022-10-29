import React, {useState} from 'react'
import {StyleSheet, 
        View, 
        Text, 
        Modal, 
        TouchableOpacity, 
        TextInput, 
        KeyboardAvoidingView, 
        TouchableWithoutFeedback,
        Keyboard
        } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import CallCountries from '../components/callCountries';
import axios from 'axios';


const Login = ({navigation}) => {
  const [isVisible, setisVisible] = useState(false)
  const [email, setEmail]= useState('')
  const [password, setPassword]= useState('')

  const modalVisibility = (bool) => {
    setisVisible(bool)
  }
  const login=() =>{
    axios.defaults.headers['X-Parse-REST-API-Key']='BftEOnyYCXwBn81sycpKcTw03xxJ8nkVA362b9Om'
    
    axios.post('https://parseapi.back4app.com/functions/login', { email:email,
      pss:password })
      .then(response => {setApiResponds(response.data),
        navigation.navigate('tabRouting')}
      
      ).catch(function (error) {
        console.log(error);
      });

  }

 
  return (
    <KeyboardAvoidingView  
    behavior={Platform.OS === "ios" ? "padding" : "height"} 
    style={{flex:1}}
    >

    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={styles.container}>
      <View style={{alignItems: 'center', flexDirection:'row', width:"95%",}}>
        <TouchableOpacity onPress={()=>navigation.pop(1)} style={{ marginRight:30,alignItems:'center' }}>
        <AntDesign name="arrowleft" size={30} color='#F5AF22' />
        </TouchableOpacity>
        <View>
          <Text style={{fontSize: 25}}>Log in to your account</Text> 
        </View>
      </View>
    
      <View style={{flex:1, justifyContent: 'space-between', width:'95%'}}>
        <View style={{marginTop:100}}>
          <View style={{ marginTop: 10 }}>
            <Text style={styles.label}>Email Address</Text>
              <TextInput 
                  style={styles.input} 
                  placeholder="Enter email address" 
                  keyboardType='email-address'
                  value = {email} 
                  onChangeText={newText => setEmail(newText)}
              />
          </View>
          <View style={{ marginTop: 10 }}>
            <Text style={styles.label}>Password</Text>
              <TextInput 
                  style={styles.input} 
                  placeholder="Enter password" 
                  secureTextEntry={true}
                  value = {password} 
                  onChangeText={newText => setPassword(newText)}
              />
          </View>
          

          <View style={{marginTop: 80}}>
            <Text style={{fontWeight:'bold'}}>Don't have an account ? SignUp</Text>
          </View>
        </View>
        
          
        <View>
          <TouchableOpacity 
            style={styles.logIn}
            // onPress={login}
            onPress={()=>navigation.navigate("tabRouting") }
          >
            <Text>Log In</Text>
          </TouchableOpacity>
        </View>
      
      </View>
      
      
    </View>
    </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

export default Login
const styles = StyleSheet.create({
  container: {
    height: '100%',
    paddingVertical: 50,
    paddingHorizontal: 20,
    flex:1,
    backgroundColor: 'white',
    alignItems: 'flex-start',
    justifyContent: 'center',
    alignSelf:'center',
    width:'100%'
  
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
  numberInput: {
    padding:5,
    position:'absolute',
    width: '100%',
    height: 48,
    marginTop: 25,
    borderRadius:8,
    borderStyle: 'solid',
    borderColor: '#F5AF22',
    borderWidth: 1,
  },
  textEditor: {
    color: '#757585',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 12,
  
    
  },
  logIn: {
    backgroundColor: '#F5AF22',
    width:"100%",
    height:48,
    borderRadius:14,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },

  continueText: {
    fontWeight: '500',
    fontSize: 16,
    fontStyle: 'normal',
    color: '#290038'
  }

})
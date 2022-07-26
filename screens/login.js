import React, {useState} from 'react'
import {
  StyleSheet, 
  View, 
  Text, 
  Modal,
       } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import Home from './components/home';

const Login = ({navigation}) => {
  const [isVisible, setisVisible] = useState(false)

  const modalVisibility = (bool) => {
    setisVisible(bool)
  }

  const [countries, SetCountries] = useState (
    {name: 'Ghana', key:'1'},
    {name: 'Togo', key:'2'},
    {name: 'Canada', key:'3'},
    {name: 'China', key:'4'},
    {name: 'Germany', key:'5'},
    {name: 'England', key:'6'},
    {name: 'USA', key:'7'}
  )
  return (
    <View style={styles.container}>
      <View style={{alignItems: 'center', flexDirection:'row' }}>
        <TouchableOpacity onPress={()=>navigation.pop(1)} style={{ marginRight:30,alignItems:'center' }}>
        <AntDesign name="arrowleft" size={30} color='#F5AF22' />
        </TouchableOpacity>
        <View>
          <Text style={{fontSize: 25}}>Enter your number</Text>
        </View>
      </View>
    
      <View style={{flex:1, justifyContent: 'space-between'}}>
        <View style={{marginTop:100}}>
          <View>
            <Text style={styles.textEditor}>Phone Number</Text>
          </View>
        
          <View style={styles.numberInput}>
            <TouchableOpacity onPress={()=> modalVisibility(true)} style={{flexDirection: 'row'}}>
              <Text>Country</Text>
              <AntDesign name="down" size={24} color='#F5AF22' />
            </TouchableOpacity>
            <Modal
              animationType='none'
              transparent= {true}
              visible= {isVisible}
              onRequestClose = {()=> {modalVisibility(false)}}
            >
                <Home countries={countries}/>
    
            </Modal>
          </View>
          <View style={{marginTop: 80}}>
            <Text >We will send you an SMS code to verify your number</Text>
          </View>
        </View>
        
          
        <View>
          <TouchableOpacity style={styles.continueButton}>
            <Text>Continue</Text>
          </TouchableOpacity>
        </View>
      
      </View>
      
      
    </View>
  )
}

export default Login
const styles = StyleSheet.create({
  container: {
    height: '100%',
    paddingVertical: 50,
    paddingHorizontal: 24,
    flex:1,
    backgroundColor: 'white',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  numberInput: {
    padding:5,
    position:'absolute',
    width: '100%',
    height: 48,
    marginTop: 14,
    borderRadius:'8',
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
  continueButton: {
    backgroundColor: '#F5AF22',
    width:370,
    height:48,
    borderRadius:'14',
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
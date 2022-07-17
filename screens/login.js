import React from 'react'
import { StyleSheet, View, Text } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const Login = () => {
  return (
    <View style={styles.container}>
      <View style={{alignItems: 'center', flexDirection:'row' }}>
        <View style={{ marginRight:30 }}>
        <AntDesign name="arrowleft" size={30} color='#F5AF22' />
        </View>
        <View>
          <Text style={{fontSize: 25}}>Enter your number</Text>
        </View>
      </View>

      <View style={{marginTop:100}}>
        <Text style={styles.textEditor}>Phone Number</Text>
        <View style={styles.numberInput}>

        </View>
      </View>
      <View style={{marginTop: 50,justifyContent: 'center'}}>
        <Text>We will send you an SMS code to verify your number</Text>
      </View>

    </View>
  )
}

export default Login
const styles = StyleSheet.create({
  container: {
    paddingVertical: 50,
    paddingHorizontal: 24,
    flex:1,
    backgroundColor: 'white',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  numberInput: {
    width:380,
    height:48,
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
    
  }

})
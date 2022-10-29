import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native'
import React from 'react'

const Order = () => {
  return (
    <View style={styles.container}>
      <View style={styles.orderDisplay}><Text>Order Display</Text></View>
      <View style={styles.orderList}>
        <Text style={styles.headText}>Connecting you to a student dispatcher</Text>
        <Text style={styles.headText1}>
          The dispatcher will get you your items when he gets accepts the request 
        </Text>
        <View style = {{marginTop:40}}>
          <ActivityIndicator size='large' />
        </View>
        <TouchableOpacity style={{alignItems:'center',marginTop:10,padding:10,backgroundColor:'#acacac',borderRadius:30}}>
          <View><Text>Cancel Order</Text></View>
        </TouchableOpacity>
      </View>

    </View>
  )
}

export default Order
const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#290038',
    paddingTop: 30
    
    
  },
  orderDisplay:{
    backgroundColor: '#290038',
    flex:1,
    padding:10

  },
  orderList:{
   // backgroundColor:'#F5AF22',
   backgroundColor:'white',
    flex:1,
    padding:20,
    borderTopLeftRadius:30,
    borderTopRightRadius:30,
    alignItems: 'center'


  },
  headText:{
    fontWeight:'bold',
    fontSize:24,
  },
  headText1:{
    marginTop:8,
    fontWeight:'200',
    fontSize:18,
  }
  
})
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'




const OrderComp = () => {
 
  
  return (
    <TouchableOpacity style={styles.contain} 
        onPress
    >
      <Text>
        here is a list of orders with prices from backend
      </Text>
    </TouchableOpacity>
  )
}

export default OrderComp

const styles = StyleSheet.create({
    contain:{
        marginTop: 10,
        borderColor:'#F5AF22',
        borderWidth:1,
        padding:20,
        zIndex:5

    }
})
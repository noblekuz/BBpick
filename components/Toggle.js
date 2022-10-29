import { View,StyleSheet, Text, TouchableOpacity, Image, ScrollView } from 'react-native'
import React from 'react';
import { useNavigation } from '@react-navigation/native'

const Toggle = ({value, press}) => {
  
  return (
    
        <TouchableOpacity onPress={press} style={{width:70, height:40, backgroundColor:"#fff",
          borderRadius:20,
          borderWidth:3,
          borderColor:"#262626",
          justifyContent:"center",
          alignContent:"center"}}>

            
            {value===true?
            <View style={{width:34, height:34, backgroundColor:"#07db1f",
              borderRadius:17,
              borderWidth:1,
              alignSelf:"flex-end",
              borderColor:"#fff"}}>

            </View>
          :
          <View style={{width:34, height:34, backgroundColor:"#2E2E2E",
            borderRadius:17,
            borderWidth:1,
            borderColor:"#fff"}}>

          </View>
          
          }
            
            

        </TouchableOpacity>
      
  
  )
}

export default Toggle

const styles = StyleSheet.create({
    container : {
        borderColor : '#fff',
        borderWidth : 1,
        borderStyle: 'dashed',
        width: 150,
        height: 150,
        borderRadius: 30,
        marginRight: 2,
        backgroundColor: 'yellow',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imgStyle : {
        height : 20,
        width : 20,
        borderRadius: 10,

    },
    textStyle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white'
    }
})
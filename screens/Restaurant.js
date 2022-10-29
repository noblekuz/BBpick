import { View, Text, SafeAreaView, StyleSheet, ScrollView } from 'react-native'
import React, {useState} from 'react'
import Searches from '../components/Searches'
import RestaurantCard from '../components/RestaurantCard'
import Categorycard from '../components/Categorycard'
import { useRoute } from '@react-navigation/native'
import { FlatList } from 'react-native-web'


const Restaurant = () => {
    const {params:{details, name} }= useRoute();
        
  return (
    <View style= {{marginTop:50 }}>
        
        <View style={{marginVertical:10,justifyContent: 'center',alignItems:'center'}}>
            <Text style={{fontSize:30,fontWeight:'900',color:'#290038'}}>{name}</Text>
            <Searches  />
        </View>
        
        <ScrollView>
            {details.map((detail)=>(
                <RestaurantCard  details={detail}  meal= {detail.meal}/>  
                
                ))}
                
        </ScrollView>
        {/* <View>
            <FlatList
              data={details}
              renderItem ={({item: detail})=>(
                  <RestaurantCard  details={detail}  meal= {detail.meal}/>  
              )}
            />
        </View> */}
        
        
    </View>
  )
}

export default Restaurant

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width:"100%",
        marginTop:60,
        marginHorizontal: 20
    }
})
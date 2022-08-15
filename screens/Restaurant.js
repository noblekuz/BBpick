import { View, Text, SafeAreaView, StyleSheet, ScrollView } from 'react-native'
import React, {useState} from 'react'
import Searches from '../components/Searches'
import RestaurantCard from '../components/RestaurantCard'
import Categorycard from '../components/Categorycard'
import { useRoute } from '@react-navigation/native'


const Restaurant = () => {
    const {params:{details, name} }= useRoute();
    // const[data, setData] = useState([
    //     {
    //         name: 'Pizzaman',
    //         image : require('../assets/goodsImage/chickenman.png'),
    //         rating: '4',
    //         location: 'KNUST-Mango Road'
    //     },
    //      {
    //         name: 'Kingdom Books',
    //         image : require('../assets/goodsImage/bookshop.png'),
    //         rating: '4',
    //         location: 'Commercial Area'
    //     },
    //     {
    //         name: 'Asew Koko',
    //         image : require('../assets/goodsImage/koko.png'),
    //         rating: '4',
    //         locaton: 'Continental Supermarket'
    //     },
    //     {
    //         name: 'Pice Pzza',
    //         image : require('../assets/goodsImage/pice.png'),
    //         rating: '4',
    //         location: 'Ayeduase Road'
    //     },
    //      { 
    //         name: 'Attaa Gobe',
    //         image : require('../assets/goodsImage/beans.png'),
    //         rating: '4',
    //         location: 'Nana Adoma Hostel'
         
    //         }
    // ])
        
  return (
    <SafeAreaView style= {styles.container}>
        <Searches  />
        <View style={{marginTop:10,justifyContent: 'center',alignItems:'center'}}>
            <Text style={{fontSize:30,fontWeight:'900',color:'#290038'}}>{name} </Text>
        </View>
        <RestaurantCard  details={details}/>
    </SafeAreaView>
  )
}

export default Restaurant

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10
    }
})
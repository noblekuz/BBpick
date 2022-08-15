import { View, Text, Image,FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react';
import { Entypo, EvilIcons } from '@expo/vector-icons';

const RestaurantCard = ({details}) => {
  return (
    <FlatList 
        data = {details}
        renderItem = {({item}) => (
        <TouchableOpacity style={styles.contain} >
            <View style={{width: 300,backgroundColor: '#fff',paddingBottom:20}}>
                <Image
                    style = {styles.imgStyle}
                    source = {item.image}
                />
                <View style={{flexDirection:'row',marginTop: 5,justifyContent: 'space-between', alignItems: 'center'}}>
                    <View>
                        <Text style={{fontSize:24, fontWeight: 'bold'}}>{item.title}</Text>
                    </View>
                    <View style={{flexDirection:'row',alignItems: 'center'}}>
                        <Entypo name="star" size={15} color="#757585" />
                        <Text style={{marginHorizontal:5}}>{item.rating}</Text>
                    </View>
                </View>
                <View style={{marginTop:5,flexDirection:'row'}}>
                    <EvilIcons name="location" size={18} color="#757585" />
                    <Text style={{marginLeft:5, fontWeight: '300'}}>Nearby {item.location}</Text>
                </View>
            </View>
                
        </TouchableOpacity>
        )}
    />
   
  )
}

export default RestaurantCard
const styles = StyleSheet.create({
    contain:{
        marginTop:20,
        paddingLeft: 20,
    },
    imgStyle : {
        height: 140,
        width: 300,
        resizeMode: 'cover',
    }
})
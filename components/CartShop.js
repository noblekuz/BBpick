import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selecteRestaurant } from '../feature/RestaurantSlice'
import { selectedBasketItem, selectedBasketTotal } from '../feature/basketSlice'
import { Entypo, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'

const CartShop = () => {
    const restaurant = useSelector(selecteRestaurant);
    const items = useSelector(selectedBasketItem);
    const dispatch = useDispatch();
    const [groupedItemsInCart, setGroupedItemsInCart] = useState([]);
    const cartTotal = useSelector(selectedBasketTotal)
    const navigation = useNavigation()


    useEffect(() =>{
        const groupedItems = items.reduce((results, item)=>{
            (results[item.id] = results[item.id] || []).push(item);
            return results;
        }, {});

        setGroupedItemsInCart(groupedItems)
    },[items])


    return (
    <SafeAreaView style={{flex:1,backgroundColor:'#ededed'}}>
        <View style={{flexDirection:'row',marginBottom:20,backgroundColor:'#fff',padding:15,justifyContent:'space-between',borderBottomWidth:1,borderBottomColor:'#F5AF22'}}>
            <View>
                <Entypo name="shopping-cart" size={24} color='#F5AF22' />
            </View>
            <Text style={{fontSize:24,fontWeight:'bold'}}>CartShop</Text> 
            <TouchableOpacity 
                style={{alignItems:'flex-end'}}
                onPress ={navigation.goBack}
            >
                <MaterialIcons name="cancel" size={24} color='#F5AF22' />
            </TouchableOpacity>
        </View>
        <ScrollView >
            {Object.entries(groupedItemsInCart).map(([key, items])=>(
                <View style={{flex:1,flexDirection:'row',justifyContent:'space-between',padding:15,backgroundColor:'#fff'}} key={key}>
                    <View style={{flexDirection:'row'}}>
                        <Text style={{marginRight:8, fontSize:20, color:'#290038'}}>{items.length} x</Text>
                        <Text style={{fontSize:20}}>{items[0]?.dish}</Text>
                    </View>
                    <Text style={{fontSize:20}}>{items[0]?.price}</Text>
                </View>
            ))}
        </ScrollView>

        <View style={{backgroundColor:"#fff",padding:15}}>
            <View style={{justifyContent:'space-between',flexDirection:'row',padding:8}}>
                <Text>Order Total</Text>
                <Text>{cartTotal}</Text>
            </View>
            <View style={{justifyContent:'space-between',flexDirection:'row',padding:8}}>
                <Text>Delivery Fee</Text>
                <Text>2</Text>
            </View>
            <View style={{justifyContent:'space-between',flexDirection:'row',padding:8}}>
                <Text>Order total</Text>
                <Text>{cartTotal + 2}</Text>
            </View>
            <TouchableOpacity  onPress={()=>navigation.navigate('PreparingOrder')} style={{backgroundColor:'#F5AF22',padding:15,borderRadius:30}}  >
                <Text style={{fontSize:20, textAlign:'center'}}>Place Your Order</Text>
            </TouchableOpacity>
        </View>

      
    </SafeAreaView>
  )
}

export default CartShop

const styles = StyleSheet.create({


})
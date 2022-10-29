import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, TextInput, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selecteRestaurant } from '../feature/RestaurantSlice'
import { selectedBasketItem, selectedBasketTotal } from '../feature/basketSlice';
import { theUser } from '../feature/UserSlice';
import { Entypo, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
//import { storeUser, getUser } from '../utils';

const CartShop = () => {
    const restaurant = useSelector(selecteRestaurant);
    const items = useSelector(selectedBasketItem);
    const dispatch = useDispatch();
    const [groupedItemsInCart, setGroupedItemsInCart] = useState([]);
    const cartTotal = useSelector(selectedBasketTotal)
    const navigation = useNavigation()

    let loggedUser = useSelector(theUser);

    let head = {
        headers:{
            'Content-Type': 'application/json',
            'X-Parse-Application-Id': 'jUTET8D4ZARJa3QeLmu9P1wn6PCYtDiphlg1cQ7t',
            'X-Parse-REST-API-Key': 'BftEOnyYCXwBn81sycpKcTw03xxJ8nkVA362b9Om'
                    }
            }


    useEffect(() =>{
        const groupedItems = items.reduce((results, item)=>{
            (results[item.id] = results[item.id] || []).push(item);
            return results;
        }, {});

        setGroupedItemsInCart(groupedItems)
    },[items])

    //console.log(":::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::")
    //console.log(loggedUser.loggedInUser.accDet.custom_gps)

    const placeOrder =async() =>{

        
        
            let payload = { 
                gps:{lat:!loggedUser.loggedInUser.accDet.custom_gps?loggedUser.loggedInUser.accDet.coordinates.latitude: loggedUser.loggedInUser.accDet.custom_gps.lat, 
                    long:!loggedUser.loggedInUser.accDet.custom_gps?loggedUser.loggedInUser.accDet.coordinates.longitude:loggedUser.loggedInUser.accDet.custom_gps.long},
                receiverDetails:{
                    name:loggedUser.loggedInUser.user.firstname+" "+ loggedUser.loggedInUser.user.lastname,
                    id:loggedUser.loggedInUser.user.uniqueAccNo,
                    phone:loggedUser.loggedInUser.user.phone,
                    ghanaPostAddress:loggedUser.loggedInUser.accDet.ghanaPostAddress,
                    HostelName:loggedUser.loggedInUser.accDet.hostelName,
                    RoomNumber:loggedUser.loggedInUser.accDet.roomNo
                },
                disc:"Shopping from "+ restaurant.details.title,
                amount: cartTotal.toFixed(2),
                bonus: (cartTotal/15).toFixed(2),
                title: restaurant.meal[0].dish+"..",
                creatorID: loggedUser.loggedInUser.user.uniqueAccNo,
                myDet: {id:loggedUser.loggedInUser.user.uniqueAccNo, objID: loggedUser.loggedInUser.accDet.objectId},
             };

             Alert.alert("Busy","Posting Order...",[
                { text: "OK", onPress: navigation.goBack }
              ]
            );
                
             await axios.post(`https://parseapi.back4app.com/functions/placeOrder`, payload, head )
            .then(function(response) {
    
                //console.log(response.data.result)

                Alert.alert("Success","Your Order has successfully been posted online",[
                    { text: "OK", onPress: navigation.goBack }
                  ]
                );
                   
            }).catch(function(error){
                //setBusy(false)  
                    
                Alert.alert('error ' + error.response.request._response);
                return []
    
            });
     
    }


    return (
    <SafeAreaView style={{flex:1,backgroundColor:'#ededed'}}>
        <View style={{flexDirection:'row',marginBottom:20, marginTop:50, backgroundColor:'#fff',padding:15,justifyContent:'space-between',borderBottomWidth:1,borderBottomColor:'#F5AF22'}}>
            <View>
                <Entypo name="shopping-cart" size={24} color='#F5AF22' />
            </View>
            <Text style={{fontSize:24,fontWeight:'bold'}}>Cart</Text> 
            <TouchableOpacity 
                style={{alignItems:'flex-end'}}
                onPress ={navigation.goBack}
            >
                <MaterialIcons name="cancel" size={24} color='#F5AF22' />
            </TouchableOpacity>
        </View>
        <ScrollView style={{marginHorizontal:5}}>
            {Object.entries(groupedItemsInCart).map(([key, items])=>(
                <View style={{flex:1,flexDirection:'row', borderBottomColor:'#C6C6C6', borderBottomWidth:1, justifyContent:'space-between',padding:15,backgroundColor:'#fff'}} key={key}>
                    <View style={{flexDirection:'row'}}>
                        <Text style={{marginRight:8, fontSize:16, color:'#290038'}}>{items.length}x</Text>
                        <Text style={{fontSize:16}}>{items[0]?.dish}</Text>
                    </View>
                    <Text style={{fontSize:20}}>{items[0]?.price}</Text>
                </View>
            ))}
        </ScrollView>

        <View style={{backgroundColor:"#fff",padding:15, borderTopColor:'#5F5F5F', borderTopWidth:3,}}>
            <View style={{justifyContent:'space-between',flexDirection:'row',padding:8}}>
                <Text>Order Total</Text>
                <Text>{cartTotal}</Text>
            </View>
            <View style={{justifyContent:'space-between',flexDirection:'row',padding:8}}>
                <Text>Delivery Fee</Text>
                <Text>{(cartTotal/15).toFixed(2)}</Text>
            </View>
            <View style={{justifyContent:'space-between',flexDirection:'row',padding:8, marginBottom:10}}>
                <Text style={{fontSize:16, fontWeight:"900", color:"#0090D7"}}>Order total</Text>
                <Text style={{fontSize:16, fontWeight:"900", color:"#0090D7"}}>{(cartTotal + (cartTotal/15)).toFixed(2)}</Text>
            </View>
            <TouchableOpacity  onPress={placeOrder} style={{backgroundColor:'#F5AF22',padding:15,borderRadius:30}}  >
                <Text style={{fontSize:20, textAlign:'center'}}>Place Your Order</Text>
            </TouchableOpacity>
        </View>

      
    </SafeAreaView>
  )
}

export default CartShop

const styles = StyleSheet.create({


})
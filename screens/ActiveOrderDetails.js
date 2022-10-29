import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, TextInput, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selecteRestaurant } from '../feature/RestaurantSlice'
import { selectedBasketItem, selectedBasketTotal } from '../feature/basketSlice'
import { Entypo, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { theUser } from '../feature/UserSlice';
import axios from 'axios';



let  head = {
    headers:{
        'Content-Type': 'application/json',
        'X-Parse-Application-Id': 'jUTET8D4ZARJa3QeLmu9P1wn6PCYtDiphlg1cQ7t',
        'X-Parse-REST-API-Key': 'BftEOnyYCXwBn81sycpKcTw03xxJ8nkVA362b9Om'
                }
        }


const CartShop = (item) => {
    const restaurant = useSelector(selecteRestaurant);
    const items = useSelector(selectedBasketItem);
    const dispatch = useDispatch();
    const [groupedItemsInCart, setGroupedItemsInCart] = useState([]);
    const cartTotal = useSelector(selectedBasketTotal)
    const navigation = useNavigation()
    let loggedUser = useSelector(theUser);


    useEffect(() =>{
        const groupedItems = items.reduce((results, item)=>{
            (results[item.id] = results[item.id] || []).push(item);
            return results;
        }, {});

        setGroupedItemsInCart(groupedItems)
    },[items])

    let selectedItem = item.route.params.item

    //console.log("::::::::::::::::::::::::::::::::::::::::::::::::::::::::::")
    //console.log(selectedItem.dispatcher.userNum)




    const receivedItem =async(object)=>{
       
        let payload = { 
            object: object
         };



         Alert.alert(
           "Receipt Confirmation",
           "Have you received your order " + selectedItem.title+ " as expected",
           [
             {
               text: "No",
               onPress: () => console.log(""),
               style: "cancel"
             },
             { text: "Yes", onPress: () => receivedOrder(payload) }
           ]
         );

        const receivedOrder = async(payload)=>{

            await axios.post(`https://parseapi.back4app.com/functions/confirmOrderReceipt`, payload, head )
                .then(function(response) {

                    if(response.data.result.length===100){
                            
                            //return response.data.result

                            Alert.alert("Success","Make sure dispatcher confirms money receipt to close this deal",[
                                { text: "OK", onPress: navigation.goBack() }
                              ]
                            );
                            
                            

                    }else{
                            //setBusy(false) 
                    }

            

                }).catch(function(error){
                    //setBusy(false)        
                    Alert.alert('error ' + error.response.request._response);
                    return []

                });

        } }

    const receivedPayment =async(object)=>{
       
        let payload = { 
            object: object
         };



         Alert.alert(
           "Receipt Confirmation",
           "Have you received payment for this order " + selectedItem.title+ ", as expected",
           [
             {
               text: "No",
               onPress: () => console.log(""),
               style: "cancel"
             },
             { text: "Yes", onPress: () => receivedPayment(payload) }
           ]
         );

        const receivedPayment = async(payload)=>{

            await axios.post(`https://parseapi.back4app.com/functions/confirmPaymentReceipt`, payload, head )
                .then(function(response) {

                    if(response.data.result.length===100){
                            
                            //return response.data.result

                            Alert.alert("Success","Make sure the receiver confirms order receipt to close this deal",[
                                { text: "OK", onPress: navigation.goBack() }
                              ]
                            );
                            
                            

                    }else{
                            //setBusy(false) 
                    }

            

                }).catch(function(error){
                    //setBusy(false)        
                    Alert.alert('error ' + error.response.request._response);
                    return []

                });

        } }


    return (
    <SafeAreaView style={{flex:1,backgroundColor:'#ededed'}}>
        <View style={{flexDirection:'row', marginTop:50, marginBottom:20,backgroundColor:'#fff',padding:15,justifyContent:'space-between',borderBottomWidth:1,borderBottomColor:'#F5AF22'}}>
            <View>
                <Entypo name="clock" size={24} color='#F5AF22' />
            </View>
            <Text style={{fontSize:18,fontWeight:'bold'}}>{selectedItem.title}</Text> 
            <TouchableOpacity 
                style={{alignItems:'flex-end'}}
                onPress ={navigation.goBack}
            >
                <MaterialIcons name="cancel" size={24} color='#F5AF22' />
            </TouchableOpacity>
        </View>
        <ScrollView style={{alignContent:"center"}}>
            <View style={{alignSelf:"center", width:"100%", justifyContent:"center", alignContent:"center", justifyContent:"center"}}>
                <View style={{width:"90%", backgroundColor:"#fff", padding:10}}>
                    <View style={{width:"100%", backgroundColor:"#2F2F2F", padding: 5}}>

         
                    </View>
                    <Text style={{fontSize:16, fontWeight:'500'}}>Order: {selectedItem.title}</Text>
                    <Text style={{fontSize:16, fontWeight:'500'}}>{selectedItem.disc}</Text>
                    <Text style={{fontSize:16, fontWeight:'500'}}>Sales Point: {selectedItem.title}</Text>
                    <Text style={{fontSize:16, fontWeight:'500'}}>Receiver Name: Details</Text>
                    <Text style={{fontSize:16, fontWeight:'500'}}>Receiver Name: {selectedItem.creator.rating}</Text>
                    <Text style={{fontSize:16, fontWeight:'500'}}>Receiver Name: {selectedItem.amount}</Text>
                    <Text style={{fontSize:16, fontWeight:'500'}}>Receiver Name: {selectedItem.bonus}</Text>
                    <Text style={{fontSize:16, fontWeight:'500'}}>All other details will be visible when the "no name" makes a deal with you. Go to Active Orders </Text>
                    

                </View>

            </View>
            
        </ScrollView>

        <View style={{backgroundColor:"#fff", padding:15}}>
            
            <View style={{marginTop:8, justifyContent:'space-around'}}>
            {loggedUser.loggedInUser.accDet.userNum===selectedItem.creator.userNum?
            
                <TouchableOpacity 
                onPress={()=>receivedItem(selectedItem)} 
                style={{backgroundColor:'#2a60b8',
                padding:15,borderRadius:10, marginVertical:5}}  
                >
                <Text style={{fontSize:20, textAlign:'center', color:"#fff"}}>I have received order</Text>
                </TouchableOpacity>
            :
            loggedUser.loggedInUser.accDet.userNum===selectedItem.dispatcher.userNum?
                <TouchableOpacity 
                onPress={()=>receivedPayment(selectedItem)} 
                style={{backgroundColor:'#32944c',
                padding:15,borderRadius:10, marginVertical:5}}  
                >
                <Text style={{fontSize:20, textAlign:'center', color:"#fff"}}>I have received payment</Text>
                </TouchableOpacity>
            :
                <View></View>
            }

                            
            </View>

        </View>

      
    </SafeAreaView>
  )
}

export default CartShop

const styles = StyleSheet.create({


})
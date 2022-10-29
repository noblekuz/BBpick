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

    console.log("::::::::::::::::::::::::::::::::::::::::::::::::::::::::::")
    console.log(selectedItem.dispatcherDet)

    
    const approveDeal =()=>{

        let payload = { 
            object: selectedItem,
            scanParam:1500,
            lat:6.673014595380605, 
            long:-1.5655754454970323,
            creator:loggedUser.loggedInUser,
            receiverDetails:selectedItem.receiverDetails,
            dispatcher:selectedItem.dispatcherDet,
         };


         Alert.alert(
            "Action Confirmation",
            "Are you sure you want to approve deal with "+ selectedItem.dispatcherDet.firstname,
            [
              {
                text: "Cancel",
                onPress: () => {},
                style: "cancel"
              },
              { text: "OK", onPress: () => approveOrder(payload) }
            ]
          );

          const approveOrder = async(payload)=>{

            await axios.post(`https://parseapi.back4app.com/functions/makeDeal`, payload, head )
                .then(function(response) {

                    if(response.data.result.length>0){
                            in_out_Deals = response.data.result 
                            setAllDeals(response.data.result)
                            //return response.data.result

                            Alert.alert("Success","Deal approved. See details in running orders tab",[
                                { text: "OK", onPress: navigation.goBack() }
                              ]
                            );
                            
                            

                    }else{
                            //setBusy(false) 
                    }

            

                }).catch(function(error){
                    //setBusy(false)        
                    console.log('error ' + error.response.request._response);
                    return []

                });

        } 


        
    }
   
    const deleteDeal =async(object)=>{
       
        let payload = { 
            objectId: selectedItem.objectId,
            scanParam:1500,
            lat:6.673014595380605, long:-1.5655754454970323,
         };



         Alert.alert(
           "Delete Confirmation",
           "Are you sure you want to delete "+ selectedItem.title,
           [
             {
               text: "Cancel",
               onPress: () => console.log(""),
               style: "cancel"
             },
             { text: "OK", onPress: () => clearOrder(payload) }
           ]
         );

        const clearOrder = async(payload)=>{

            await axios.post(`https://parseapi.back4app.com/functions/deleteOrder`, payload, head )
                .then(function(response) {

                    if(response.data.result.length>0){
                            in_out_Deals = response.data.result 
                            setAllDeals(response.data.result)
                            //return response.data.result

                            Alert.alert("Success","Your Order has successfully deleted",[
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

        } 
    }


  
    const withdrawDeal =async(object)=>{
       
        let payload = { 
            objectId: selectedItem.objectId,
            scanParam:1500,
            lat:6.673014595380605, long:-1.5655754454970323
         };



         Alert.alert(
           "Withdrawal Confirmation",
           "Are you sure you want to withdraw "+ selectedItem.title,
           [
             {
               text: "Cancel",
               onPress: () => console.log(""),
               style: "cancel"
             },
             { text: "OK", onPress: () => withdrawOrder(payload) }
           ]
         );

        const withdrawOrder = async(payload)=>{

            await axios.post(`https://parseapi.back4app.com/functions/withdrawOrder`, payload, head )
                .then(function(response) {

                    if(response.data.result.length>0){
                            in_out_Deals = response.data.result 
                            setAllDeals(response.data.result)
                            console.log(response.data.result)
                            //return response.data.result

                            Alert.alert("Success","Your Request has successfully withdrawn",[
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


    const bounceDeal =async(object)=>{
       
        let payload = { 
            objectId: selectedItem.objectId,
            scanParam:1500,
            lat:6.673014595380605, long:-1.5655754454970323
         };



         Alert.alert(
           "Reject Confirmation",
           "Are you want to reject " + selectedItem.title,
           [
             {
               text: "Cancel",
               onPress: () => console.log(""),
               style: "cancel"
             },
             { text: "OK", onPress: () => withdrawOrder(payload) }
           ]
         );

        const withdrawOrder = async(payload)=>{

            await axios.post(`https://parseapi.back4app.com/functions/withdrawOrder`, payload, head )
                .then(function(response) {

                    if(response.data.result.length>0){
                            in_out_Deals = response.data.result 
                            setAllDeals(response.data.result)
                            console.log(response.data.result)
                            //return response.data.result

                            Alert.alert("Success","You have rejected the Request. Deal successfully withdrawn",[
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


        const takeOrder =async(object)=>{

            let payload = { 
                object: selectedItem,
                scanParam:1500,
                lat:6.673014595380605, long:-1.5655754454970323,
                myDet: {accDetId: loggedUser.loggedInUser.accDet.objectId,
                    ghanaPostAddress: loggedUser.loggedInUser.accDet.ghanaPostAddress,
                    hostelName: loggedUser.loggedInUser.accDet.hostelName,
                    userNum: loggedUser.loggedInUser.accDet.userNum,
                    reviews: loggedUser.loggedInUser.accDet.reviews,
                    roomNo: loggedUser.loggedInUser.accDet.roomNo,
                    uniqueAccNo: loggedUser.loggedInUser.user.uniqueAccNo,
                    phone: loggedUser.loggedInUser.user.phone,
                    firstname: loggedUser.loggedInUser.user.firstname,
                    lastname: loggedUser.loggedInUser.user.lastname,
                    email: loggedUser.loggedInUser.user.email,
    
                }
                        
             };
    
             //console.log(loggedUser.loggedInUser.user)
    
             //console.log(object)
             const takeIt =async(payload)=>{
    
                await axios.post(`https://parseapi.back4app.com/functions/takeOrder`, payload, head )
                .then(function(response) {
    
                    //console.log(response.data.result)
                    
        
                    if(response.data.result.length>0){
                            in_out_Deals = response.data.result 
                            setAllDeals(response.data.result)
                            //return response.data.result
        
                    }else{
                            //setBusy(false) 
                    }
        
                }).catch(function(error){
                    //setBusy(false)        
                    Alert.alert('error ' + error.response.request._response);
                    return []
        
                });
        
              }
    
              Alert.alert(
                "Confirm action",
                "You're taking order from "+ selectedItem.receiverDetails.name,
                [
                  {
                    text: "Cancel",
                    onPress: () => console.log(""),
                    style: "cancel"
                  },
                  { text: "OK", onPress:()=>takeIt(payload) }
                ]
              );
    
            }
    

    return (
    <SafeAreaView style={{flex:1,backgroundColor:'#ededed'}}>
        <View style={{flexDirection:'row', marginTop:50, marginBottom:20,backgroundColor:'#fff',padding:15,justifyContent:'space-between',borderBottomWidth:1,borderBottomColor:'#F5AF22'}}>
            <View>
                <Entypo name="shopping-cart" size={24} color='#F5AF22' />
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
                    <Text style={{fontSize:14, color:"#fff"}}>
                    {loggedUser.loggedInUser.user.uniqueAccNo===selectedItem.receiverDetails.id && selectedItem.orderStatus===0?
                    " No one has taken your Order yet":
                    loggedUser.loggedInUser.user.uniqueAccNo!==selectedItem.receiverDetails.id && selectedItem.orderStatus===0?
                    " Order has not been taken yet":
                    loggedUser.loggedInUser.user.uniqueAccNo===selectedItem.receiverDetails.id && selectedItem.orderStatus===1?
                    " Dispatcher is awaiting your action":
                    loggedUser.loggedInUser.user.uniqueAccNo!==selectedItem.receiverDetails.id && selectedItem.orderStatus===1?
                    " Your request is awaiting "+selectedItem.receiverDetails.name+"\'s approval":
                    " Order has been taken"
                    }</Text>
                    </View>
                    <Text style={{fontSize:16}}>Order: {selectedItem.title}</Text>
                    <Text style={{fontSize:16}}>{selectedItem.disc}</Text>
                    <Text style={{fontSize:16}}>Sales Point: {selectedItem.title}</Text>
                    <Text style={{fontSize:16}}>Receiver Name: {selectedItem.receiverDetails.name}</Text>
                    <Text style={{fontSize:16}}>Receiver Name: {selectedItem.creator.rating}</Text>
                    <Text style={{fontSize:16}}>Receiver Name: {selectedItem.amount}</Text>
                    <Text style={{fontSize:16}}>Receiver Name: {selectedItem.bonus}</Text>
                    <Text style={{fontSize:16}}>All other details will be visible when the {selectedItem.receiverDetails.name} makes a deal with you. Go to Active Orders </Text>
                    

                </View>

            </View>
            
        </ScrollView>

        <View style={{backgroundColor:"#fff",padding:15}}>
            
            <View style={{marginTop:8, justifyContent:'space-around'}}>
            {loggedUser.loggedInUser.user.uniqueAccNo===selectedItem.receiverDetails.id && selectedItem.orderStatus===0?
                <TouchableOpacity 
                onPress={()=>deleteDeal(selectedItem)} 
                style={{backgroundColor:'red',
                padding:15,borderRadius:10, marginVertical:5}}  
                >
                <Text style={{fontSize:20, textAlign:'center', color:"#fff"}}>Delete Order</Text>
                </TouchableOpacity>
            :
                loggedUser.loggedInUser.user.uniqueAccNo!==selectedItem.receiverDetails.id && selectedItem.orderStatus===0?
                <TouchableOpacity 
                onPress={takeOrder} 
                style={{backgroundColor:'#32944c',
                padding:15,borderRadius:10, marginVertical:5}}  
                >
                <Text style={{fontSize:20, textAlign:'center', color:"#fff"}}>Take Order Order</Text>
                </TouchableOpacity>
            :
                <View></View>
            }

            { selectedItem.orderStatus===1 && loggedUser.loggedInUser.user.uniqueAccNo===selectedItem.receiverDetails.id ?
                <View>
                <TouchableOpacity 
                onPress={approveDeal} 
                style={{backgroundColor:'#32944c',
                padding:15,borderRadius:10, marginVertical:5}}  
                >
                <Text style={{fontSize:20, textAlign:'center', color:"#fff"}}>Approve Deal</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                onPress={bounceDeal} 
                style={{backgroundColor:'#2E2E2E',
                padding:15,borderRadius:10, marginVertical:5}}  
                >
                <Text style={{fontSize:20, textAlign:'center', color:"#fff"}}>Bounce Deal</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                onPress={deleteDeal} 
                style={{backgroundColor:'red',
                padding:15,borderRadius:10, marginVertical:5}}  
                >
                <Text style={{fontSize:20, textAlign:'center', color:"#fff"}}>Delete Order</Text>
                </TouchableOpacity>
                </View>
            :
            selectedItem.orderStatus===1 && loggedUser.loggedInUser.user.uniqueAccNo!==selectedItem.receiverDetails.id && loggedUser.loggedInUser.user.uniqueAccNo ===selectedItem.dispatcherDet.userNum ?
                <View>
                <TouchableOpacity 
                onPress={withdrawDeal} 
                style={{backgroundColor:'red',
                padding:15,borderRadius:10, marginVertical:5}}  
                >
                <Text style={{fontSize:20, textAlign:'center', color:"#fff"}}>Withdraw Request</Text>
                </TouchableOpacity>
                </View>
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
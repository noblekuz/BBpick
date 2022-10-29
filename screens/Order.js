import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, TextInput, FlatList, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selecteRestaurant } from '../feature/RestaurantSlice'
import { selectedBasketItem, selectedBasketTotal } from '../feature/basketSlice'
import { Entypo, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { theUser } from '../feature/UserSlice'


const CartShop = () => {
    const restaurant = useSelector(selecteRestaurant);
    const items = useSelector(selectedBasketItem);
    const loggedUser = useSelector(theUser);
    const dispatch = useDispatch();
    const [groupedItemsInCart, setGroupedItemsInCart] = useState([]);
    const cartTotal = useSelector(selectedBasketTotal)
    const navigation = useNavigation()


 

    let head = {
        headers:{
            'Content-Type': 'application/json',
            'X-Parse-Application-Id': 'jUTET8D4ZARJa3QeLmu9P1wn6PCYtDiphlg1cQ7t',
            'X-Parse-REST-API-Key': 'BftEOnyYCXwBn81sycpKcTw03xxJ8nkVA362b9Om'
                    }
            }


            let [allDeals, setAllDeals] = useState([])
            const fetch_deals = async() =>{
        
                let payload = { 
                    user:{
                        id:loggedUser.loggedInUser.accDet.userNum,
                        lat:loggedUser.loggedInUser.accDet.coordinates.latitude, 
                        long:loggedUser.loggedInUser.accDet.coordinates.longitude,              
                        scanParam:loggedUser.loggedInUser.mySettings.scanParam
                    }
                 };
                    
                await axios.post(`https://parseapi.back4app.com/functions/scanMyHood`, payload, head )
                .then(function(response) {
                    console.log(response.data.result.length);
                    
                    if(response.data.result.length>0){
                        //0 && loggedUser.loggedInUser.accDet.currentRole===0
                       //console.log(response.data.result.length)
                       console.log(response.data.result);

                       //console.log(response.data.result[4].creator_id)
                      // console.log(loggedUser.loggedInUser.accDet.userNum)
                            
                       in_out_Deals = response.data.result.filter(function (item){
                               return item.creator_id === loggedUser.loggedInUser.accDet.userNum || item.dispatcherDet.userNum === loggedUser.loggedInUser.accDet.userNum 
                            }     
                            ) 


                            setAllDeals(
                                response.data.result.filter(function(item){
                                   return item.creator_id === loggedUser.loggedInUser.accDet.userNum || item.dispatcherDet.userNum === loggedUser.loggedInUser.accDet.userNum
                                }
                                   
                                ) 
                            )
                                
                           // console.log(in_out_Deals.length)
                                               


                 


                            
                            //return response.data.result
        
                    }else if (response.data.result.length>0 && loggedUser.loggedInUser.accDet.currentRole===1){
                            //setBusy(false) 

                            in_out_Deals = response.data.result 
                            setAllDeals(response.data.result)
                    }else{

                    }
        
                }).catch(function(error){
                    //setBusy(false)        
                    Alert.alert('error ' + error.response.request._response);
                    //console.log(error.response.request._response);
                    
        
                });
        
            }

    useEffect(() =>{
        fetch_deals()
        const groupedItems = items.reduce((results, item)=>{
            (results[item.id] = results[item.id] || []).push(item);
            return results;
        }, {});

        setGroupedItemsInCart(groupedItems)
    },[items])

  
    const toggleViewOrder = (item)=>{
        navigation.navigate('OrderDetails', {item})
    }


    const deleteOrder =async(object)=>{
        let payload = { 
            objectId: object.objectId,
            lat:loggedUser.loggedInUser.accDet.coordinates.latitude, 
            long:loggedUser.loggedInUser.accDet.coordinates.longitude,              
            scanParam:loggedUser.loggedInUser.mySettings.scanParam
         };



         Alert.alert(
           "Delete Confirmation",
           "Are you sure you want to delete "+ object.title,
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
            object: object,
            lat:loggedUser.loggedInUser.accDet.coordinates.latitude, 
            long:loggedUser.loggedInUser.accDet.coordinates.longitude,              
            scanParam:loggedUser.loggedInUser.mySettings.scanParam,
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
            "You're taking order from "+ object.receiverDetails.name,
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


          const makeDeal =async()=>{
            await axios.post(`https://parseapi.back4app.com/functions/makeDeal`, payload, head )
            .then(function(response) {
    
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
            
    

    return (
    <SafeAreaView style={{flex:1,backgroundColor:'#ededed'}}>
        <View style={{flexDirection:'row', marginTop:50, marginBottom:20,backgroundColor:'#fff',padding:15,justifyContent:'space-between',borderBottomWidth:1,borderBottomColor:'#F5AF22'}}>
            <View>
                <Entypo name="shopping-cart" size={24} color='#F5AF22' />
            </View>
            <Text style={{fontSize:24,fontWeight:'bold'}}>Pending Orders</Text> 
            <TouchableOpacity 
                style={{alignItems:'flex-end'}}
                onPress ={fetch_deals}
            >
                <Entypo name="ccw" size={24} color='#F5AF22' />
            </TouchableOpacity>
        </View>
        <ScrollView >

            {allDeals.length <= 0?
            <View style={{flex:1, marginHorizontal:5}}>
                <Text style={{fontSize:19, color:"#ababab", textAlign:"center", marginTop:50}}>No Order</Text>
                <Text style={{fontSize:14, color:"#ababab", textAlign:"center", marginTop:10}}>You see your orders and those of your neighbours here</Text>
            </View>
            :
            <View style={{height:"100%"}}>
            <FlatList 
            style={styles.flatList}
            data = {allDeals}                           
            keyExtractor={(item, index) => item.id} 
            //renderItem ={({item}) =>(
            renderItem ={({item}) =>(
                /* {loggedUser.loggedInUser.accDet.currentRole===0?
                
                    :{}} */
                <TouchableOpacity onPress={()=>{toggleViewOrder(item)}}>
                    <View style={styles.listItem}>
                    <View style={styles.listContent}>
                        <View style={styles.itemStatusCont}>
                            <View style={{width:40, justifyContent:"center", alignContent:"center", alignItems:"center", height:40, borderRadius:20, backgroundColor:"#2E2E2E"}}>
                                {item.receiverDetails.id===loggedUser.loggedInUser.user.uniqueAccNo?
                                <Entypo name="emoji-flirt" size={24} color='#fff' />:
                                <Entypo name="bell" size={24} color='#D7CA00' />
                                }
                                
                            </View>
                        </View>
                        <View style={styles.ListTextCont}>
                            <Text style={styles.listHeading}>{item.title}</Text>
                            <Text style={styles.listDisc}>{item.disc}</Text>
                        </View>
                        <View style={{flex: 3, marginTop:8}}>
                            <Text style={{fontSize:12, color:'#000', marginTop:5}}>{item.amount} Ghc</Text>
                            <Text style={{fontSize:10, color:'#7E7E7E'}}>Profit:{item.bonus}</Text>
                        </View>

                        <View style={{flex:2}}>
                            
                            <TouchableOpacity onPress={item.receiverDetails.id===loggedUser.loggedInUser.user.uniqueAccNo && item.orderStatus ===0 ?()=>deleteOrder(item):
                                item.receiverDetails.id===loggedUser.loggedInUser.user.uniqueAccNo && item.orderStatus ===1?()=>makeDeal(item):
                                item.receiverDetails.id!=loggedUser.loggedInUser.user.uniqueAccNo && item.orderStatus ===0?()=>takeOrder(item):()=>{}} 
                                
                                style={{height:50, padding:3, alignContent:"center", justifyContent:"center", width:"90%", backgroundColor: item.receiverDetails.id===loggedUser.loggedInUser.user.uniqueAccNo && item.orderStatus ===0?"red":
                                item.receiverDetails.id===loggedUser.loggedInUser.user.uniqueAccNo && item.orderStatus ===1?"#2E2E2E":
                                item.receiverDetails.id!=loggedUser.loggedInUser.user.uniqueAccNo && item.orderStatus ===0?"#26B763":"#2E2E2E", borderRadius:5}}>
                            {item.receiverDetails.id===loggedUser.loggedInUser.user.uniqueAccNo && item.orderStatus ===0?
                            <Text style={{textAlign:"center", color:"#fff", fontSize:12}}>Delete</Text>:
                            item.receiverDetails.id===loggedUser.loggedInUser.user.uniqueAccNo && item.orderStatus ===1?
                            <Text style={{textAlign:"center", color:"#fff", fontSize:12}}>Waiting</Text>:
                            item.receiverDetails.id!=loggedUser.loggedInUser.user.uniqueAccNo && item.orderStatus ===0?
                            <Text style={{textAlign:"center", color:"#fff", fontSize:12}}>Take</Text>:
                            item.receiverDetails.id!=loggedUser.loggedInUser.user.uniqueAccNo && item.orderStatus ===1?
                            <Text style={{textAlign:"center", color:"#fff", fontSize:12}}>Waiting</Text>:
                            item.receiverDetails.id!=loggedUser.loggedInUser.user.uniqueAccNo && item.orderStatus ===1 && item.dispatcherDet.userNum!=loggedUser.loggedInUser.user.uniqueAccNo?
                            <Text style={{textAlign:"center", color:"#fff", fontSize:12}}>Taken</Text>:
                            <Text style={{textAlign:"center", color:"#fff", fontSize:12}}>Taken</Text>

                            }
                                
                            </TouchableOpacity>
                        </View>
                        
                    </View>
                    </View>
                </TouchableOpacity>
            )}
            />
            </View>

            }

                            
                            
        </ScrollView>


      
    </SafeAreaView>
  )
}

export default CartShop

const styles = StyleSheet.create({

    flatList:{
        width: '95%',
        alignSelf: 'center',
        height: '67%',
        marginBottom:5       
    },
    listItem:{
        backgroundColor: '#ffffff',
        width: '100%',
        height: 80,
        borderBottomWidth: 1,
        borderBottomColor: '#cfcfcf',
    },
    listContent:{
        flexDirection: 'row',
        padding: 10,
        justifyContent: 'center'

    },
    itemStatusCont:{
        borderRadius: 25,
        width: 40,
        height: 50,
        marginLeft: 0,
        marginTop: 10,
        marginRight: 5,
        backgroundColor: '#ffffff',  
        justifyContent: 'center'
    },
    ListTextCont:{
        flex: 5,
        marginLeft: 8,
        marginRight:5,
        marginTop: 12
        },
    listHeading:{
        fontSize: 14,
        color: '#212121',
    
    
    },
    listDisc:{
        fontSize: 10,
        color: '#212121'
    },
    amountCont:{
        flex: 2,
        marginTop: 10
    },
    listAmountTotal:{
        fontSize: 11,
        color: "#000",


    },
    listToken:{
        fontSize: 11,
        color: '#878787'
    },


})
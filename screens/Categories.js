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


            let [allDeals, setAllDeals] = useState([])


            const fetchActdeals = async() =>{
                //console.log(loggedUser.loggedInUser.accDet.objectId)
                let payload = { 
                    user:{
                        myId:loggedUser.loggedInUser.accDet.objectId,
                    }
                 };
                    
                await axios.post(`https://parseapi.back4app.com/functions/getMyActiveOrders`, payload, head )
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
                    console.log('error ' + error.response.request._response);
                    return []
        
                });
        
            }

    useEffect(() =>{
        fetchActdeals()
        const groupedItems = items.reduce((results, item)=>{
            (results[item.id] = results[item.id] || []).push(item);
            return results;
        }, {});

        setGroupedItemsInCart(groupedItems)
    },[items])


    const deleteOrder =async(object)=>{
        let payload = { 
            objectId: object.objectId,
            scanParam:1500,
            lat:6.670727,
            long:-1.563228,
         };
            
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


    }

    const toggleViewOrder = (item)=>{
        navigation.navigate('ActiveOrderDetails', {item})
    }



    return (
    <SafeAreaView style={{flex:1,backgroundColor:'#ededed'}}>
        <View style={{flexDirection:'row', marginTop:50, marginBottom:20,backgroundColor:'#fff',padding:15,justifyContent:'space-between',borderBottomWidth:1,borderBottomColor:'#F5AF22'}}>
            <View>
                <Entypo name="shopping-cart" size={24} color='#F5AF22' />
            </View>
            <Text style={{fontSize:24,fontWeight:'bold'}}>My Active Orders</Text> 
            <TouchableOpacity 
                style={{alignItems:'flex-end'}}
                onPress ={fetchActdeals}
            >
                <Entypo name="ccw" size={24} color='#F5AF22' />
            </TouchableOpacity>
        </View>
        <ScrollView >

            {allDeals.length <= 0?
            <View style={{flex:1, marginHorizontal:5}}>
                <Text style={{fontSize:19, color:"#ababab", textAlign:"center", marginTop:50}}>No Active Order</Text>
                <Text style={{fontSize:14, color:"#ababab", textAlign:"center", marginTop:10}}>All approved deals appear here</Text>
            </View>
            :
            <View style={{height:"100%"}}>
            <FlatList 
            style={styles.flatList}
            data = {allDeals}                           
            keyExtractor={(item, index) => item.id} 
            renderItem ={({item}) =>(
                <TouchableOpacity onPress={()=>{toggleViewOrder(item)}}>
                    <View style={styles.listItem}>
                    <View style={styles.listContent}>
                        <View style={styles.itemStatusCont}>
                            <View style={{width:40, justifyContent:"center", alignContent:"center", alignItems:"center", height:40, borderRadius:20, backgroundColor:"#2E2E2E"}}>
                                {item.receiverDetails.id===loggedUser.loggedInUser.user.uniqueAccNo?
                                <Entypo name="download" size={24} color={item.orderReceived===false && item.paymentReceived===false?'#bafc03':'#5c5c5c'} />:
                                <Entypo name="upload" size={24} color={item.orderReceived===false && item.paymentReceived===false?'red':'#5c5c5c'} />
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
                        <View style={{flex: 3, marginTop:8}}>
                            <Text style={{fontSize:12, 
                                color:item.orderStatus === 0?"red":item.orderStatus === 1?"#0b6c99":item.orderStatus === 2?"#25990b":"#3b3b3b",
                                marginTop:5}}>
                                {item.orderStatus === 0?"Deal started":item.orderStatus === 1?"Delivered":item.orderStatus === 2?"Paid":"Stage 3 of 3"}
                            </Text>
                            <Text style={{fontSize:10, color:'#7E7E7E'}}>
                                {item.orderStatus === 0?"Stage 1 of 3":item.orderStatus === 1?" Stage 2 of 3":item.orderStatus === 2?"Stage 3 of 3":"Stage 3 of 3"}
                            </Text>
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
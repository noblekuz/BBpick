import { View, Text, Image, FlatList, StyleSheet,SafeAreaView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Entypo, EvilIcons, AntDesign } from '@expo/vector-icons';
import { addToBasket, removeFromBasket, selectedBasketItem, selectedBasketItemWithId } from '../feature/basketSlice';
import { useDispatch, useSelector } from 'react-redux';

const Mealcard = ({dish,price,id,}) => {
  const dispatch = useDispatch();
  const items = useSelector((state) => selectedBasketItemWithId(state, id));
  const Ben=useSelector(selectedBasketItem)

  const removeItemFromBasket = () =>{
    if(!items.length > 0) return;

    dispatch(removeFromBasket({id}))
  }
  const addItemToBasket = () => {
    dispatch(addToBasket({dish,price,id}));
  }

  const log=()=>{
    console.log(Ben)
  }

//   useEffect(()=>{
  
// },[])
  
    return (
    <>
       
     
        <View style={{...styles.foodlist,flexDirection:'row',justifyContent:'space-between'}}>
            <TouchableOpacity onPress={log} style={{flexDirection:"row", alignContent:"center", alignItems:"center", justifyContent:"center"}}>
              <Text style={styles.foodtext}>{dish}</Text>
              <View style={{flexDirection: 'row'}}>
                  <Text style={{...styles.foodtext}}> @ {price}</Text>
                  <Text style={{fontSize:10, color:"#2E2E2E"}}>GhC</Text>
              </View>

            </TouchableOpacity>
            <View>
              <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-around'}}>
                
                
                <TouchableOpacity 
                  onPress={removeItemFromBasket}
                >
                  <AntDesign name="minussquare" size={32} color='#F5AF22' />
                </TouchableOpacity>
                <Text style={{marginRight:4, fontSize:12}}>{items.length}</Text>
                <TouchableOpacity style={{marginRight:4}} 
                            onPress={addItemToBasket}
                >
                  <AntDesign name="plussquare" size={32} color='#F5AF22' />
                </TouchableOpacity>
              </View>
            </View>

        </View>
    
    </>
  )
}

export default Mealcard

const styles = StyleSheet.create({
      contain:{
         backgroundColor: '#fff'
      },

      imageStyle:{
        height: 220,
        resizeMethod: 'resize',
        resizeMode: 'center'
      },
      textStyle:{
        fontSize: 40,
        fontWeight: '500'
      },
      foodlist:{
        padding:15,
        borderBottomWidth: 1,
        borderColor:'#F5AF22'
      },
      foodtext:{
        fontSize:14,
        fontWeight: 'normal',
        fontWeight:"500"
      }
})
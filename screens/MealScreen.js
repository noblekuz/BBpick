import { View, Text,ScrollView, Image, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { useRoute } from '@react-navigation/native'
import Mealcard from '../components/mealcard'
import { Entypo, EvilIcons} from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { setRestaurant} from '../feature/RestaurantSlice';
import CartIcon from '../components/CartIcon';


const MealScreen = () => {
    const {params:{details, meal}} = useRoute();
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(setRestaurant({details, meal}))
    }, [dispatch])

  return (

    <>
      <CartIcon />
      <View style={styles.container}>
        <View style={{alignItems: 'center'}}>
            <Image  
                style={styles.imageStyle} 
                source ={details.image}
            />
        </View>
        <View style={{backgroundColor:'#fff', padding:15}} >
        
          <View style={{flexDirection:'row',alignItems:'center', justifyContent:'space-between'}}>
              <Text style={styles.textStyle}>{details.title}</Text>
              <View  style={{alignItems:'center', flexDirection:'row'}}>
                <View style={{marginRight:5}}>
                  <Entypo name="star" size={24} color="#757585" />
                </View>
                <Text style={{fontSize:20,marginRight:8}}>{details.rating}.5</Text>
              </View>
                
          </View>
          <View style={{flexDirection:'row',marginTop:5}}>
                <EvilIcons name="location" size={20} color="#757585" />
                <Text style={{fontWeight:'300'}}>Nearby {details.location}</Text>
          </View>

        </View>
        
            <ScrollView>
              {meal.map((meal)=>(
                <Mealcard 
                  id = {meal.id}
                  dish = {meal.dish}
                  price = {meal.price}
                
              />
              ))}
              
            </ScrollView>
            
              
      </View>
    </>
  )
}

export default MealScreen

const styles = StyleSheet.create({
    container: {
        flex:1,
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
})
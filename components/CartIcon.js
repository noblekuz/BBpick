import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import { selectedBasketItem, selectedBasketTotal } from '../feature/basketSlice'
import { useNavigation } from '@react-navigation/native'

const CartIcon = () => {
    const items = useSelector(selectedBasketItem)
    const navigation = useNavigation()
    const cartTotal = useSelector(selectedBasketTotal)

    if (items.length == 0) return null;
  return (
    <View style={styles.container}>
        <TouchableOpacity style={styles.cartstyle}
            onPress={()=>navigation.navigate('CartShop')}
        >
            <Text style={{...styles.textStyle, color:'#fff',paddingHorizontal:4}}>
                {items.length} Items
            </Text>
            <Text style={{...styles.textStyle, color:"#fff"}}>Open Cart</Text>
            <Text style={{...styles.textStyle, fontSize:28}}>{parseFloat(cartTotal).toFixed(2)}</Text>
            <Text style={{color:"#F5AF22", fontSize:10}}>Ghc</Text>
        </TouchableOpacity>
        
    </View>
  )
}

export default CartIcon

const styles = StyleSheet.create({
    container : {
        position: 'absolute',
        zIndex: 50,
        bottom: 30,
        marginLeft: 20,
        width: 320,
        backgroundColor: '#290038',
        borderRadius: 8,
        justifyContent:'center'

    },
    cartstyle: {
        paddingHorizontal: 8,
        paddingVertical:10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    textStyle: {
        color:'#F5AF22',
        fontWeight:'bold',
        fontSize: 18
    }
})
import { View, StyleSheet, TextInput } from 'react-native'
import React from 'react';
import { Ionicons } from '@expo/vector-icons';


const Searches = () => {
  return (
    <View style ={styles.contain}>
        <Ionicons name="arrow-back" size={24} color= '#F5AF22' />
        <View style={styles.searchInput} >
            <Ionicons name="search" size={24} color = '#A9A9B8' />
            <TextInput style={{marginLeft:10, fontSize:18, color:'#A9A9B8'}} 
                placeholder='search for your anything'/>
        </View>
    </View>
  )
}

export default Searches
const styles = StyleSheet.create({
    contain: {
        height:40,
        flexDirection:'row',
        alignItems: 'center',
        paddingHorizontal:15

    },
    searchInput: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor:'white',
        opacity: 0.5,
        borderWidth: 2,
        borderColor: '#F5AF22',
        borderRadius:10,
        paddingLeft: 20,
        width: 300,
        height:40,
        marginLeft: 20
    
    }
})
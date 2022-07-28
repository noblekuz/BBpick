import React, {useState} from 'react';
import { Ionicons } from '@expo/vector-icons';
import {
    StyleSheet, 
    View,
    Dimensions,
    TouchableOpacity,
    Text, 
    Modal,
    TextInput,
         } from 'react-native';

export default function SearchRequest (){
    
    return (
        <View style={styles.contain}>
            <View style={styles.searchInput} >
                <Ionicons name="search" size={24} color = '#A9A9B8' />
                <TextInput style={{marginLeft:10, fontSize:18, color:'#A9A9B8'}} 
                    placeholder='search for your anything'/>
            </View> 
            <View style={{justifyContent: 'center',alignItems: 'center'}} >
                <Text style={{color:'white'}}>hi</Text>
            </View>
        </View>
        
    )
}

const styles = StyleSheet.create({
    contain: {
        height:40,
        flexDirection:'row',
        alignItems: 'center'

    },
    searchInput: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor:'white',
        opacity: 0.5,
        borderRadius:8,
        paddingLeft: 20,
        width: 300,
        height:40
    
    }
})
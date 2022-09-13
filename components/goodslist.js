import React, {useState} from 'react';
import { LinearGradient } from 'expo-linear-gradient';

import {
    View,
    Text,
    Image,
    ImageBackground,
    StyleSheet,
    TouchableOpacity
} from 'react-native'

export default function Goodslist({item}){
    return(
        
        <TouchableOpacity style={{marginVertical:15, marginHorizontal: 5}}>
            <ImageBackground
                    source = {item.image}
                    style={styles.imageStyle}
                    imageStyle = {{borderRadius: 20,}}
            > 
                <LinearGradient
                    colors={['transparent','rgba(0,0,0,1)', ]}
                    start ={{x:0, y:0.5}}
                    end = {{x:0, y:0.8}}
                    style ={styles.background}
                    //style ={styles.imageStyle}
                >
                        <Text style={styles.textStyle}>
                            {item.name}
                        </Text>
                </LinearGradient>   
            
            </ImageBackground>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    imageStyle:{
        flex:1,
        //position: 'relative',
        //height: 120,
        width: "100%",
        borderRadius:20,
        borderWidth: 3,
        borderColor: '#fff',
        
    },
    background: {
        flex: 1,
        height: 120,
        width: '100%',
        justifyContent:'flex-end',
        borderRadius:20,


    },
    textStyle: {
        padding: 10,
        color: '#fff',
        fontSize: 15,
        fontWeight: 'bold'
    }
    
    
})
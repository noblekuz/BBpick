import React, {useState} from 'react';
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
        <TouchableOpacity style={{marginTop:30,marginRight:15}}>
            <Image
                source = {item.image}
                style={styles.imageStyle}
            />
                {/* <Text style={styles.textStyle}>
                    {item.name}
                </Text> */}

        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    imageStyle:{
        flex:1,
        //position: 'relative',
        height: 120,
        width: 180,
        borderRadius:20,
        borderWidth: 3,
        borderColor: '#fff',
    },
    textStyle: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
        bottom: 5,
        left: 5,
        position: 'absolute'
    }
})
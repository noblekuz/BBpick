import React, {useState} from 'react'
import SearchRequest from '../components/SearchRequest';
import { FontAwesome5 } from '@expo/vector-icons';
import {
  StyleSheet, 
  View, 
  TouchableOpacity,
  Text,
  FlatList,
  Dimensions,
  Modal,
  Image,
       } from 'react-native';
import Goodslist from '../components/goodslist';


export default function Home (){
    const [popularSearch, setPopularSearch]=useState([
         {name : 'Bofahs Apple shop', image: require('../assets/goodsImage/apple.png')},
         {name : 'Pizzaman chickenman', image: require('../assets/goodsImage/chickenman.png')},
         {name : 'Continental Supermarket', image: require('../assets/goodsImage/continentalsupermarket.png')},
         {name : 'Laud K Pharmacy', image: require('../assets/goodsImage/laudk.png')},
         {name : 'Dailybite', image: require('../assets/goodsImage/dailybite.png')},
         {name : 'Kingdombooks', image: require('../assets/goodsImage/bookshop.png')},
         {name : 'Queens Gob3', image: require('../assets/goodsImage/beans.png')},
         {name : 'Seebays Printing shop', image: require('../assets/goodsImage/printingShop.png')},

    ]);
    //const [goods, setGoods] = useState(popularSearch)
    return(
        <View style = {styles.container}>
            <View style={{flex:1,marginHorizontal:20}}>
               {/* search and allow to receive request  */}
               <SearchRequest />
            </View>
            <View style={styles.mkrequest}>
                {/* Friends make dliveries */}
                <View style={{flex:3,justifyContent:'center',alignItems:'center'}}> 
                    <Text style={{color:'#290038', fontSize:25, fontWeight:'normal'}}>
                        Friends make deliveries 
                    </Text> 
                    <Text style={{color: '#290038',fontWeight:'300', fontSize:14,marginTop:5}}>
                        Make your friends deliver your purchases if they are at the location of your purchase 
                    </Text>
                </View>
                <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                    <FontAwesome5 name="user-friends" size={35} color="#4eb6ed" />
                </View>
            </View>
        
            <View style={{flex:10,marginHorizontal:20, width:'100%'}}>
                <FlatList
                    numColumns={2}
                    data={popularSearch}
                    renderItem = {({item}) => {
                        return (
                            < Goodslist item={item}/>
                            
                         ) 
                    }}
                /> 
                
            </View>
            
        </View>  
    )
    
}
const styles = StyleSheet.create({
    container: {
        paddingTop : 40,
        flex: 1,
        backgroundColor: '#290038'

    },
    mkrequest: {
        backgroundColor: '#fff',
        borderRadius:10,
        borderRadius: 16,
        flexDirection:'row',
       // marginTop: 40,
        padding:20,
        height: 120,
        marginHorizontal: 20

    }
   
    
})
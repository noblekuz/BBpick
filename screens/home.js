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
            <View style={{flex:1, paddingHorizontal:20, width:'100%'}}>
               {/* search and allow to receive request  */}
               <SearchRequest />
            </View>
            <View style={styles.mkrequest}>
                {/* Friends make dliveries */}
                <View style={{flex:3,justifyContent:'center',alignItems:'flex-start'}}> 
                    <Text style={{color:'#faacf4', fontSize:25, fontWeight:'normal', textAlign:'left'}}>
                        Friends make deliveries 
                    </Text> 
                    <Text style={{color:'#fff',fontWeight:'300', fontSize:12,marginTop:5}}>
                        Mates around sales point can do your deliveries 
                    </Text>
                </View>
                <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                    <FontAwesome5 name="user-friends" size={35} color="#fff" />
                </View>
            </View>
        
            <View style={{flex:10, width:'90%', alignSelf:'center', alignContent:'space-between', alignItems:'stretch',
                justifyContent:'center'
                }}>
                <FlatList
                    numColumns={2}
                    data={popularSearch}
                    renderItem = {({item}) => {
                        return (
                            <View style={{width:'45%',
                            alignContent:'center', alignSelf:'center', justifyContent:"center",

                            }}>
                            < Goodslist item={item}/>
                            </View>
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
        backgroundColor: '#290038',
        width: "100%"
    },
    mkrequest: {
        borderColor:'#fff',
        borderWidth:1,
        borderStyle:'dotted',
        //borderRadius:10,
        borderRadius: 10,

        flexDirection:'row',
        marginTop: 10,
        padding:20,
        height: 120,
        marginHorizontal: 20

    }
   
    
})
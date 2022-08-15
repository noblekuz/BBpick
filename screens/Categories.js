import React, {useState} from 'react'
import { View, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity,Image,Text} from 'react-native'
import Categorycard from '../components/Categorycard'

const Categories = () => {
 
  const [cat, setCat] = useState([
    {name: 'Restaurant',
     img: require('../assets/catImage/food.png'),
     details: [{
          title: 'Pizzaman',
          image : require('../assets/goodsImage/chickenman.png'),
          rating: '4',
          location: 'KNUST-Mango Road'
      },
       {
          title: 'Kingdom Books',
          image : require('../assets/goodsImage/bookshop.png'),
          rating: '4',
          location: 'Commercial Area'
      },
      {
          title: 'Asew Koko',
          image : require('../assets/goodsImage/koko.png'),
          rating: '4',
          locaton: 'Continental Supermarket'
      },
      {
          title: 'Pice Pzza',
          image : require('../assets/goodsImage/pice.png'),
          rating: '4',
          location: 'Ayeduase Road'
      },
       { 
          title: 'Attaa Gobe',
          image : require('../assets/goodsImage/beans.png'),
          rating: '4',
          location: 'Nana Adoma Hostel'
       
          }
      
    ]},
    // {name: 'Pharmacy', img: require('../assets/catImage/pharmacy.png')},
    // {name: 'Bookshop',img: require('../assets/catImage/bookshop.png')}, 
    // {name: 'Supermarket', img: require('../assets/catImage/supermarket.png')},
    // {name: 'PrintingPress', img: require('../assets/catImage/printer.png')},
    // {name: 'Grocery', img: require('../assets/catImage/grocery.png')},
  ])

 
  
  return (
    <SafeAreaView style={{flex:1,justifyContent:'center',alignItems:'center'}}>
      <ScrollView
        contentContainerStyle = {{paddingHorizontal:15, paddingTop:10}}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {cat.map(
          (cats) =>{
            return(
              <Categorycard name= {cats.name} 
                img ={cats.img} 
                details={cats.details} />
            )
          }
        )}

          
          
      </ScrollView>
      
        
    </SafeAreaView>
  )
}

export default Categories


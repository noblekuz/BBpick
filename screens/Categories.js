import React, {useState} from 'react'
import { View, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity,Image,Text, ViewBase} from 'react-native'
import Categorycard from '../components/Categorycard'

const Categories = () => {
 
  const [cat, setCat] = useState([
    {name: 'Restaurant',
     img: require('../assets/catImage/food.png'),
     details: [{
          title: 'Pizzaman',
          image : require('../assets/goodsImage/chickenman.png'),
          rating: '4',
          location: 'KNUST-Mango Road',
          meal: [
              {
                dish: 'Jollof with chicken or fish',
                price: 25,
                id: '1'
              },
              {
                dish: 'Jollof with chicken or fish',
                price: 25,
                id: '2'
              },
              {
                dish: 'Yamchips with chicken or fish',
                price: 30,
                id: '3'
              },
              {
                dish: 'Yamchips with chicken or fish',
                price: 30,
                id: '4'
              },
             
            ]
        
          
          
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
       
          },
          
    ],
    
  },
    {name: 'Pharmacy', img: require('../assets/catImage/pharmacy.png'),
    details: [{
      title: 'LaudK Pharmacy',
      image : require('../assets/goodsImage/chickenman.png'),
      rating: '4.7',
      location: 'KNUST-Mango Road',
      
  },
   {
      title: 'Nyame Mmireku',
      image : require('../assets/goodsImage/bookshop.png'),
      rating: '4.7',
      location: 'Commercial Area'
  },
  {
      title: 'Philip Pharmacy',
      image : require('../assets/goodsImage/koko.png'),
      rating: '4.7',
      locaton: 'Continental Supermarket'
  },
  {
      title: 'Bofah Pharmacy',
      image : require('../assets/goodsImage/pice.png'),
      rating: '4.7',
      location: 'Ayeduase Road'
  },
   { 
      title: 'Bernard Pharmacy',
      image : require('../assets/goodsImage/beans.png'),
      rating: '4.7',
      location: 'Nana Adoma Hostel'
   
      }
  
],

  },
    {name: 'Bookshop',img: require('../assets/catImage/bookshop.png'),
    details: [{
      title: 'KingdomBooks',
      image : require('../assets/goodsImage/chickenman.png'),
      rating: '3.9',
      location: 'KNUST-Mango Road',
      
  },
   {
      title: 'vandam Books',
      image : require('../assets/goodsImage/bookshop.png'),
      rating: '3.9',
      location: 'Commercial Area'
  },
  {
      title: 'Kuz Books',
      image : require('../assets/goodsImage/koko.png'),
      rating: '3.9',
      locaton: 'Continental Supermarket'
  },
  {
      title: 'Benedicta Books',
      image : require('../assets/goodsImage/pice.png'),
      rating: '3.9',
      location: 'Ayeduase Road'
  },
  
  
],
  }, 
    {name: 'Supermarket', img: require('../assets/catImage/supermarket.png'),
    details: [{
      title: 'Conitinental Supermarket',
      image : require('../assets/goodsImage/chickenman.png'),
      rating: '4',
      location: 'KNUST-Mango Road',
      
  },
   {
      title: 'Elen white',
      image : require('../assets/goodsImage/bookshop.png'),
      rating: '4',
      location: 'Commercial Area'
  },
  {
      title: 'Evandy Supermarket',
      image : require('../assets/goodsImage/koko.png'),
      rating: '4',
      locaton: 'Continental Supermarket'
  },
  {
      title: 'Mercy Supermarket',
      image : require('../assets/goodsImage/pice.png'),
      rating: '4',
      location: 'Ayeduase Road'
  },
   { 
      title: 'By His Grace',
      image : require('../assets/goodsImage/beans.png'),
      rating: '4',
      location: 'Nana Adoma Hostel'
   
      }
  
],
  },
    {name: 'PrintingPress', img: require('../assets/catImage/printer.png'),
    details: [{
      title: 'Count on me',
      image : require('../assets/goodsImage/chickenman.png'),
      rating: '4',
      location: 'KNUST-Mango Road',
      
  },
   {
      title: 'Anokye Printing Press',
      image : require('../assets/goodsImage/bookshop.png'),
      rating: '4',
      location: 'Commercial Area'
  },
  {
      title: 'Seebay Printing',
      image : require('../assets/goodsImage/koko.png'),
      rating: '4',
      locaton: 'Continental Supermarket'
  },
  {
      title: 'Helo',
      image : require('../assets/goodsImage/pice.png'),
      rating: '4',
      location: 'Ayeduase Road'
  },
   { 
      title: 'Prof Bofah',
      image : require('../assets/goodsImage/beans.png'),
      rating: '4',
      location: 'Nana Adoma Hostel'
   
      }
  
],
  },
    {name: 'Grocery', img: require('../assets/catImage/grocery.png')},
  ])

 
  
  return (
    <View style={{paddingTop:320, display:'flex',justifyContent:'center' ,alignItems:'center'}}>
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
      
        
    </View>
  )
}

export default Categories


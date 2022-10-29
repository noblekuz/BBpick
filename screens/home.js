import React, {useState} from 'react'
import { View, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity,Image,Text, ViewBase, RecyclerViewBackedScrollViewComponent, } from 'react-native'
import Categorycard from '../components/Categorycard';
import Toggle from '../components/Toggle';
import { useDispatch, useSelector } from 'react-redux';
import { theUser } from '../feature/UserSlice'
import { setUser} from '../feature/UserSlice';


const Categories = () => {
  
  let loggedUser = useSelector(theUser);
  const dispatch = useDispatch()
 
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

  let [dispatcher, setDispatcher] = useState(loggedUser.loggedInUser.accDet.currentRole===0?false:true);

  const handleChangeDispatcher=()=>{
    if (dispatcher===true){
      setDispatcher(false)
      //Adjust current role to 0

      let user = loggedUser.loggedInUser.user;
      let mySettings = loggedUser.loggedInUser.mySettings;
      let accDet = {
        currentRole: 0,
        userNum:loggedUser.loggedInUser.accDet.userNum,
        updatedAt:loggedUser.loggedInUser.accDet.updatedAt,
        studentID:loggedUser.loggedInUser.accDet.studentID,
        roomNo:loggedUser.loggedInUser.accDet.roomNo,
        reviews:loggedUser.loggedInUser.accDet.reviews,
        rating:loggedUser.loggedInUser.accDet.rating,
        person:loggedUser.loggedInUser.accDet.person,
        objectId:loggedUser.loggedInUser.accDet.objectId,
        hostelName:loggedUser.loggedInUser.accDet.hostelName,
        ghanaPostAddress:loggedUser.loggedInUser.accDet.ghanaPostAddress,
        createdAt:loggedUser.loggedInUser.accDet.createdAt,
        className:loggedUser.loggedInUser.accDet.className,
        allowNotif:loggedUser.loggedInUser.accDet.allowNotif,
        coordinates:{__type:"GeoPoint", latitude: loggedUser.loggedInUser.accDet.coordinates.latitude,
                      longitude: loggedUser.loggedInUser.accDet.coordinates.longitude },
        __type:loggedUser.loggedInUser.accDet.__type,
      }

      
      dispatch(setUser({user, mySettings, accDet}))

      //console.log(loggedUser.loggedInUser.accDet)


      //Update on Server too

    }else{
      setDispatcher(true)
      //Adjust current role to 
      let user = loggedUser.loggedInUser.user;
      let mySettings = loggedUser.loggedInUser.mySettings;
      let accDet = {
        currentRole: 1,
        userNum:loggedUser.loggedInUser.accDet.userNum,
        updatedAt:loggedUser.loggedInUser.accDet.updatedAt,
        studentID:loggedUser.loggedInUser.accDet.studentID,
        roomNo:loggedUser.loggedInUser.accDet.roomNo,
        reviews:loggedUser.loggedInUser.accDet.reviews,
        rating:loggedUser.loggedInUser.accDet.rating,
        person:loggedUser.loggedInUser.accDet.person,
        objectId:loggedUser.loggedInUser.accDet.objectId,
        hostelName:loggedUser.loggedInUser.accDet.hostelName,
        ghanaPostAddress:loggedUser.loggedInUser.accDet.ghanaPostAddress,
        createdAt:loggedUser.loggedInUser.accDet.createdAt,
        className:loggedUser.loggedInUser.accDet.className,
        allowNotif:loggedUser.loggedInUser.accDet.allowNotif,
        coordinates:{__type:"GeoPoint", latitude: loggedUser.loggedInUser.accDet.coordinates.latitude,
                      longitude: loggedUser.loggedInUser.accDet.coordinates.longitude },
        __type:loggedUser.loggedInUser.accDet.__type,
      }

      dispatch(setUser({user, mySettings, accDet}))

      //console.log(loggedUser.loggedInUser.accDet)


      //Update on Server too

    }
  }


  //console.log(":::::::::::::::::::::::::::::::::::::::::::::::::::::")
  //console.log(loggedUser.loggedInUser.accDet.currentRole)

 
  
  return (
    <View style={{paddingTop:20, marginTop:50, 
        flex:1,
        display:'flex',
        backgroundColor: '#290038',
        }}>
        <View style={{marginHorizontal:20, flexDirection:"row", justifyContent:"center", alignItems:"center"}}>
          <Text style={{fontSize:16, color:dispatcher===true? "#fff":"red", marginHorizontal:10}}>Dispatcher Mode {dispatcher===true? "On":"Off"}</Text>
          <Toggle value={dispatcher} press={handleChangeDispatcher}/>

         
          
        </View>

        <View style={{width:"90%", backgroundColor:"#fff", height:150, alignSelf:"center", marginVertical:50,
        borderWidth:1, borderColor:"#290038", borderStyle:"dashed", padding:20}}>
          {/* <Text style={{textAlign:"center", color:"black", fontSize:18}}>This session contains a list of categories.</Text> */}
          <Image style={{resizeMode:'cover',marginRight:6, borderRadius: 11,height:100, width:'100%'}} 
              source={require('../assets/logo.png')}
          />

        </View>
      <ScrollView
        contentContainerStyle = {{paddingHorizontal:10, paddingTop:5, alignSelf:"flex-end", marginBottom:10}}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {cat.map((cats) =>{            
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



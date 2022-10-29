import { setUseProxies } from 'immer';
import React,  { useEffect,useState}  from 'react'
import { View, Text, StyleSheet, SafeAreaView, TextInput, TouchableOpacity, Alert } from 'react-native'
//import { getUser } from '../utils';
import { EvilIcons, Entypo, AntDesign, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { theUser } from '../feature/UserSlice';
import { setUser} from '../feature/UserSlice';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux'
import { ScrollView } from 'react-native-gesture-handler';
import * as Location from 'expo-location';


const Me = () => {
  
  const loggedUser = useSelector(theUser);
  const me = loggedUser.loggedInUser

  const dispatch = useDispatch()

  const [location, setLocation] = useState(null);

  let head = {
    headers:{
        'Content-Type': 'application/json',
        'X-Parse-Application-Id': 'jUTET8D4ZARJa3QeLmu9P1wn6PCYtDiphlg1cQ7t',
        'X-Parse-REST-API-Key': 'BftEOnyYCXwBn81sycpKcTw03xxJ8nkVA362b9Om'
                }
        }

  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

    })();
  }, []);
  
  useEffect(() => {
    async function fetchUser(){
      const userData = await getUser()
      setUseProxies(userData)
    }
  })

  console.log("::::::::::::::::::::::::::::::::::::::::::::::::::")
  console.log(me.accDet.coordinates.latitude)

  let [newUserName, setNewUserName] = useState(me.user.nickname)
  let [newAddress, setNewAddress] = useState(me.accDet.ghanaPostAddress+" ("+me.accDet.hostelName+"), Room "+ me.accDet.roomNo)
  let [newlat, setNewlat] = useState(me.accDet.coordinates.latitude)
  let [newlong, setNewlong] = useState(me.accDet.coordinates.longitude)
  let [toggleScan, setToggleScan] = useState(false)



  const getGPS=async()=>{
    let location = await Location.getCurrentPositionAsync({});
    setNewlat(location.coords.latitude);
    setNewlong(location.coords.longitude);
  }

  const turnOnToggle=()=>{
    if(toggleScan===false){
      getGPS()
      setToggleScan(true)
      
    }else{
      setToggleScan(false)
    }
  }

  const useHome =()=>{
    setNewlat(me.accDet.coordinates.latitude)
    setNewlong(me.accDet.coordinates.longitude)
    setNewAddress(me.accDet.ghanaPostAddress+" ("+me.accDet.hostelName+"), Room "+ me.accDet.roomNo)
  }

  const saveChanges = async() =>{
            
    let payload = {lat: newlat, long:newlong, username: newUserName, address: newAddress, userID:me.user.uniqueAccNo };
    
     await axios.post(`https://parseapi.back4app.com/functions/updateMe`, payload, head)
        .then(function(response) {

          //console.log(response.data.result);
          //navigation.navigate("login")

          let accDet = response.data.result.accDet
          let user = response.data.result.user
          let mySettings = response.data.result.mySettings

          dispatch(setUser({user, mySettings, accDet}))

          Alert.alert("Success","Your details have been successfully updated. This details will be set as your default",[
            {text: "OK", onPress: ()=>{}}
          ]);




        }).catch(function(error){
            
            
            console.log('error ' + error.response.request._response);

        });

}

  const changeUserNameHandler=(val)=>{
    setNewUserName(val)
  }
  const changeAddressHandler=(val)=>{
    setNewAddress(val)
  }
  const changeGPSHandler=(val)=>{
    //console.log(val.lat)
    setNewlat(val.lat)
    setNewlong(val.lat)
  }
 
  return (
    <ScrollView style={styles.contain}>
      
        <View style={{backgroundColor:"#2E2E2E", with:"90%", padding:40,
      justifyContent:"center", alignItems:"center", height:170, marginTop:35 }}>

          
          <View style={{backgroundColor:"#F5af22", width:70, height:70, borderRadius:35, marginTop:10,
        justifyContent:"center", alignContent:"center", alignItems:"center"}}>
            <EvilIcons name="user" size={80} color="white" />
          </View>
          <Text style={{padding:10,fontSize:20,color:'white', with:"100%"}}>
            {me.user.firstname} {me.user.lastname} {"("+me.user.uniqueAccNo+")"}
          </Text>
        </View>
        <View style={styles.down}>
          <View style={{
            paddingHorizontal:20,
            flexDirection:'row',
            paddingHorizontal:10 ,
            marginHorizontal:20,
            borderBottomColor:"#bfbfbf",
            borderBottomWidth:1,
            paddingVertical:5
          }}>
              <AntDesign name="meh" size={18} color="#F5af22" style={{flex:1, marginRight:10, marginTop:5}}/>
              <TextInput style={{flex:8, fontSize:14}} onChangeText={eng=>changeUserNameHandler(eng)}>{newUserName}</TextInput>
              <AntDesign name="edit" size={18} color="#999999" style={{flex:1, marginLeft:30}}/>
          </View>
          <View style={{
            paddingHorizontal:20,
            flexDirection:'row',
            paddingHorizontal:10,
            marginHorizontal:20,
            borderBottomColor:"#bfbfbf",
            borderBottomWidth:1,
            paddingVertical:10,
            marginVertical: 3
          }}>
              <AntDesign name="mail" size={18} color="#F5af22" style={{flex:1, marginRight:10, marginTop:5}}/>
              <TextInput style={{flex:8, fontSize:14}} editable={false}>{me.user.email}</TextInput>
              
          </View>
          <View style={{
            paddingHorizontal:20,
            flexDirection:'row',
            paddingHorizontal:10,
            marginHorizontal:20,
            borderBottomColor:"#bfbfbf",
            borderBottomWidth:1,
            paddingVertical:10,
            marginVertical: 3
          }}>
              <AntDesign name="phone" size={18} color="#F5af22" style={{flex:1, marginRight:10, marginTop:5}}/>
              <TextInput style={{flex:8, fontSize:14}} editable={false}>{me.user.phone}</TextInput>
       
          </View>
          <View style={{
            paddingHorizontal:20,
            flexDirection:'row',
            paddingHorizontal:10,
            marginHorizontal:20,
            borderBottomColor:"#bfbfbf",
            borderBottomWidth:1,
            paddingVertical:10,
            marginVertical: 3
          }}>
              <AntDesign name="qrcode" size={18} color="#F5af22" style={{flex:1, marginRight:10, marginTop:5}}/>
              <TextInput style={{flex:8, fontSize:14}} editable={false}>Account {me.accDet.studentID ==="None"?"Not Verified (Upload Student ID)":"Verified"}</TextInput>
         
          </View>

          <Text style={{flex:8, fontSize:14, marginTop:10, color:"#2E2E2E", marginHorizontal:20, fontWeight:"bold"}}>Set new Delivery Address and GPS</Text>
          <View style={{
            paddingHorizontal:20,
            flexDirection:'row',
            paddingHorizontal:10,
            marginHorizontal:20,
            borderBottomColor:"#bfbfbf",
            borderBottomWidth:1,
            paddingVertical:10,
            marginVertical: 3
          }}>
              <Entypo name="address" size={18} color="#F5af22" style={{flex:1, marginRight:10, marginTop:5}}/>
              <TextInput onChangeText={data=>changeAddressHandler(data)} style={{flex:8, fontSize:14}}>{newAddress}</TextInput>
              <AntDesign name="edit" size={18} color="#999999" style={{flex:1, marginLeft:30}}/>
          </View>
          <View style={{
            paddingHorizontal:20,
            flexDirection:'row',
            paddingHorizontal:10,
            marginHorizontal:20,
            borderBottomColor:"#bfbfbf",
            borderBottomWidth:1,
            paddingVertical:10,
            marginVertical: 3
          }}>
              <AntDesign name="enviroment" size={18} color="#F5af22" style={{flex:1, marginRight:10, marginTop:10}}/>
              <Text onChangeText={val=>changeGPSHandler(val)} style={{flex:8, fontSize:14, marginTop:10}}>Lat: {newlat.toFixed(5)}, Long: {newlong.toFixed(5)}</Text>
              <TouchableOpacity style={{width:40, height:40, backgroundColor:toggleScan===false?"#2E2E2E":"#178239",
                justifyContent:"center", alignContent:"center", alignItems:"center", borderRadius:5}}
                onPress={turnOnToggle}>
              <MaterialIcons name="gps-fixed" size={24} color="#fff"/>
              </TouchableOpacity>
              
          </View>
          
          
          <View style={{
            paddingHorizontal:20,
            flexDirection:'row',
            marginHorizontal:20,  
            marginTop:20,
            paddingVertical:10,
            justifyContent:"center",
            alignContent:"center"
          }}>
              <TouchableOpacity onPress={useHome} style={{backgroundColor:"#bfbfbf", width:100, height:50, marginHorizontal:10, justifyContent:"center", alignContent:"center",
                borderRadius:10}}>
                <Text style={{textAlign:"center", fontSize:16}}>Reset</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={saveChanges} style={{backgroundColor:"#F5af22", width:200, height:50, marginHorizontal:10, justifyContent:"center", alignContent:"center",
                borderRadius:10}}>
                <Text style={{textAlign:"center", fontSize:16}}>Save Changes</Text>
              </TouchableOpacity>
              
              
          </View>
          
        </View>
    </ScrollView>
  )
}

export default Me

const styles = StyleSheet.create({
  contain:{
    flex : 1,
  },  
  top:{
    position:'relative',
    backgroundColor: '#290038',
    flex: 1,
    borderBottomLeftRadius:300,
    borderBottomRightRadius:300,
    borderBottomWidth:1,
    borderBottomColor:'#F5af22'

  },
  down:{
    flex:2,
    marginTop:30
  },
  soja:{
    padding:20,
    flexDirection:'row',
    alignItems:'center' ,
    paddingHorizontal:50 ,
    borderBottomWidth:1,
    borderColor:'#cacaca'

  }
})
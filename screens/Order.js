import React, { Component, useState, useRef, useMemo, useEffect } from 'react';
import { Dimensions, StatusBar, KeyboardAvoidingView, Picker, ActivityIndicator, StyleSheet, View, Text, Button, FlatList, Image, Alert, Platform, ToastAndroid, TouchableOpacity, Modal, ScrollView, Animated, TextInput } from 'react-native';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import { mapGrayStyle, mapDarkStyle, mapStandardStyle } from '../components/mapData';
import { FontAwesome5 } from '@expo/vector-icons';

import * as Notifications from "expo-notifications"
import * as Permissions from "expo-permissions"
import Constants from "expo-constants"

let liveLat= 6.677266942995464
let liveLong=-1.571421502504538

let markers = [
  {latitude: 6.676932165275779, longitude: -1.5644701054124046, type:"d"},
  {latitude: 6.674077500349983, longitude: -1.5821534362004266, type:"r"},
  { latitude: 6.66555431727484, longitude: -1.56334488709714, type:"d"}

]

const Order = () => {
  const getCurrLatLong = () =>{
    /* navigator.geolocation.getCurrentPosition(pos =>{           
         setLiveLat(pos.coords.longitude)
        setLiveLong(pos.coords.latitude) 
        liveLong = pos.coords.longitude
        liveLat = pos.coords.latitude
        //setReceiverLat(pos.coords.latitude)
        //setReceiverLong(pos.coords.longitude)
                  

        //return pos
        //    }, error => Alert.alert(error.message),
        //    { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }) */
           
}



useEffect(() => {
  // Good!
  getCurrLatLong(); // Side-effect!
}, []);

    let [busy, setBusy] = useState(false)
    let [myDispatchers, setMyDispatchers] =useState([]);
    let [myRequestors, setMyRequestors] = useState([]);
    let [myOrders, setMyOrders] = useState([]);
    
    let [myID, setMyID] = useState(511894);
    let [refresh, setRefresh] = useState(0);

    
    //const [markers, setTheMarkers] = useState(myDispatchers);
    //const [markerDesign, setMarkerDesign] = useState(require('./assets/img/img/shopper_light.png'));
    const [markerDesign, setMarkerDesign] = useState()

    let [requestType, setRequestType] = useState(1);
    let [markerChoice, setMarkerChoice] = useState("shopper");

    let switchMarkers=(type)=>{

        if (type===1){
            setTheMarkers([]);
            setRequestType(type);
            //setMarkerDesign(require('./assets/img/img/shopper_light.png'));           
            setMarkerDesign();           
            //setMapState(initialMapState);
        }else if(type===2){
            setTheMarkers([]);
            setRequestType(type);
            setMarkerDesign();           
            //setMapState(initialMapState);

        }

    } 

    let [myNewLat, setmyNewLat] = useState(liveLat)
    let [myNewLong, setmyNewLong] = useState(liveLong)
    var [regionlatitudeDelta, setRegLatDelta] = useState(0.0298);
    var [regionlongitudeDelta, setRegLongDelta] = useState(0.0298);

    const initialMapState ={
  
        markers,   
        region: {
            latitude: liveLat,
            longitude:  liveLong,
            latitudeDelta: regionlatitudeDelta,
            longitudeDelta: regionlongitudeDelta,

        },
    };

    


    const [mapState, setMapState] = useState(initialMapState);
    let mapIndex = 0;
    //let mapAnimation = new Animated.Value(0);

  /*   useEffect(() => {
        mapAnimation.addListener(({ value }) => {
          
          let index = Math.floor(value / CARD_WIDTH + 0.3); 
          if (index >= mapState.markers.length) {
            index = mapState.markers.length - 1;
          }
          if (index <= 0) {
            index = 0;
          }
    
          clearTimeout(regionTimeout);
    
          const regionTimeout = setTimeout(() => {
            if( mapIndex !== index ) {
              mapIndex = index;
              const { coordinate } = mapState.markers[index];
              _map.current.animateToRegion(
                {
                  ...coordinate,
                  latitudeDelta: mapState.region.latitudeDelta,
                  longitudeDelta: mapState.region.longitudeDelta,
                },
                350
              );
            }
          }, 10);
        });
      });
 */
    
  /*     const interpolations = markers.map((marker, index) => {

        const inputRange = [
          (index - 1) * CARD_WIDTH,
          index * CARD_WIDTH,
          ((index + 1) * CARD_WIDTH),
        ];
    
        const scale = mapAnimation.interpolate({
          inputRange,
          outputRange: [1, 2, 1],
          extrapolate: "clamp"
        });
    
        return { scale };

        
      }); */

  /*     const onMarkerPress = (mapEventData) => {
        const markerID = mapEventData._targetInst.return.key;
    
        let x = (markerID * CARD_WIDTH) + (markerID * 20); 
        if (Platform.OS === 'ios') {
          x = x - SPACING_FOR_CARD_INSET;
        }
    
        _scrollView.current.scrollTo({x: x, y: 0, animated: true});
      } */

    const _map = useRef(null);
    const _scrollView = useRef(null);


  
  return (
    
    <MapView style={styles.container}
    key={refresh}
    ref={_map}
    provider={PROVIDER_GOOGLE}
    showsUserLocation={true}
    followUserLocation={true}
    pitchEnabled={true}
    showsCompass={true}
    showsBuildings={true}

    customMapStyle={ mapDarkStyle }
    initialRegion={mapState.region}>

  
    
    {/* Plotting Markers.................... */}


    <Marker 
        coordinate={{latitude: myNewLat, longitude: myNewLong }} 
        title='Home'
        description={"You" }>

        <Image
          source={require('../assets/pin_yellow.png')}
          style={{width: 24, height: 42}}
          resizeMode="contain"
          />
      </Marker>

      <MapView.Circle
                    
                    center={{latitude:  !liveLat? myNewLat:liveLat , longitude: !liveLong?myNewLong: liveLong}}
                    radius={700}
                    strokeWidth={1}
                    strokeColor="#fff"
                    fillColor={requestType ===1?'rgba(255, 219, 56, 0.08)': 'rgba(56, 195, 255, 0.08)'}
                />



{markers.map((markers, index)=>{
                    
                            <MapView.Marker key={index} coordinate={{latitude: markers.latitude, longitude: markers.longitude}}
                            onPress={(e)=>onMarkerPress(e)}> 
                  
                                <View style={[styles.markerWrap]}> 
                                    {
                                    // <Animated.Image source={require('./assets/img/img/shopper_light.png')} style={[styles.marker, scaleStyle]} resizeMode='contain'/>
                                    <Text style={styles.marker} >
                                         <FontAwesome5 name="user-friends" size={20} color="#fff" />    
                                    </Text>
                                    
                                    }
                                    
                                </View>
                            </MapView.Marker>
                })}

</MapView>


  )
}

export default Order

const styles = StyleSheet.create({
  screenContainer: { 
      flex: 1,     
      width: '100%',
      //height:'100%',
      backgroundColor: '#000',
      alignItems: 'center',
      alignContent: 'center'
  },
  container: {
      flex: 1,
      width: '100%',
      height:'100%',
      backgroundColor: '#000',
      alignItems: 'center',
      alignContent: 'center'
  },
})
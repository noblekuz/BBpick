import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  Touchable
} from 'react-native';
import { Entypo } from '@expo/vector-icons'

const Signup = () => {
 
    const [countries, SetCountries] = useState([])
    const [filteredCountries, SetFilteredCountries] = useState([])
    const [isLoaded, SetIsLoaded] = useState(false)
    const [isDropdownActive, SetIsDropdownActive] = useState(false)
    const [selectedCountry, SetSelectedCountry] = useState({})
    const [searchText, SetSearchText] = useState('')


    let initialSelectedCountryName = 'ghana';

  // ! Add useClickOutside
    function toggleDropdown(force) {
      if (force == null) SetIsDropdownActive((v) => !v)
      else SetIsDropdownActive(force)
      SetSearchText('')
    }

    function find(text, expression) {
      return expression.toLowerCase().includes(text.toLowerCase())
    }

      useEffect(() => {
          async function tempFunc() {
          const data = await fetchCountriesData()
          const mappedData = data?.map(country => {
        return {
          flag: country.flags.png,
          name: country.name.common,
          codes: country.idd.suffixes?.map(
            suffix => `${country.idd.root}${suffix}`
          ) ?? [country.idd.root],
        }
      })

      SetCountries(mappedData)

      SetIsLoaded(true)
    }

    tempFunc()
  }, [])

  useEffect(() => {
    SetSelectedCountry(countries.filter(country => {
      return find(initialSelectedCountryName, country.name)
    })[0])
    SetFilteredCountries(countries)
  }, [countries])

  useEffect(() => {
    SetFilteredCountries(countries.filter(country => {
      return find(searchText, country.name)
    }))
  }, [searchText])

  useEffect(() => {
    console.log(filteredCountries?.length)
  }, [filteredCountries])
  
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.bigText}>Sign up</Text>
          <Text style={styles.normalText}>Let's start by creating your account</Text>
  
        </View>
  
        <View style={styles.form}>
          <View style={styles.twoColumn}>
            <View style={{ flex: 1, marginRight: 7 }}>
              <Text style={styles.label}>First Name</Text>
              <TextInput style={styles.input} placeholder="Eg. John" />
            </View>
  
            <View style={{ flex: 1, marginLeft: 7 }}>
              <Text style={styles.label}>Last Name</Text>
              <TextInput style={styles.input} placeholder="Eg. Doe" />
            </View>
          </View>
  
          <View style={{ marginTop: 10 }}>
            <Text style={styles.label}>Phone Number</Text>
            <View style={styles.phoneInput}>
              {isLoaded &&
                <>
                  <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => toggleDropdown()}>
                    <View style={styles.countryImage}>
                      <Image source={{ uri: selectedCountry.flag }} style={{ width: '100%', height: '100%' }} />
                    </View>
                    <Entypo name="chevron-down" size={20} color="coral" style={{ marginLeft: 5 }} />
  
                  </TouchableOpacity>
                  <Text style={{ marginHorizontal: 10 }}>
                    {selectedCountry.codes[0]}
                  </Text>
                </>
              }
              <TextInput style={styles.rawInput} id="phone" type="tel" name="phone" placeholder=" 833456647" keyboardType='numeric' />
            </View>
          </View>
  
          {isDropdownActive &&
            <View style={styles.dropdownContainer}>
              <View style={{ flex: 1 }}>
                <TextInput
                  style={styles.input}
                  placeholder="SearchText Country..."
                  onChangeText={SetSearchText}
                  value={searchText}
                />
              </View>
              <View style={{ maxHeight: 200, width: 200 }}>
                {isLoaded &&
                  <FlatList
                    data={filteredCountries}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        style={styles.dropdownListItem}
                        onPress={() => {
                          SetSelectedCountry(item)
                        }}
                      >
                        <View style={{ ...styles.countryImage, marginLeft: 0 }}>
                          <Image source={{ uri: item.flag }} style={{ width: '100%', height: '100%' }} />
                        </View>
                        <Text style={{ flex: 1, marginHorizontal: 5 }}>{item.name}</Text>
                        <Text>{item.codes[0]}</Text>
                      </TouchableOpacity>
                    )}
                  />
                }
              </View>
            </View>
          }
  
          <View style={{ marginTop: 10 }}>
            <Text style={styles.label}>Email Address</Text>
            <TextInput style={styles.input} placeholder="Enter email address" keyboardType='email-address' />
          </View>
  
          <View style={{flex:1, top: 300 }}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
            <View style={{flexDirection: 'row', justifyContent:'center', alignContent: 'flex-end', marginTop: 20}}>
              <Text style={styles.bottomText}>Already have an account?</Text>
              <TouchableOpacity>
                <Text style={{...styles.bottomText, color:'#0af', fontSize: 18, marginLeft: 5}}>Log in</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
  
        <StatusBar style="auto" />
      </View>
)}


export default Signup
const styles = StyleSheet.create({
    container: {
     // ...StyleSheet.absoluteFillObject,
      //paddingTop: 30,
      paddingVertical:40,
      flex:1,
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
    },
  
    header: {
      alignItems: 'center',
      paddingVertical: 20,
      flex: 0
    },
  
    bigText: {
      fontSize: 24,
      fontWeight: 'bold'
    },
  
    normalText: {
      fontSize: 16,
    },
  
    twoColumn: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
  
    form: {
      paddingHorizontal: 20,
      flex: 3
    },
  
    label: {
      fontSize: 14,
      fontWeight: 'bold',
      color: '#666'
    },
  
    input: {
      backgroundColor: '#0002',
      borderRadius: 8,
      fontSize: 16,
      paddingVertical: 10,
      paddingHorizontal: 15,
      width: '100%',
    },
  
    rawInput: {
      fontSize: 16,
      paddingVertical: 10,
      paddingRight: 15,
      width: '100%',
    },
  
    phoneInput: {
      backgroundColor: '#0002',
      borderRadius: 8,
      flexDirection: 'row',
      alignItems: 'center'
    },
  
    countryImage: {
      width: 30,
      height: 18,
      marginLeft: 10,
      borderRadius: 7,
      overflow: 'hidden',
    },
  
    dropdownContainer: {
      position: 'absolute',
      top: 120,
      left: 30,
      zIndex: 10,
      padding: 20,
      paddingBottom: 5,
      borderRadius: 10,
      backgroundColor: '#f4f4f4',
      borderColor: '#000',
      borderWidth: 1,
      // Box shadow
      // elevation: 1,
      // shadowColor: '#000a',
      // shadowRadius: 2,
    },
  
    dropdownListItem: {
      flexDirection: 'row',
      paddingHorizontal: 5,
      paddingVertical: 10,
    },
  
    fave: {
      
      backgroundColor: '#e0c736',
      borderRadius: 25,
      top: 300,
      paddingStart: 1,
      textAlign: 'center',
      fontWeight: 'bold'
    },
    button: {
      backgroundColor: '#e0c736',
      padding: 15,
      borderWidth: 2,
      borderRadius: 10,
    },
    buttonText:{
      fontSize: 18,
      textAlign: 'center',
      color: '#333',
      fontWeight: 'bold',
    },
    bottomText: {
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    
  });
  

  
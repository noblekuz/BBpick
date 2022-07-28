import React from 'react';
import { TouchableOpacity,Text, FlatList, StyleSheet,  } from 'react-native'

export default function callCountries() {

  const [countries, SetCountries] = useState (
    {name: 'Ghana', key:'1'},
    {name: 'Togo', key:'2'},
    {name: 'Canada', key:'3'},
    {name: 'China', key:'4'},
    {name: 'Germany', key:'5'},
    {name: 'England', key:'6'},
    {name: 'USA', key:'7'}
  )
    return (
      <TouchableOpacity>
        <FlatList 
          data = {countries}
          renderItem={(item) => (
            <View style={styles.list}>
                <Text>{item.name}</Text>
            </View>
          )}
        />
      </TouchableOpacity>
    )
} 
const styles = StyleSheet.create({
  list : {
    height: 150,
    width: 80,
    borderWidth: 1,
    borderColor: "black",
    padding: 6,
  }
})



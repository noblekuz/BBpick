import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';

const Login = () => {
  return (
    <View style={styles.container}>
       <Text>THIS IS A LOG IN PAGE</Text>
    </View>
)}

export default Login

const styles = StyleSheet.create({
    container: {
      paddingVertical:40,
      flex:1,
      backgroundColor: '#290038',
      alignItems: 'center',
      justifyContent: 'center',
    },
})
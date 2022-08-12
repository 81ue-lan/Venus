import React, { Component } from 'react';
import { 
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';


const HomeScreen = ({navigation}) =>{
  return(
    <View style={styles.container}>
      <LinearGradient
       // Background Linear Gradient
       colors={['#F7F9BF', '#D1ACDE']}
       style={styles.background}
      />
      
      <View style={{flex:2,alignItems:'center',justifyContent:'center'}}>
        <Image style={styles.logo} source={require('./assets/logo.png')} ></Image>
        <Text style={{ color: '#000', fontSize: 50 , fontFamily:'Georgia' }}> VENUS </Text>
      </View>

      <View style={{flex:1}}>
        {/* <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}> */}
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('TabNavigator')}>
          <Text style={styles.buttonText}> 開始 </Text>
        </TouchableOpacity>
      </View>
  
  </View>
  )
};
  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    padding: 5,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#947EBE',
    borderRadius: 100,
    shadowColor: '#000000',
    shadowOpacity: 0.4,
    shadowRadius: 1,
    shadowOffset: {
    height: 1,
    width: 0,
    },
  },
  text: {
    backgroundColor: 'transparent',
    fontSize: 15,
    color: '#fff',
  },
  buttonText: {
    //字
    color: '#000',
    fontSize: 20,
    fontWeight: 'bold',
    //橢圓
    padding: 10,
    paddingLeft: 110,
    paddingRight: 110,
  },
  logo: {
    width: 350,
    height: 350,
  },
});

export default HomeScreen;
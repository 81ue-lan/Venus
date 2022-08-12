import React from 'react';
import { View,Text,StyleSheet,Pressable,TextInput,Image,useWindowDimensions } from 'react-native';


const CustomButton = ({onPress,text,type="PRIMARY",bgColor,fgColor}) => {
  return(
    <Pressable 
      onPress={onPress} 
      style={[
        styles.container,
        styles[`container_${type}`],
        bgColor ? {backgroundColor:bgColor} : {}
        ]}>
      <Text style={[
        styles.text,
        styles[`text_${type}`],
        fgColor ? {color:fgColor} : {},
        ]}>{text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
    container:{
      backgroundColor:'#947EBE',
      width:'100%',
      padding:15,
      marginVertical:5,
      alignItems:'center',
      borderRadius: 100,
    },

    container_PRIMARY:{
      backgroundColor:'#947EBE',
    },

    container_TERTIARY:{
      backgroundColor:'#D9C9F5',
    },

    text:{
      fontWeight:'bold',
      color:'black',
    },

    text_TERTIARY:{
      fontWeight:'bold',
      color:'gray',
    },
  })

export default CustomButton
import React from 'react';
import { View,Text,TextInput,Image,StyleSheet,useWindowDimensions } from 'react-native';
import { Controller } from 'react-hook-form';

const CustomInput = ({
  control,
  name,
  rules ={},
  placeholder,
  secureTextEntry
}) => {
  return(
      <Controller 
          control={control}
          name={name}
          rules={rules}
          render={({field: {value, onChange, onBlur},fieldState:{error}}) => (
          <>
          <View style={[styles.container,{borderColor: error ? 'red' : '#D1ACDE'}]}>    
          <TextInput 
            value={value} 
            onChangeText={onChange} 
            onBlur={onBlur} 
            placeholder={placeholder} 
            style={styles.input}
            secureTextEntry={secureTextEntry}
            placeholderTextColor = "#888"
            />
            </View>
            {error && (<Text style={{color:'red',alignSelf:'stretch'}}>{error.message || '錯誤'}</Text>
            )}
            </>
            )}
        />
    
  );
};

const styles = StyleSheet.create({
    container:{
      backgroundColor:'white',
      width:'100%',
      padding:20,

      borderColor:'#D1ACDE',
      borderWidth: 1,
      borderRadius:100,

      paddingHorizontal:10,
      marginVertical:8,
    },
    input:{
    },
  })

export default CustomInput
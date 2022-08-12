import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Gap} from '../..';
import { useNavigation } from '@react-navigation/native';

const BoxItemTopProduct = ({bgColor, text, effect}) => {
  const navigation = useNavigation(); 
  return (
    <View style={styles.container(bgColor)}>
        <View>
          <Gap height={15} />
          <Text style={styles.text}>{text}</Text>
        </View>
        <Gap height={15} />
          <Text style={styles.wrapperButtom}>{effect}</Text>
        <Gap height={15} />
          <TouchableOpacity  style={styles.contentButton}  onPress={() => navigation.navigate('scanResult')}>
            <Text>內容</Text>
          </TouchableOpacity>
    </View>
  );
};

export default BoxItemTopProduct;

const styles = StyleSheet.create({
  container: bgColor => ({
    height: 150,
    width: 150,
    backgroundColor: bgColor,
    borderRadius: 12,
    marginHorizontal: 10,
    marginVertical: 10,
    backgroundColor:'#F7F9BF',
    justifyContent:'center',
    alignItems:'center',
    
  }),
  text: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  wrapperButtom: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  contentButton:{
    backgroundColor:'#ccc',
    padding: 10,
    borderRadius:10,
    width:65,
    justifyContent:'center',
    alignItems:'center',
    
  }
});
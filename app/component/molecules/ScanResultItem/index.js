import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Gap} from '../..';
import { useNavigation } from '@react-navigation/native';

const ScanResultItem = ({bgColor, text, effect}) => {
  return (
    
    <View style={styles.container(bgColor)}>
        <View>
          <Gap height={15} />
          <Text style={styles.text}>{text}</Text>
        </View>
        <Gap height={15} />
          <Text style={styles.wrapperButtom}>{effect}</Text>
        <Gap height={15} />
    </View>
  );
};

export default ScanResultItem;

const styles = StyleSheet.create({
  container: bgColor => ({
    height: 130,
    width: 350,
    backgroundColor: bgColor,
    borderRadius: 12,
    marginHorizontal: 10,
    marginVertical: 10,
    paddingLeft:25,
    backgroundColor:'#F7F9BF',
    justifyContent:'center',
    
  }),
  text: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  wrapperButtom: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  
});
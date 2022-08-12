import React,{useState} from 'react';
import { View,Text,Image,StyleSheet,useWindowDimensions } from 'react-native';
import Logo from '../assets/logo.png';
import CustomInput from '../../component/CustomInput/CustomInput';
import CustomButton from '../../component/CustomButton/CustomButton';
import { useNavigation } from '@react-navigation/native';
import {useForm, } from 'react-hook-form';

const ForgotPassword = () => {
  // const [name,setName] = useState('');
  const {control, handleSubmit,formState:{errors},} = useForm();

  const {height} = useWindowDimensions();
  const navigation =useNavigation();

  const onLoginPressed = () => {
    navigation.navigate('Login');
  };

  const onSendPressed = (data) => {
    console.warn(data);
    navigation.navigate('NewPassword');
  };
  
  return(
    <View style={styles.root}>
      <View style={styles.background}/>
      <Image 
      source={Logo} 
      style={[styles.logo,{height: height*0.3}]} 
      resizeMode="contain"
      />
      <Text style={styles.title}>重設密碼</Text>

      <CustomInput  
      name="User_Name" 
      placeholder="使用者名稱" 
      control={control} 
      rules={{required: '此處不能為空'}}/>
        

      <CustomButton text="傳送" onPress={handleSubmit(onSendPressed)} />
      <View style={styles.line}></View>

      <CustomButton 
        text="回到登入" 
        onPress={onLoginPressed}
        type="TERTIARY" />
    </View>
  )
}

const styles = StyleSheet.create({
  root:{
    alignItems:'center',
    padding: 20,
  },
  logo:{
    width:'70%',
    maxWidth:300,
    maxHeight:200,
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 180,
    bottom: 50,
    margin: 5,
    backgroundColor: '#D9C9F5',
    borderRadius: 16,
},
  line:{
    height: 0,
    width: '100%',
    borderWidth: 0.5,
    borderColor: '#EEE',
    margin: 10,
},
  title:{
    fontSize:20,
    fontWeight:'bold',
    color:'#051C60',
    margin:5,
  },
})
export default ForgotPassword
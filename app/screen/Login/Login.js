import React,{useState} from 'react';
import { View,Text,Image,StyleSheet,useWindowDimensions ,TextInput} from 'react-native';
import Logo from '../assets/logo.png';
import CustomInput from '../../component/CustomInput/CustomInput';
import CustomButton from '../../component/CustomButton/CustomButton';
import { useNavigation } from '@react-navigation/native';
import {useForm, Controller} from 'react-hook-form';

const Login = () => {
  // const [name,setName] = useState('');
  // const [pwd,setPwd] = useState('');
  const {height} = useWindowDimensions();
  const navigation =useNavigation();

  const {control, handleSubmit,formState:{errors},} = useForm();

  const onLoginPressed = (data) => {
    console.log(data);
    //驗證用戶
    navigation.navigate('TabNavigator');
  };

  const onForgotPasswordPressed = () => {
    navigation.navigate('ForgotPassword');
  };

  const onSignupPressed = () => {
    navigation.navigate('Signup');
  };

  return(
    <View style={styles.root}>
      <View style={styles.background}/>
      <Image 
      source={Logo} 
      style={[styles.logo,{height: height*0.3}]} 
      resizeMode="contain"
      />

      <CustomInput 
      name="User_Name"
      placeholder="使用者名稱" 
      control={control} 
      rules={{required: '此處不能為空'}}
      />
      
      <CustomInput 
        name="User_pwd"
        placeholder="密碼" 
        secureTextEntry
        control={control}
        rules={{
          required: '此處不能為空',
           minLength: {
             value:6,
             message:'密碼長度不可小於6位'}}}
        />

        <CustomButton text="登入" onPress={handleSubmit(onLoginPressed)} />
        <View style={styles.line}></View>
        <CustomButton 
          text="忘記密碼?" 
          onPress={onForgotPasswordPressed} 
          type="TERTIARY"/>

        <CustomButton 
          text="還沒有帳號? 註冊" 
          onPress={onSignupPressed}
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
})
export default Login
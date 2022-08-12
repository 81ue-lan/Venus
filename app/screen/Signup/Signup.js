import React,{useState} from 'react';
import { View,Text,Image,StyleSheet,useWindowDimensions } from 'react-native';
import Logo from '../assets/logo.png';
import CustomInput from '../../component/CustomInput/CustomInput';
import CustomButton from '../../component/CustomButton/CustomButton';
import { useNavigation } from '@react-navigation/native';
import {useForm} from 'react-hook-form';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

const Signup = () => {
  // const [name,setName] = useState('');
  // const [email,setEmail] = useState('');
  // const [pwd,setPwd] = useState('');
  // const [pwdRepeat,setPwdRepeat] = useState('');

  const {control,handleSubmit,watch,} = useForm();
  const pwd = watch('User_pwd');

  const {height} = useWindowDimensions();
  const navigation =useNavigation();

  const onLoginPressed = () => {
    
    navigation.navigate('Login');
  };

  const onRegisterPressed = () => {
    console.warn('Register');
  };

  return(
    <View style={styles.root}>
      <View style={styles.background}/>
      <Image 
      source={Logo} 
      style={[styles.logo,{height: height*0.3}]} 
      resizeMode="contain"
      />
      <Text style={styles.title}>建立一個帳號</Text>

      <CustomInput 
        name="User_Name"
        placeholder="使用者名稱" 
        control={control}
        rules={{
          required: '此處不能為空',
          minLength: {
            value:3,
            message:'名稱長度不可小於3位'},
          maxLength: {
              value:24,
              message:'名稱長度不可大於24位'}}}
        />
        <CustomInput 
        name="User_Email"
        placeholder="信箱" 
        control={control}
        rules={{required: '此處不能為空',
        pattern:{value:EMAIL_REGEX,message:'信箱格式錯誤'}}}
        />
      <CustomInput 
        name="User_pwd"
        placeholder="密碼" 
        control={control}
        secureTextEntry
        rules={{
          required: '此處不能為空',
          minLength: {
             value:6,
             message:'密碼長度不可小於6位'}}}
        />
      <CustomInput 
        name="User_pwdRepeat"
        placeholder="再次輸入密碼" 
        control={control}
        secureTextEntry
        rules={{
          validate: value => value === pwd || '密碼不一致',}}
        />

        <CustomButton text="註冊" onPress={handleSubmit(onRegisterPressed)} />
        {/* <Text style={styles.text}>通過註冊，您確認您接受我們的使用條款和隱私政策</Text> */}
        <View style={styles.line}></View>
        <CustomButton 
          text="已經有帳號了? 登入" 
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
export default Signup
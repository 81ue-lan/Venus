import React from 'react';
import {SafeAreaView,StyleSheet,Text,} from 'react-native'
import HomeScreen from './app/screen/Home';
import ScanResultScreen from './app/screen/scanResult';
import Quiz from './app/screen/Quiz';
import TabNavigator from './app/navigation/TabNavigator';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// import SignupScreen from './app/screen/sign-up';
// import AccountSettingScreen from './app/screen/Account-setting/Accountsetting';

// import Login from './app/screen/Login/Login';
// import Signup from './app/screen/Signup/Signup';
// import ConfirmEmail from './app/screen/ConfirmEmail/ConfirmEmail';
// import ForgotPassword from './app/screen/ForgotPassword/ForgotPassword';
// import NewPassword from './app/screen/NewPassword/NewPassword';

const Stack = createNativeStackNavigator();

export default function App(){
  return(
    <SafeAreaView style={styles.root}>
     <NavigationContainer theme={MyTheme}>
        <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{headerShown:false}} /> 
         <Stack.Screen name="TabNavigator" component={TabNavigator} options={{headerShown:false}}/> 
         <Stack.Screen name="Quiz" component={Quiz} options={{headerShown:false}}/>
         <Stack.Screen name="scanResult" component={ScanResultScreen} options={{headerTitle:"掃描結果",headerTintColor:"#ffffff"}}/> 

         {/* <Stack.Screen name="Accountsetting" component={AccountSettingScreen} options={{headerTitle:"帳號設定",headerTintColor:"#fff"}}/>
         <Stack.Screen name="Login" component={Login} options={{headerShown:false}}/> 
         <Stack.Screen name="Signup" component={Signup} options={{headerShown:false}}/> 
         <Stack.Screen name="ConfirmEmail" component={ConfirmEmail} options={{headerShown:false}}/> 
         <Stack.Screen name="ForgotPassword" component={ ForgotPassword} options={{headerShown:false}}/> 
         <Stack.Screen name="NewPassword" component={NewPassword} options={{headerShown:false}}/> 
         <Stack.Screen name="sign-up" component={SignupScreen} options={{headerTitle:"",headerTintColor:"#ffffff"}}/>  */}
              
       </Stack.Navigator>
      </NavigationContainer>
      </SafeAreaView> 
  );
}


const MyTheme = {
  dark: false,
  colors: {
    background: 'white',
  },
};

const styles = StyleSheet.create({
  root:{
    flex: 1,
  },
})
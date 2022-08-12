import React, {useState} from 'react';
import CustomSwitch from '../component/CustomSwitch';
import { 
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput
} from 'react-native';



export default function SignupScreen({navigation}) {

  const [gamesTab, setGamesTab] = useState(1);

  const onSelectSwitch = value => {
    setGamesTab(value);
  };
   
    state = {
        email: '',
        password: '',
        intro:'',
     }
     handleEmail = (text) => {
        this.setState({ email: text })
     }
     handlePassword = (text) => {
        this.setState({ password: text })
     }
  
     handleIntro = (text) => {
        this.setState({ intro: text })
     }
  
     register = (email, pass,intro) => {
        alert('email: ' + email + '\n password: ' + pass + "\n intro:" + intro)
        }

   

  
      return (
    <View style={styles.container}>
        <View style={styles.background}/>
          <View style={styles.container}>
            <Image style={styles.logo} source={require('./assets/logo.png')} ></Image>
          </View>

          {gamesTab==1 && 
                <View>
                  <View style={styles.bottmContainer}>
                  <CustomSwitch
            selectionMode={1}
            option1="登入"
            option2="註冊"
            onSelectSwitch={onSelectSwitch}
          /></View>
                    <TextInput 
                    style = {styles.input}
                    underlineColorAndroid = "transparent"
                    placeholder = "信箱"
                    placeholderTextColor = "#888"
                    autoCapitalize = "none"
                    keyboardType = "email-address"
                    returnKeyType = "next"
                    //onChangeText = {this.handleEmail}
                    />              
    
                    <TextInput 
                    style = {styles.input}
                    underlineColorAndroid = "transparent"
                    placeholder = "密碼"
                    placeholderTextColor = "#888"
                    autoCapitalize = "none"
                    returnKeyType = "next"
                    secureTextEntry = {true}
                   //onChangeText = {this.handlePassword}
                    />
    
                    <TouchableOpacity
                    style = {styles.submitButton}
                    onPress = { () => navigation.navigate('TabNavigator')
                    }>
                    <Text style = {styles.submitButtonText}>登入</Text>
                    </TouchableOpacity>
                </View>
          }

          {gamesTab==2 && 
            <View>
              <View style={styles.bottmContainer}>
                  <CustomSwitch
            selectionMode={2}
            option1="登入"
            option2="註冊"
            onSelectSwitch={onSelectSwitch}
          /></View>
            <TextInput 
            style = {styles.input}
            underlineColorAndroid = "transparent"
            placeholder = "姓名"
            placeholderTextColor = "#888"
            autoCapitalize = "none"
            numberOfLines = {1}
            returnKeyType="done"
            //onChangeText = {this.handleIntro}
            />

            <TextInput 
            style = {styles.input}
            underlineColorAndroid = "transparent"
            placeholder = "信箱"
            placeholderTextColor = "#888"
            autoCapitalize = "none"
            keyboardType = "email-address"
            returnKeyType = "next"
            //onChangeText = {this.handleEmail}
            />              

            <TextInput 
            style = {styles.input}
            underlineColorAndroid = "transparent"
            placeholder = "密碼"
            placeholderTextColor = "#888"
            autoCapitalize = "none"
            returnKeyType = "next"
            secureTextEntry = {true}
            //onChangeText = {this.handlePassword}
            />

            <TouchableOpacity
            style = {styles.submitButton}register
            onPress = {() => {setGamesTab(1);}}>
            <Text style = {styles.submitButtonText}>註冊</Text>
            </TouchableOpacity>
          </View>
          }
            
    </View>
 
         
      );
    }


const styles = StyleSheet.create({
    container: {
        paddingTop: 23,
        alignItems: 'center',
        justifyContent: 'center',
     },
     input: {
        margin: 15,
        paddingLeft:8,
        height: 53,
        borderColor: '#D1ACDE',
        borderWidth: 1,
        borderRadius: 100,
     },
     submitButton: {
        backgroundColor: '#947EBE',
        padding: 20,
        paddingLeft: 130,
        paddingRight: 130,
        alignItems:'center',
        margin: 30,
        height: 60,
        borderRadius: 100,
        shadowColor: '#000000',
        shadowOpacity: 0.4,
        shadowRadius: 1,
        shadowOffset: {
        height: 1,
        width: 0,
        },
     },
     submitButtonText:{
        color: 'black',
        fontWeight: 'bold',
        fontSize:18,
     },

    bottmContainer: {
      height: 45,
      width: 330,
      flexDirection: 'row',
      left: 15,
    },
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 180,
        bottom: 0,
        margin: 5,
        backgroundColor: '#D9C9F5',
        borderRadius: 30,
    },
    button: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonText: {
      fontSize: 18,
      color: '#fff',
      fontWeight: 'bold',
    },
    title: {
      fontSize: 30,
      color: '#000',
      fontWeight: 'bold',
      backgroundColor: 'rgba(0,0,0,0)'
    },
    desc: {
      fontSize: 20,
      color: '#000',
      backgroundColor: 'rgba(0,0,0,0)',
      textAlign: 'center'
    },
    logo: {
        width: 230,
        height: 230,
      },
  });
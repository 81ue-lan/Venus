import React from 'react';
import {Alert, Linking, View, SafeAreaView, StyleSheet,Image,ScrollView} from 'react-native';
import {
  Title,
  Caption,
  Text,
  TouchableRipple,
  ImageBackground,
} from 'react-native-paper';
import Venus from './assets/venus.png';
import { COLORS, SIZES } from '../constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { assertStatusValuesInBounds } from 'expo-av/build/AV';

const SettingScreen = ({navigation}) => {
  // 開啟外部網頁
  const userGuideUrl = "https://venus-mu.vercel.app/";
  const openUrl = async (url) => {
    try{
      const isSupported = await Linking.canOpenURL(url);
      if (isSupported) {
          await Linking.openURL(url);
      } else {
          Alert.alert(`Don't know how to open this url: ${url}`);
      }
    } 
    catch (error) {
      console.log('Error');
    }
  }


  return (
    <ScrollView style={styles.container}>

      <View style={styles.userInfoSection}>
        <View style={{flexDirection: 'row', marginTop: 15}}>
          <Image 
            source={Venus}
            size={130}
          />
          <View style={{marginLeft: 30}}>
            <Title style={[styles.title, {
              marginTop:15,
              marginBottom: 5,
            }]}>VENUS</Title>
            <Caption style={styles.caption}>保養品成分識別</Caption>
          </View>
        </View>
      </View>
      <View style={styles.menuWrapper}>

        {/* <TouchableRipple onPress={() => {navigation.navigate('NewPassword');}}>
          <View style={styles.menuItem}>
		  	<Ionicons name="person-outline" color="#000" size={25} />
            <Text style={styles.menuItemText}>帳號設定</Text>
          </View>
        </TouchableRipple> */}

        <TouchableRipple  onPress={() => {navigation.navigate('Quiz')}}>
          <View style={styles.menuItem}>
		  	<Ionicons name="document-outline" color="#000" size={25} />
            <Text style={styles.menuItemText}>膚質測驗</Text>
          </View>
        </TouchableRipple>
       
        <TouchableRipple onPress={() => {openUrl(userGuideUrl)}} >
          <View style={styles.menuItem}>
		  	<Ionicons name="book-outline" color="#000" size={25} />
            <Text style={styles.menuItemText} >使用說明</Text>
          </View>
        </TouchableRipple>

        {/* <TouchableRipple onPress={() => {navigation.navigate('Home')}} >
          <View style={styles.menuItem}>
		  	<Ionicons name="md-exit-outline" color="#000" size={25} />
            <Text style={styles.menuItemText} >登出</Text>
          </View>
        </TouchableRipple> */}
      </View>
      
    </ScrollView>
  );
};

export default SettingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,	
    marginTop:10,
  },
  userInfoSection: {
	paddingBottom:45,
	paddingTop:80,
  marginBottom: 30,
	backgroundColor: '#D9C9F5',
	borderBottomLeftRadius:20,
	borderBottomRightRadius:20,
  alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  infoBoxWrapper: {
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,
    borderTopColor: '#dddddd',
    borderTopWidth: 1,
    flexDirection: 'row',
    height: 100,
  },
  infoBox: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: '#000',
    marginLeft: 20,
    fontWeight: '600',
    fontSize: 18,
    lineHeight: 26,
  },
});
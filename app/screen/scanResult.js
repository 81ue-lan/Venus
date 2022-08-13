// import React, { useEffect, useState } from "react";
// import { 
//   StyleSheet,
//   View,
//   TextInput,
//   ScrollView,
//   TouchableOpacity,
//   FlatList,
//   Text
// } from 'react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import { dataTopProducts } from "../data/dataArrays";
// import {ScanResultItem,Gap} from '../component';

// import AsyncStorage from "@react-native-async-storage/async-storage";
// import * as SQLite from 'expo-sqlite';


// export default function ScanResultScreen({navigation}) {
   
//   const [productName, setProductName] = useState("");
//   const [productUse, setProductUse] = useState("");
//   const [brand, setBrand] = useState("");
//   const [value, setvalue] = useState('');

//   multiSet = async () => {
//     const firstPair = ["@MyApp_user", JSON.stringify(productName)]
//     const secondPair = ["@MyApp_key", JSON.stringify(productUse)]
//     try {
//       await AsyncStorage.multiSet([firstPair, secondPair])
//     } catch(e) {
//       //save error
//     }
  
//     console.log("Done.")
//   }
  
//   const multiMerge = [
//     ["@MyApp_USER_1", JSON.stringify(USER_1_DELTA)],
//     ["@MyApp_USER_2", JSON.stringify(USER_2_DELTA)]
//   ]
  
  
//   mergeMultiple = async () => {
//     let currentlyMerged
  
//     try {
//       await AsyncStorage.multiSet(multiSet)
//       await AsyncStorage.multiMerge(multiMerge)
//       currentlyMerged = await AsyncStorage.multiGet(['@MyApp_USER_1', '@MyApp_USER_2'])
//     } catch(e) {
//       // error
//     }
  
//     console.log(currentlyMerged)
  
//       return (
      
//           <View style={styles.container} >
//                 <View style={styles.background} >
//                   <View style={{flexDirection: 'row',justifyContent:'flex-end'}}>
//                   <TouchableOpacity style={{paddingTop:10,paddingRight:10,paddingLeft: 10,}} onPress={saveValue}>
//                   <Ionicons name="ios-happy-outline" color="#000" size={30} />
//                   </TouchableOpacity>
//                   <TouchableOpacity style={{paddingTop:10,paddingRight:25,paddingLeft: 10,}}  onPress={getValue}>
//                   <Ionicons name="md-sad-outline" color="#000" size={30} />
//                   </TouchableOpacity>
//                   </View>
//                     <TextInput 
//                     style = {styles.input}
//                     underlineColorAndroid = "transparent"
//                     placeholder = "產品名稱"
//                     placeholderTextColor = "#888"
//                     autoCapitalize = "none"
//                     returnKeyType = "next"
//                     value={productName}
//                     onChangeText={setProductName}
//                     />
              
//                   {/* <TextInput 
//                     style = {styles.input}
//                     underlineColorAndroid = "transparent"
//                     placeholder = "產品用途"
//                     placeholderTextColor = "#888"
//                     autoCapitalize = "none"
//                     returnKeyType = "next"
//                     value={productUse}
//                     onChangeText={setProductUse}
//                     />

//                   <TextInput 
//                     style = {styles.input}
//                     underlineColorAndroid = "transparent"
//                     placeholder = "品牌/公司"
//                     placeholderTextColor = "#888"
//                     autoCapitalize = "none"
//                     keyboardType = "email-address"
//                     returnKeyType = "next"
//                     value={brand}
//                     onChangeText={setBrand}
//                     /> */}
//                     </View>

                 

          
//                     <Text>{value}</Text>
          
//                   {/* scanResultItem */}
//                     {/* <View style={{flex: 1}}>
//                       <ScrollView showsVerticalScrollIndicator={false}>
//                         <View style={styles.sectionScanResult}>
                          
//                         {dataTopProducts.map((item, index) => {
//                           return (
//                           <ScanResultItem
//                             key={index}
//                             text={item.name}
//                             effect={item.effect}
//                           />
//                           );
//                       })}
          
//                         </View>
//                       </ScrollView>
//                   </View> */}
                  
//     </View>
    
 
         
//       );
//     }


// const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//      },
//      input: {
//         margin: 5,
//         paddingLeft:8,
//         height: 53,
//         borderColor: '#D1ACDE',
//         borderWidth: 1,
//         borderRadius: 100,
//      },
//     background: {
//         flex:1/2,
//         marginTop:0,
//         marginBottom:5,
//         paddingBottom:12,
//         backgroundColor: '#D9C9F5',
//         borderBottomLeftRadius:20,
// 	      borderBottomRightRadius:20,
//     },
//     button: {
//       flex: 1,
//       justifyContent: 'center',
//       alignItems: 'center',
//     },
//     buttonText: {
//       fontSize: 18,
//       color: '#fff',
//       fontWeight: 'bold',
//     },
//     title: {
//       fontSize: 30,
//       color: '#000',
//       fontWeight: 'bold',
//       backgroundColor: 'rgba(0,0,0,0)'
//     },
//     desc: {
//       fontSize: 20,
//       color: '#000',
//       backgroundColor: 'rgba(0,0,0,0)',
//       textAlign: 'center'
//     },
//     sectionScanResult: {
     
//       flexDirection: 'row',
//       flexWrap: 'wrap',
//       justifyContent: 'center',
//     }, 
//   });
// }


import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
} from 'react-native';
import Note from '../components/Note';
import NoteInputModal from '../components/NoteInputModal';
import NotFound from '../components/NotFound';
import RoundIconBtn from '../components/RoundIconBtn';
// import SearchBar from '../components/SearchBar';
import { useNotes } from '../contexts/NoteProvider';
import colors from '../misc/colors';

const reverseData = data => {
  return data.sort((a, b) => {
    const aInt = parseInt(a.time);
    const bInt = parseInt(b.time);
    if (aInt < bInt) return 1;
    if (aInt == bInt) return 0;
    if (aInt > bInt) return -1;
  });
};

const ScanResultScreen = ({ user, navigation }) => {
 
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [resultNotFound, setResultNotFound] = useState(false);

  const { notes, setNotes, findNotes } = useNotes();


  const reverseNotes = reverseData(notes);

  const handleOnSubmit = async (title, desc) => {
    const note = { id: Date.now(), title, desc, time: Date.now() };
    const updatedNotes = [...notes, note];
    setNotes(updatedNotes);
    await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes));
  };

  const openNote = note => {
    navigation.navigate('NoteDetail', { note });
  };

  const handleOnSearchInput = async text => {
    setSearchQuery(text);
    if (!text.trim()) {
      setSearchQuery('');
      setResultNotFound(false);
      return await findNotes();
    }
    const filteredNotes = notes.filter(note => {
      if (note.title.toLowerCase().includes(text.toLowerCase())) {
        return note;
      }
    });

    if (filteredNotes.length) {
      setNotes([...filteredNotes]);
    } else {
      setResultNotFound(true);
    }
  };

  const handleOnClear = async () => {
    setSearchQuery('');
    setResultNotFound(false);
    await findNotes();
  };

  return (
    <>
      <StatusBar barStyle='dark-content' backgroundColor={'#aaa'} />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          {/* {notes.length ? (
            <SearchBar
              value={searchQuery}
              onChangeText={handleOnSearchInput}
              containerStyle={{ marginVertical: 15 }}
              onClear={handleOnClear}
            />
          ) : null} */}

          {resultNotFound ? (
            <NotFound />
          ) : (
            <FlatList
              data={reverseNotes}
              numColumns={2}
              columnWrapperStyle={{
                justifyContent: 'space-between',
                marginBottom: 15,
              }}
              keyExtractor={item => item.id.toString()}
              renderItem={({ item }) => (
                <Note onPress={() => openNote(item)} item={item} />
              )}
            />
          )}

          {!notes.length ? (
            <View
              style={[
                StyleSheet.absoluteFillObject,
                styles.emptyHeaderContainer,
              ]}
            >
              <Text style={styles.emptyHeader}>Add Notes</Text>
            </View>
          ) : null}
        </View>
      </TouchableWithoutFeedback>
      <RoundIconBtn
        onPress={() => setModalVisible(true)}
        antIconName='plus'
        style={styles.addBtn}
      />
      <NoteInputModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handleOnSubmit}
      />
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  container: {
    paddingHorizontal: 20,
    flex: 1,
    zIndex: 1,
  },
  emptyHeader: {
    fontSize: 30,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    opacity: 0.2,
  },
  emptyHeaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: -1,
  },
  addBtn: {
    position: 'absolute',
    right: 15,
    bottom: 50,
    zIndex: 1,
  },
});

export default ScanResultScreen;


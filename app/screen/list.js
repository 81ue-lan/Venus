// import React ,{useState} from 'react';
// import { Image,StyleSheet,Text, View, SafeAreaView,TextInput,FlatList,TouchableHighlight,ScrollView} from 'react-native'
// import DropDownPicker from 'react-native-dropdown-picker';

// import { dataTopProducts } from "../data/dataArrays";
// import { getCategoryName } from "../data/MockDataAPI";


// import {
// 	BoxItemTopProduct,
// 	Gap,
//   } from '../component';



// const ListScreen = ({navigation}) => {
//   const [open, setOpen] = useState(false);
//   const [value, setValue] = useState(null);
//   const [items, setItems] = useState([
//       { label: '我擁有的保養品', value: '我擁有的保養品' },
//       { label: '我想要的保養品', value: '我想要的保養品' },
//       { label: '我的蜜糖', value: '我的蜜糖' },
//       { label: '我的毒藥', value: '我的毒藥' }
//   ]);



// return (

// <SafeAreaView style={{flex: 1}}>
//     {/* search */}
//     {/* <View style={{flex: 1/8}}>
// 	<View style={{paddingHorizontal: 20}}>
// 	  <View style={styles.wrapperSearch}>
// 		<TextInput placeholder="請輸入保養品名稱" style={styles.textInputSearch} />
// 	  </View>
// 	</View>
//   </View> */}

// 	{/*DropDownPicker */}
//   <View style={{flex: 1/3,paddingHorizontal: 30}}>
// 	<DropDownPicker
//               open={open}
//               value={value}
//               items={items}
//               setOpen={setOpen}
//               setValue={setValue}
//               setItems={setItems}
//           />
//           </View>


// 	{/* top products */}
//   <View style={{flex: 2/3}}>
// 	<ScrollView showsVerticalScrollIndicator={true}>
// 	  <View style={styles.sectionBoxTopProduct}>
// 		{dataTopProducts.map((item, index) => {
// 		  return (
// 			<BoxItemTopProduct
// 			  key={index}
// 			  text={item.name}
// 			  effect={item.effect}
// 			/>
// 		  );
// 		})}
    
// 	  </View>
//   </ScrollView>
//   </View>
// </SafeAreaView>
// );
// }


// const styles= StyleSheet.create({	
//   wrapperSearch: {
//     height: 40,
//     backgroundColor: '#947EBE',
//     borderRadius: 100,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: 25,
//   },
//   scrollViewCategories: {
//     paddingLeft: 20,
//   },
//   wrapperHeadTopProducts: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingHorizontal: 20,
//     marginBottom: 10,
//   },
//   titleTopProducts: {
//     color:'#ccc',
//     fontSize: 20,
//   },
//   textSeeAll: {
//     color: '#ccc',
//     fontSize: 12,
//   },
//   sectionBoxTopProduct: {
//     flex: 1,
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'center',
//   },
// });

// export default ListScreen

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

const ListScreen = ({ user, navigation }) => {
 
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

export default ListScreen;

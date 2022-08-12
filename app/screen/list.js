import React ,{useState} from 'react';
import { Image,StyleSheet,Text, View, SafeAreaView,TextInput,FlatList,TouchableHighlight,ScrollView} from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker';

import { dataTopProducts } from "../data/dataArrays";
import { getCategoryName } from "../data/MockDataAPI";


import {
	BoxItemTopProduct,
	Gap,
  } from '../component';



const ListScreen = ({navigation}) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
      { label: '我擁有的保養品', value: '我擁有的保養品' },
      { label: '我想要的保養品', value: '我想要的保養品' },
      { label: '我的蜜糖', value: '我的蜜糖' },
      { label: '我的毒藥', value: '我的毒藥' }
  ]);



return (

<SafeAreaView style={{flex: 1}}>
    {/* search */}
    {/* <View style={{flex: 1/8}}>
	<View style={{paddingHorizontal: 20}}>
	  <View style={styles.wrapperSearch}>
		<TextInput placeholder="請輸入保養品名稱" style={styles.textInputSearch} />
	  </View>
	</View>
  </View> */}

	{/*DropDownPicker */}
  <View style={{flex: 1/3,paddingHorizontal: 30}}>
	<DropDownPicker
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
          />
          </View>


	{/* top products */}
  <View style={{flex: 2/3}}>
	<ScrollView showsVerticalScrollIndicator={true}>
	  <View style={styles.sectionBoxTopProduct}>
		{dataTopProducts.map((item, index) => {
		  return (
			<BoxItemTopProduct
			  key={index}
			  text={item.name}
			  effect={item.effect}
			/>
		  );
		})}
    
	  </View>
  </ScrollView>
  </View>
</SafeAreaView>
);
}


const styles= StyleSheet.create({	
  wrapperSearch: {
    height: 40,
    backgroundColor: '#947EBE',
    borderRadius: 100,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 25,
  },
  scrollViewCategories: {
    paddingLeft: 20,
  },
  wrapperHeadTopProducts: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  tittleTopProducts: {
    color:'#ccc',
    fontSize: 20,
  },
  textSeeAll: {
    color: '#ccc',
    fontSize: 12,
  },
  sectionBoxTopProduct: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
});

export default ListScreen
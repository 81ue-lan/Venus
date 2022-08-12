// import React, {useState} from 'react';
// import { 
//   StyleSheet,
//   View,
//   TextInput,
//   ScrollView,
//   TouchableOpacity,
// } from 'react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import { dataTopProducts } from "../data/dataArrays";
// import {ScanResultItem,Gap} from '../component';

// export default function ScanResultScreen({navigation}) {
   
//     state = {
//         intro:'',
//      } 
//      handleIntro = (text) => {
//         this.setState({ intro: text })
//      }

//       return (
      
//           <View style={styles.container} >
//                 <View style={styles.background} >
//                   <View style={{flexDirection: 'row',justifyContent:'flex-end'}}>
//                   <TouchableOpacity style={{paddingTop:10,paddingRight:10,paddingLeft: 10,}}  >
//                   <Ionicons name="bookmark-outline" color="#000" size={25} />
//                   </TouchableOpacity>
//                   <TouchableOpacity style={{paddingTop:10,paddingRight:25,paddingLeft: 10,}}  >
//                   <Ionicons name="ios-cart-outline" color="#000" size={25} />
//                   </TouchableOpacity>
//                   </View>
//                     <TextInput 
//                     style = {styles.input}
//                     underlineColorAndroid = "transparent"
//                     placeholder = "產品名稱"
//                     placeholderTextColor = "#888"
//                     autoCapitalize = "none"
//                     returnKeyType = "next"
//                     //onChangeText = {this.handleIntro}
//                     />              
    
//                   <TextInput 
//                     style = {styles.input}
//                     underlineColorAndroid = "transparent"
//                     placeholder = "產品用途"
//                     placeholderTextColor = "#888"
//                     autoCapitalize = "none"
//                     returnKeyType = "next"
//                     //onChangeText = {this.handleIntro}
//                     />

//                   <TextInput 
//                     style = {styles.input}
//                     underlineColorAndroid = "transparent"
//                     placeholder = "品牌/公司"
//                     placeholderTextColor = "#888"
//                     autoCapitalize = "none"
//                     keyboardType = "email-address"
//                     returnKeyType = "next"
//                     //onChangeText = {this.handleIntro}
//                     />
//                     </View>    
         
         
          
//           	{/* scanResultItem */}
//               <View style={{flex: 1}}>
//                 <ScrollView showsVerticalScrollIndicator={false}>
//                   <View style={styles.sectionScanResult}>
                    
//                   {dataTopProducts.map((item, index) => {
//                     return (
//                     <ScanResultItem
//                       key={index}
//                       text={item.name}
//                       effect={item.effect}
//                     />
//                     );
//                 })}
      
//                     </View>
//                   </ScrollView>
//               </View>
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


import React, { useEffect, useState } from "react";
import { View, Text, StatusBar, TextInput, Button, FlatList } from "react-native";
import { openDatabase } from "react-native-sqlite-storage";

const db = openDatabase({
  name: "rn_sqlite",
});

const ScanResultScreen = () => {
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);

  const createTables = () => {
    db.transaction(txn => {
      txn.executeSql(
        `CREATE TABLE IF NOT EXISTS categories (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(20))`,
        [],
        (sqlTxn, res) => {
          console.log("table created successfully");
        },
        error => {
          console.log("error on creating table " + error.message);
        },
      );
    });
  };

  const addCategory = () => {
    if (!category) {
      alert("Enter category");
      return false;
    }

    db.transaction(txn => {
      txn.executeSql(
        `INSERT INTO categories (name) VALUES (?)`,
        [category],
        (sqlTxn, res) => {
          console.log(`${category} category added successfully`);
          getCategories();
          setCategory("");
        },
        error => {
          console.log("error on adding category " + error.message);
        },
      );
    });
  };

  const getCategories = () => {
    db.transaction(txn => {
      txn.executeSql(
        `SELECT * FROM categories ORDER BY id DESC`,
        [],
        (sqlTxn, res) => {
          console.log("categories retrieved successfully");
          let len = res.rows.length;

          if (len > 0) {
            let results = [];
            for (let i = 0; i < len; i++) {
              let item = res.rows.item(i);
              results.push({ id: item.id, name: item.name });
            }

            setCategories(results);
          }
        },
        error => {
          console.log("error on getting categories " + error.message);
        },
      );
    });
  };

  const renderCategory = ({ item }) => {
    return (
      <View style={{
        flexDirection: "row",
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderColor: "#ddd",
      }}>
        <Text style={{ marginRight: 9 }}>{item.id}</Text>
        <Text>{item.name}</Text>
      </View>
    );
  };

  useEffect(async () => {
    await createTables();
    await getCategories();
  }, []);

  return (
    <View>
      <StatusBar backgroundColor="#222" />

      <TextInput
        placeholder="Enter category"
        value={category}
        onChangeText={setCategory}
        style={{ marginHorizontal: 8 }}
      />

      <Button title="Submit" onPress={addCategory} />

      <FlatList
        data={categories}
        renderItem={renderCategory}
        key={cat => cat.id}
      />
    </View>
  );
};

export default ScanResultScreen;
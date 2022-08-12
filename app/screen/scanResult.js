import React, { useEffect, useState } from "react";
import { 
  StyleSheet,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Button
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { dataTopProducts } from "../data/dataArrays";
import {ScanResultItem,Gap} from '../component';

import * as SQLite from 'expo-sqlite';
import { openDatabase } from "react-native-sqlite-storage";

const db = SQLite.openDatabase({
  name: "result_sqlite",
});

export default function ScanResultScreen({navigation}) {
   
  const [productName, setProductName] = useState("");
  const [productUse, setProductUse] = useState("");
  const [brand, setBrand] = useState("");
  const [all, setAll] = useState([]);

  const createTables = () => {
    db.transaction(txn => {
      txn.executeSql(
        `CREATE TABLE IF NOT EXISTS `
        + `products` 
        + `(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, use TEXT, brand TEXT)`,
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


  const addAll = () => {
    if (!productName) {
      alert("請輸入產品名稱");
      return false;
    }
    // if(!productUse) {
    //   alert("請輸入產品用途");
    //   return false;
    // }
    // if(!brand){
    //   alert("請輸入品牌/公司");
    //   return false;
    // }

    db.transaction(txn => {
      txn.executeSql(
        `INSERT INTO products (name, use, brand) VALUES (?,?,?)`,
        [productName,productUse,brand],
    
        (sqlTxn, res) => {
          console.log(`${productName},${productUse},${brand} added successfully`);
          getAll();
          setProductName("");
          // setProductUse("");
          // setBrand("");
        },
        error => {
          console.log("error on adding products" + error.message);
        },
      );
    });
  };

  const getAll = () => {
    db.transaction(txn => {
      txn.executeSql(
        "SELECT id,name, use, brand FROM products",
        [],
        (sqlTxn, res) => {
          console.log("products retrieved successfully");
          let len = res.rows.length;

          if (len > 0) {
            let results = [];
            for (let i = 0; i < len; i++) {
              let item = res.rows.item(i);
              results.push({ id:item.id, name: item.name });
            }

            setAll(results);
          }
        },
        error => {
          console.log("error on getting products " + error.message);
        },
      );
    });
  };


  const renderData = ({ item }) => {
    return (
      <View style={{
        flexDirection: "row",
        paddingVertical: 520,
        paddingHorizontal: 500,
        borderBottomWidth: 1,
        borderColor: "#ddd",
        backgroundColor:"#000",
        backgroundColor:'#aaa'
      }}>
        <Text style={{ marginRight: 9 }}>{item.id}</Text>
        <Text>{item.name}</Text>
        <Text>{item.use}</Text>
        <Text>{item.brand}</Text>
      </View>
    );
  };

  useEffect(() => {
    createTables();
    getAll();
  }, []);



      return (
      
          <View style={styles.container} >
                <View style={styles.background} >
                  <View style={{flexDirection: 'row',justifyContent:'flex-end'}}>
                  <TouchableOpacity style={{paddingTop:10,paddingRight:10,paddingLeft: 10,}} >
                  <Ionicons name="bookmark-outline" color="#000" size={25} />
                  </TouchableOpacity>
                  <TouchableOpacity style={{paddingTop:10,paddingRight:25,paddingLeft: 10,}}  >
                  <Ionicons name="ios-cart-outline" color="#000" size={25} />
                  </TouchableOpacity>
                  </View>
                    <TextInput 
                    style = {styles.input}
                    underlineColorAndroid = "transparent"
                    placeholder = "產品名稱"
                    placeholderTextColor = "#888"
                    autoCapitalize = "none"
                    returnKeyType = "next"
                    value={productName}
                    onChangeText={setProductName}
                    />
              
                  <TextInput 
                    style = {styles.input}
                    underlineColorAndroid = "transparent"
                    placeholder = "產品用途"
                    placeholderTextColor = "#888"
                    autoCapitalize = "none"
                    returnKeyType = "next"
                    value={productUse}
                    onChangeText={setProductUse}
                    />

                  <TextInput 
                    style = {styles.input}
                    underlineColorAndroid = "transparent"
                    placeholder = "品牌/公司"
                    placeholderTextColor = "#888"
                    autoCapitalize = "none"
                    keyboardType = "email-address"
                    returnKeyType = "next"
                    value={brand}
                    onChangeText={setBrand}
                    />
                    </View>

                    
                  <Button title="Submit" onPress={addAll} />
                  
                  {/* input data */}
                    <FlatList
                      data={all}
                      renderItem={renderData}
                      key={prod => prod.id}
                    />

         
          
                  {/* scanResultItem */}
                    {/* <View style={{flex: 1}}>
                      <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={styles.sectionScanResult}>
                          
                        {dataTopProducts.map((item, index) => {
                          return (
                          <ScanResultItem
                            key={index}
                            text={item.name}
                            effect={item.effect}
                          />
                          );
                      })}
          
                        </View>
                      </ScrollView>
                  </View> */}
    </View>
 
         
      );
    }


const styles = StyleSheet.create({
    container: {
      flex: 1,
     },
     input: {
        margin: 5,
        paddingLeft:8,
        height: 53,
        borderColor: '#D1ACDE',
        borderWidth: 1,
        borderRadius: 100,
     },
    background: {
        flex:1/2,
        marginTop:0,
        marginBottom:5,
        paddingBottom:12,
        backgroundColor: '#D9C9F5',
        borderBottomLeftRadius:20,
	      borderBottomRightRadius:20,
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
    sectionScanResult: {
     
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
    }, 
  });



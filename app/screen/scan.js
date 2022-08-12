// import React from 'react';
// import {View, Image, TouchableOpacity, Platform,StyleSheet,Text,} from 'react-native'
// import { launchImageLibrary } from 'react-native-image-picker';

// const SERVER_URL = 'http://localhost:8080';
//     const createFormData = (photo, body = {}) => {
//       const data = new FormData();
    
//       data.append('photo', {
//         name: photo.fileName,
//         type: photo.type,
//         uri: Platform.OS === 'ios' ? photo.uri.replace('file://', '') : photo.uri,
//       });
    
//       Object.keys(body).forEach((key) => {
//         data.append(key, body[key]);
//       });
    
//       return data;
//     };

//   const ScanScreen = ({}) => {
//       const [photo, setPhoto] = React.useState(null);
    
//       const handleChoosePhoto = () => {
//         launchImageLibrary({ noData: true }, (response) => {
//            console.log(response);
//           if (response) {
//             setPhoto(response);
//           }
//         });
//       };
    
//       const handleUploadPhoto = () => {
//         fetch(`${SERVER_URL}/api/upload`, {
//           method: 'POST',
//           body: createFormData(photo),
//         })
//           .then((response) => response.json())
//           .then((response) => {
//             console.log('response', response);
//           })
//           .catch((error) => {
//             console.log('error', error);
//           });
//       };
    
//       return (
//         <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//           {photo && (
//             <>
//               <Image
//                 source={{ uri: photo.uri }}
//                 style={{ width: 300, height: 300 }}
//               />
//               <TouchableOpacity style={styles.button} onPress={handleUploadPhoto} >
//               <Text style={styles.buttonText}> 上傳照片 </Text>
//               </TouchableOpacity>
//             </>
//           )}
//           <TouchableOpacity style={styles.button}  onPress={handleChoosePhoto} >
//           <Text style={styles.buttonText}> 選擇照片 </Text>
//           </TouchableOpacity>
//         </View>
//       );
//     };

//  export default ScanScreen;

//  const styles = StyleSheet.create({
//  button: {
//   alignItems: 'center',
//   justifyContent: 'center',
//   marginTop: 20, 
//   width: '80%', 
//   backgroundColor: '#947EBE', 
//   padding: 20, borderRadius: 100
// },
// buttonText: {
//   //字
//   color: '#fff',
//   fontSize: 20,
//   fontWeight: 'bold',}
// });

import React, { Component } from 'react';
import { StyleSheet, Text, View, PixelRatio, TouchableOpacity, Image, TextInput, Alert } from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';

export default class ScanScreen extends Component {
  constructor() {
    super();
    this.state = {
      ImageSource: null,
      data: null,
      Image_TAG: ''
    }
  }

getPermissionAsync = async () => {
    // Camera roll Permission 
    if (Platform.OS === 'android') {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
    // Camera Permission
    const { status } = await Permissions.askAsync(Permissions.CAMERA,Permissions.AUDIO_RECORDING
);
    this.setState({ hasPermission: status === 'granted' });
  }

  handleCameraType=()=>{
    const { cameraType } = this.state
    this.setState({cameraType:
      cameraType === Camera.Constants.Type.back
      ? Camera.Constants.Type.front
      : Camera.Constants.Type.back
    })
  }

  pickImage = async () => {
    let response = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,allowsEditing: true,
      aspect: [1,1],
      quality: 1,
    });
    if (!response.cancelled) {
       console.log(response.uri);
        this.setState({
          ImageSource: response.uri,
          data: response.data
        });
      }
  }

  uploadImageToServer = async () => {
   const response = await fetch(this.state.ImageSource);
    const blob = await response.blob();
    var reader = new FileReader();
    reader.onload = () => {

      var InsertAPI = 'http://11993fb0a6aa.ngrok.io/Server/upload.php';
      console.log(reader.result);
            var Data={img:reader.result};
            var headers={
            'Accept':'application/json',
            'Content-Type':'application.json'
            }
            fetch(InsertAPI,{
                method:'POST',
                headers:headers,
                body:JSON.stringify(Data),
            }).then((response)=>response.json()).then((response)=>{
                console.log(response)
            })
            .catch(err=>{
                console.log(err);
                
            })  
}
reader.readAsDataURL(blob);
            }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.pickImage.bind(this)}>
          <View style={styles.ImageContainer}>
            {this.state.ImageSource === null ? <Text>選擇照片</Text> :
              <Image style={styles.ImageContainer} source={{uri:this.state.ImageSource}} />
            }
          </View>
        </TouchableOpacity>

{/* 
        <TextInput
          placeholder="Enter Image Name "
          onChangeText={data => this.setState({ Image_TAG: data })}
          underlineColorAndroid='transparent'
          style={styles.TextInputStyle}
        /> */}


        <TouchableOpacity onPress={this.uploadImageToServer} activeOpacity={0.6} style={styles.button} >
          <Text style={styles.TextStyle}> 上傳照片 </Text>
        </TouchableOpacity>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20
  },
  ImageContainer: {
    borderRadius: 10,
    width: 250,
    height: 250,
    borderColor: '#9B9B9B',
    borderWidth: 1 / PixelRatio.get(),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  TextInputStyle: {
    textAlign: 'center',
    height: 40,
    width: '80%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#028b53',
    marginTop: 20
  },
  button: {
    width: '50%',
    backgroundColor: '#947EBE',
    borderRadius: 100,
    marginTop: 20
  },
  TextStyle: {
    color: '#fff',
    textAlign: 'center',
    padding: 10
  }
});
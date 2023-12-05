import React, {useEffect, useState, useRef} from 'react'
import {Camera, useCameraDevice} from 'react-native-vision-camera'
import { View, Text, StyleSheet, TextInput, Button, ToastAndroid, TouchableOpacity, Image } from 'react-native';
import { Link, useNavigation } from '@react-navigation/native';


import Profile from "../../../assets/img/profile.png"

function CameraComponente() {
    const navigation = useNavigation();
    const camera = useRef(null);
    const device = useCameraDevice('front', {
        physicalDevices: ['wide-angle-camera']
     });
    


    const [showCamera, setShowCamera] = useState(false)
    const [imageSource, setImageSource] = useState('');


    useEffect(() => {
        async function getPermission() {
            const newCameraPermission = await Camera.requestCameraPermission();
            console.log(newCameraPermission)
        }
        getPermission();
    }, [])

    const capturePhoto = async() => {
        if(camera.current != null) {
            const photo = await camera.current.takePhoto({});
            setImageSource(photo.path);
            setShowCamera(false);
            console.log(photo.path)
            console.log(imageSource)
        }
    }


    if (device == null) {
        return ToastAndroid.show('Camera indisponível!', 3)
    }


    const voltarPerfil = () => {
        navigation.navigate('Perfil');
    }


    
    const uploadFirebase = () => {
        console.log('salvar imagem no firebase')
    }



  return (
    <View style={styles.container}>
        {showCamera ? (
            <>
                <Camera 
                    ref={camera}
                    style={StyleSheet.absoluteFill}
                    device={device}
                    isActive={showCamera}
                    photo={true}
                />

                <View style={styles.buttonContainer}>
                    <TouchableOpacity 
                        style={styles.camButton}
                        onPress={() => capturePhoto()}
                    />
                </View>
            </>
        ) : (
            <>

                {/* {console.log('bati no log')}
                {imageSource !== '' ? (
                    <Image
                        style={styles.image}
                        source={{
                            uri: `file://${imageSource}`,
                        }}
                    />
                ) : null && console.log('imagem aparecendo')} */}
                
                

          
                {imageSource !== '' ? (
                    <View style={styles.imageContainer}>
                        <Image
                            style={styles.image}
                            source={{
                                uri: `file://'${imageSource}`,
                            }}
                            rotate={90}
                        />
                    </View>
                        
                ) : null}

                <View style={styles.backButton}>
                    <TouchableOpacity
                        style={{
                            backgroundColor: '#000',
                            padding: 10,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 10,
                            borderWidth: 2,
                            borderColor:'#fff', 
                            width: 100,
                        }}
                        onPress={() => voltarPerfil()}>
                        <Text style={{color: 'white', fontWeight: '500'}}>Voltar</Text>
                        </TouchableOpacity>
                </View>

                <View style={styles.buttonContainer}>
                    <View style={styles.buttons}>  
                        <TouchableOpacity
                            style={{
                                backgroundColor: '#000',
                                padding: 10,
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 10,
                                borderWidth: 2,
                                borderColor:'#000', 
                    
                            }}
                            onPress={() => setShowCamera(true)}>
                            <Text style={{color: '#fff', fontWeight: '500'}}>Tirar Foto</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={{
                                backgroundColor: '#000',
                                padding: 10,
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 10,
                                borderWidth: 2,
                                borderColor:'white', 
                    
                            }}
                            onPress={() => uploadFirebase()}>
                            <Text style={{color: '#fff', fontWeight: '500'}}>Salvar foto</Text>
                        </TouchableOpacity>
                    </View>
                </View>


            </>
        )}
    </View>
  )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#000',
    },
    buttonContainer: {
      position: 'absolute',
      bottom: 20,
      left: 0,
      right: 0,
      flexDirection: 'row',
      justifyContent: 'center',
    },
    camButton: {
      width: 60,
      height: 60,
      backgroundColor: '#fff',
      borderRadius: 30,
    },
    imageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
    image: {
        width: '150%',
        height: '150%',
        resizeMode: 'contain',
        'transform': 'rotate(90deg)'
      },
    backButton: {
      position: 'absolute',
      top: 20,
      left: 20,
    },
    buttons: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    retakeButton: {
      backgroundColor: '#000',
      padding: 10,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
      borderWidth: 2,
      borderColor: '#000',
      marginRight: 10,
    },
    usePhotoButton: {
      backgroundColor: '#000',
      padding: 10,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
      borderWidth: 2,
      borderColor: 'white',
    },
    buttonText: {
      color: '#fff',
      fontWeight: '500',
    },
  });

export default CameraComponente
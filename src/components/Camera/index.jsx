import React, {useEffect, useState, useRef} from 'react'
import {Camera, useCameraDevice} from 'react-native-vision-camera'
import { View, Text, StyleSheet, TextInput, Button, ToastAndroid, TouchableOpacity, Image } from 'react-native';
import { Link, useNavigation } from '@react-navigation/native';


import storage from '@react-native-firebase/storage';




function CameraComponente() {
    console.log('bateu no compoente de camrea')
    const navigation = useNavigation();
    const camera = useRef(null);
    const device = useCameraDevice('front', {
        physicalDevices: ['wide-angle-camera']
     });
    


    const [showCamera, setShowCamera] = useState(true)
    const [imageSource, setImageSource] = useState('');

    const [uri, setUri] = useState('')
    const [filename, setFilename] = useState('')
 

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
  
            let uri = `file:/${photo.path}`
            setUri(uri)
            setFilename('lucasrpmedici@gmail.com')
          
        }
    }


    if (device == null) {
        return ToastAndroid.show('Camera indisponível!', 3)
    }


    const voltarPerfil = () => {
        navigation.navigate('Perfil');
    }


    
    const uploadFirebase = async () => {
        const reference = storage().ref(`/imgs/${filename}`)
        try {
            await reference.putFile(uri);
            navigation.navigate('Principal')
            ToastAndroid.show('Foto cadastrada com sucesso!', 3)
        } catch (error){
            ToastAndroid.show('Erro ao enviar imagem!', 3)
            navigation.navigate('Principal')

        }
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
                    
          
                {imageSource !== '' ? (
                    <View style={styles.imageContainer}>
                        <Image
                            style={styles.image}
                            source={{
                                uri: `file://${imageSource}`,
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
                            borderColor:'#7305CA', 
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
                                borderColor:'#7305CA', 
                    
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
                                borderColor:'#7305CA', 
                    
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
      backgroundColor: '#7305CA',
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
        'transform': [{ rotate: '90deg' }]
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
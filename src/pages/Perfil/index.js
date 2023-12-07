import React, {useContext} from 'react';
import { View, StyleSheet, Image, Text, TextInput, TouchableOpacity, ToastAndroid, Keyboard, KeyboardAvoidingView } from 'react-native';
import Profile from "../../../assets/img/profile.png"
import { AuthContext } from '../../contexts/AuthContext';
import { AtlContext } from '../../contexts/AtlContext';
import { useState, useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';
import { useForm } from 'react-hook-form';
import AntDesign from 'react-native-vector-icons/AntDesign';

import storage from '@react-native-firebase/app'
import CameraComponente from '../../components/Camera';


import { Link, useNavigation } from '@react-navigation/native';

          


export default function Perfil() {
  const { user, setGatilhoBuscarSaldoConta, saldo, imgUrl } = useContext(AuthContext);
  const navigation = useNavigation();
  const [keyboardVisible, setKeyboardVisible] = useState(false);


  const formatCurrency = (value) => {
    let currency = (parseFloat(value)).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });
    return currency
}

  

  const {register, setValue, handleSubmit} = useForm();

      
  const onSubmit = async (data) => {
    const collectionRef = firestore().collection('conta').where('email', '==', user.email);
  
    let docId;
    await collectionRef.get().then((snapshot) => {
      snapshot.forEach((docs) => {
        docId = docs.id;
      });
    });
  
    if (docId) {
      firestore().collection('conta').doc(docId)
      .update({saldo_em_conta: data.valor})
      .then(() => {
        ToastAndroid.show('Saldo Atualizado!', 3)
        setGatilhoBuscarSaldoConta(Math.random())
        navigation.navigate('Principal')

      })
    } else {
      console.error('Documento não encontrado.');
      ToastAndroid.show('Erro ao atualizar!', 3)
    }
  };


  const enviarParaFotos = () => {
    navigation.navigate('Fotos');
  
    
  }


  useEffect(() => {
    register('valor')
  }, [register]) 


  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      }
    );
  
    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);



  const infoContainerStyle = keyboardVisible
  ? { height: '35%' }
  : { height: '25%' };

  return (
    <KeyboardAvoidingView style={stylesPerfil.containerKeyboard} behavior="position">

    
      <View style={stylesPerfil.container}>
        <View style={stylesPerfil.infoProfile}>
          <View style={stylesPerfil.perfil}>
            <TouchableOpacity onPress={() => enviarParaFotos()}>
              {imgUrl ? (
                <Image source={{uri: imgUrl}} style={stylesPerfil.imageDoBanco} />
              ): (
                <Image source={Profile} style={stylesPerfil.image} />
              )
              }
            </TouchableOpacity>
          </View>
          <Text style={stylesPerfil.Text}>{user.displayName}</Text>
        </View>
        <View style={[stylesPerfil.info, infoContainerStyle]}>
          <Text style={stylesPerfil.infoTitle}>Informações do Usuário</Text>
          <View style={stylesPerfil.informations}>
            <Text style={stylesPerfil.infoText}>Nome: {user.displayName}</Text>
            <Text style={stylesPerfil.infoText}>E-mail: {user.email}</Text>
          </View>
        </View>

        <View style={stylesPerfil.info}>
          <Text style={stylesPerfil.infoTitle}>Informações da Conta</Text>
          <View style={stylesPerfil.informationsCount}>
            <Text style={stylesPerfil.infoText}>Saldo: </Text>
            <TextInput  
              style={stylesPerfil.inputContainer}
              keyboardType='numeric'
              placeholder={formatCurrency(saldo)}
              placeholderTextColor='#B7B7B7'
              onChangeText={text => setValue('valor', text)}
            />
            <AntDesign name="edit" color='white' size={20} onPress={handleSubmit(onSubmit)} />
          </View>
        </View>
        
      </View>
      </KeyboardAvoidingView>
  )
}



const stylesPerfil = StyleSheet.create({
  container: {
    paddingTop: 50,
    alignItems: 'center',
    backgroundColor: 'black',
    height: '100%',
    paddingBottom: 10,
    gap: 10
  },
  infoProfile: {
    alignItems: 'center',
  },
  inputContainer: {
    color: 'white',
    width: '40%',
    fontSize: 15,
  },
  perfil: {
    width: 150,
    height: 150,
    backgroundColor: 'white',
    borderRadius: 500,
  },
  imageDoBanco: {
    width: 150,
    height: 150,
    borderRadius: 75, 
    borderWidth: 4,
    borderColor: '#7305CA',
    'transform': [{ rotate: '90deg' }]
  },
  image: {
    width: 150,
    height: 150,
  },
  Text: {
    paddingTop: 10,
    paddingBottom: 30,
    color: 'white',
    fontSize: 25,
  },
  info: {
    width: '90%',
    height: '25%',
    backgroundColor: '#333333',
    borderRadius: 30,
    paddingLeft: 50,
    paddingRight: 50,
    paddingTop: 20,
  },
  infoTitle: {
    color: 'white',
    fontSize: 20,
  },
  informations: {
    paddingTop: 20,
    gap: 10,
  },
  informationsCount: {
    flex:1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  infoText: {
    color: 'white',
    fontSize: 15,
  },
  containerKeyboard: {
    backgroundColor: 'black', 
  
  }
})
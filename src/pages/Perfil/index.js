import React, {useContext} from 'react';
import { View, StyleSheet, Image, Text, TextInput } from 'react-native';
import Profile from "../../../assets/img/profile.png"
import { AuthContext } from '../../contexts/AuthContext';
import { useState, useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';
import { useForm } from 'react-hook-form';
import AntDesign from 'react-native-vector-icons/AntDesign';

import storage from '@react-native-firebase/app'

          


export default function Perfil() {
  const { user } = useContext(AuthContext);
  const [saldo, setSaldo] = useState()


  const formatCurrency = (value) => {
    let currency = (parseFloat(value)).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });
    return currency
}

  async function FuncaoProcura() {
    const collectionRef = firestore().collection('conta').where('email', '==', user.email);
  
    collectionRef.get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          setSaldo(doc.data().saldo_em_conta)
        });
      
  
      })
      .catch(err => {
        console.error('Erro ao obter documentos da coleção:', err);

      });
        
  }


  const {register, setValue, handleSubmit} = useForm();

  // const onSubmit = (data) => {
  //   const collectionRef = firestore().collection('conta').where('email', '==', user.email)

  //   let id;
  //   collectionRef.get()
  //   .then(snapshot => {
  //     snapshot.forEach(docs => {
  //       id=docs.id
  //     })
  //   })
  
   
  // };
      
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
        console.log('user atualizado')
      })
    } else {
      console.error('Documento não encontrado.');
    }
  };

  useEffect(() => {
    FuncaoProcura()
  }, []) 

  useEffect(() => {
    register('valor')
  }, [register]) 

  return (
      <View style={stylesPerfil.container}>
        <View style={stylesPerfil.infoProfile}>
          <View style={stylesPerfil.perfil}>
            <Image source={Profile} style={stylesPerfil.image} />
          </View>
          <Text style={stylesPerfil.Text}>{user.displayName}</Text>
        </View>
        <View style={stylesPerfil.info}>
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
  }
})
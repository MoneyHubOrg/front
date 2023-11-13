import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import TextWithIcon from '../TextWithIcon';

import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import firestore from '@react-native-firebase/firestore';

export default function Atividades() {

  
  let financias = [];

  async function FuncaoProcura() {
    const collectionRef = firestore().collection('financia');

      collectionRef.get()
        .then(snapshot => {
          if (snapshot.empty) {
            console.log('Nenhum documento encontrado na coleção.');
            return;
          }

          snapshot.forEach(doc => {
            console.log('Documento:', doc.id, '=>', doc.data());
            financias.push({id: doc.id, data: doc.data})
          });
          console.log(financias)
        })
        .catch(err => {
          console.error('Erro ao obter documentos da coleção:', err);
        });
        
        }

  FuncaoProcura()



  return (
    <View style={stylesAtividades.container}>
      <View style={stylesAtividades.title}>
        <Text style={stylesAtividades.text}>Atividades</Text>
        <View
          style={{
            borderBottomColor: '#535353',
            borderBottomWidth: StyleSheet.hairlineWidth,
            width: '95%',
            paddingBottom: 10
          }}
        />
        <View style={stylesAtividades.scrollView}>
          <ScrollView style={stylesAtividades.scroll}>
               <View style={stylesAtividades.transacoesContainer}>
                  <TextWithIcon icon="receita" colorTitulo='#828282' colorValor='#45D75C' text="Receita" valor="R$ 50.000,00" />
                  <AntDesign name="gift" color='white' size={25} />
               </View>
          </ScrollView>
        </View>
      </View>
    </View>
  )
}

const stylesAtividades = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: '#333333',
    width: '90%',
  },
  title: {
    paddingTop: 10,
    width: '100%',
    alignItems: 'flex-start',
    paddingLeft: 10
  },
  text: {
    width: '100%',
    paddingLeft: 20,
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
  },
  scrollView: {
    backgroundColor: '#333333',
    width: '90%',
    height: "70%",
    paddingTop: 10
  },
  scroll: {
    width: '100%',
    height: 210
  },
  transacoesContainer: {
   flex: 1,
   flexDirection: 'row',
   alignItems: 'center',
  },
})
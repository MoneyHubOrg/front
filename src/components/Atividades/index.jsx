import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import TextWithIcon from '../TextWithIcon';

import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome'

import firestore from '@react-native-firebase/firestore';

export default function Atividades() {

  const formatCurrency = (value) => {
      let currency = (parseFloat(value)).toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
      });
      return currency
  }
  
  // let financias = [];
  const [loading, setLoading] = useState(false)
  const [financias, setFinancias] = useState([])

  async function FuncaoProcura() {
    setLoading(true)
    const collectionRef = firestore().collection('financia');

      collectionRef.get()
        .then(snapshot => {
          if (snapshot.empty) {
            console.log('Nenhum documento encontrado na coleção.');
            return;
          }

          snapshot.forEach(doc => {
            // console.log('Documento:', doc.id, '=>', doc.data());
            // financias.push({id: doc.id, ...doc.data()})
            // setFinancias({id: doc.id, ...doc.data()})
            setFinancias(prevArray => [...prevArray, {id: doc.id, ...doc.data()}])
    
          });
        
          setLoading(false)
        })
        .catch(err => {
          console.error('Erro ao obter documentos da coleção:', err);
          setLoading(false)
        });
        
        }
    


        useEffect(() => {
          FuncaoProcura()
        }, []) 




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

      {loading ? (
            <Text style={stylesAtividades.text}>Carregando...</Text>
          ) : (
            <View style={stylesAtividades.scrollView}>
            <ScrollView style={stylesAtividades.scroll}>
                {financias.map((t, index) => (
                   <View key={index} style={stylesAtividades.transacoesContainer}>
                      <TextWithIcon 
                        icon={t.tipo_financia === 'Receita' ? 'receita' : 'dispesa'} 
                        colorTitulo='#828282' 
                        colorValor={t.tipo_financia === 'Receita' ? '#45D75C' : '#FF3434'} 
                        text={t.tipo_financia === 'Receita' ? 'Receita' : 'Dispesa'} 
                        valor={formatCurrency(t.valor)} 
                      />
                      <FontAwesome 
                        style={stylesAtividades.icon}
                        name={
                          t.categoria === 'Mercado' ? 'shopping-cart' :
                          t.categoria === 'Comida' ? 'cutlery' :
                          t.categoria === 'Farmácia' ? 'medkit' :
                          t.categoria === 'Lazer' ? 'glass' :
                          t.categoria === 'Viagem' ? 'plane' : null
                        }
                        color='white' 
                        size={25} 
                      />
                    </View>
                ))}
            </ScrollView>
          </View>
          )
        }
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
  icon: {
    paddingRight: 15
  }
})
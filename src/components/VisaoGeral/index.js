import React, {useState, useEffect, useContext} from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Arrows from 'react-native-vector-icons/AntDesign';

import TextWithIconNoDate from '../TextWithIconNoDate';


import firestore from '@react-native-firebase/firestore';
import { AuthContext } from '../../contexts/AuthContext';

export default function VisaoGeral() {
  const { user } = useContext(AuthContext);

  const [loading, setLoading] = useState(false)
  const [receitaFinal, setReceitaFinal] = useState(0)
  const [despesaFinal, setDespesaFinal] = useState(0)


  const formatCurrency = (value) => {
    let currency = (parseFloat(value)).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });
    return currency
}

let receitas=0;
let despesas=0; 

  async function FuncaoProcura() {
 
    setLoading(true)
    const collectionRef = firestore().collection('financia').where('email_usuario', '==', user.email).orderBy("data", "desc");

      collectionRef.get()
        .then(snapshot => {
          if (snapshot.empty) {
            console.log('Nenhum documento encontrado na coleção.');
            return;
          }

         
          snapshot.forEach(doc => {
            if(doc.data().tipo_financia == 'Receita') { 
              receitas = parseFloat(doc.data().valor)  + receitas
              console.log('receitas'+receitas)

            } else if(doc.data().tipo_financia == 'Despesa') { 
              despesas = parseFloat(doc.data().valor) + despesas
              console.log('despesas'+despesas)
 
            }
          });
          setReceitaFinal(receitas)
         setDespesaFinal(despesas)
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
    <View style={stylesVisaoGeral.container}>
      <Text style={stylesVisaoGeral.text}>Visão Geral</Text>

      <View style={stylesVisaoGeral.field}>
        <Arrows name="left" color='white' size={20} style={stylesVisaoGeral.seta} />
        <Text style={stylesVisaoGeral.mes}>Novembro</Text>
        <Arrows name="right" color='white' size={20} style={stylesVisaoGeral.seta} />
      </View>

      {loading ? (
        <Text style={stylesVisaoGeral.text}>Carregando...</Text>
      ): (
        <View style={stylesVisaoGeral.EconomyStatusField}>
          <View style={{flex: 1, marginRight: 20}}>
            <TextWithIconNoDate icon="receita" colorTitulo='#828282' colorValor='#45D75C' text="Receita" valor={formatCurrency(receitaFinal)} />
          </View>
          <View style={{flex: 1}}>
            <TextWithIconNoDate icon="despesa" colorTitulo='#828282' colorValor='#FF3434' text="Despesas" valor={formatCurrency(despesaFinal)} />
          </View>
        </View>
      )}

       

    </View>
  )
}

const stylesVisaoGeral = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    width: '90%',
    alignItems: 'center',
    backgroundColor: '#333333',
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 20,
    // paddingBottom: 20,
    marginBottom: 30,
  },
  text: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
  },
  field: {
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  mes: {
    color: 'white',
    fontSize: 30,
    fontWeight: '400',
    width: '80%',
    textAlign: 'center',
  },
  seta: {
    width: '10%',
  },
  EconomyStatusField: {
    width: '100%',
    flex: 1,
    flexDirection: 'row',
    // justifyContent: 'space-between',
    // alignItems: 'center',
  },
})
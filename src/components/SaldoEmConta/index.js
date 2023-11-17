import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';

import firestore from '@react-native-firebase/firestore';
import { AuthContext } from '../../contexts/AuthContext';

export default function SaldoEmConta({ padding }) {
  const { user } = useContext(AuthContext);

  const [visibility, setVisibility] = useState(true)
  console.log(visibility)
  const [loading, setLoading] = useState(false)
  const [saldo, setSaldo] = useState()

  const toggleVisibility = () => {
    setVisibility(!visibility);
  };

  const formatCurrency = (value) => {
    let currency = (parseFloat(value)).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
    return currency
  }




  async function FuncaoProcura() {
    setLoading(true)
    const collectionRef = firestore().collection('financia').where('email', '==', user.email);

    collectionRef.get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          // pegando valor e somando se for receita e subtaindo se for despesa
          if (doc.data().tipo === 'Receita') {
            setSaldo(saldo + doc.data().valor)
          } else {
            setSaldo(saldo - doc.data().valor)
          }
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
    <View
      style={[
        stylesSaldoEmConta.container,
        { paddingLeft: padding || 'auto' }
      ]}
    >
      <Text style={stylesSaldoEmConta.title}>Saldo em Conta</Text>
      {loading ? (
        <Text style={stylesSaldoEmConta.text}>Carregando...</Text>
      ) : (
        <View style={stylesSaldoEmConta.field}>
          <Text style={stylesSaldoEmConta.subTitle}>
            {visibility ? formatCurrency(saldo) : '***'}
          </Text>
          <TouchableOpacity onPress={toggleVisibility}>
            <AntDesign name="eyeo" color='white' size={20} />
          </TouchableOpacity>
        </View>
      )}

    </View>
  )
}

const stylesSaldoEmConta = StyleSheet.create({
  container: {
    flex: 0,
    backgroundColor: 'black',
    marginTop: 20,
    marginBottom: 20,
  },
  field: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  title: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'Montserrat-Bold',
  },
  subTitle: {
    color: 'white',
    fontSize: 25,
    fontFamily: 'Montserrat-Bold',
    fontWeight: 'bold',
  },
  text: {
    width: '100%',
    paddingLeft: 20,
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
  },
})
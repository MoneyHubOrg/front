import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';

export default function SaldoEmConta({ padding }){

  return(
    <View 
      style={[
        stylesSaldoEmConta.container, 
        { paddingLeft: padding || 'auto' }
      ]}
    >
      <Text style={stylesSaldoEmConta.title}>Saldo em Conta</Text>
      <View style={stylesSaldoEmConta.field}>
        <Text style={stylesSaldoEmConta.subTitle}>R$ 25.000,00</Text>
        <AntDesign name="eyeo" color='white' size={20} />
      </View>
    </View>
  )
}

const stylesSaldoEmConta = StyleSheet.create({
  container:{
    flex:0,
    backgroundColor: 'black',
    marginTop: 20,
    marginBottom: 20,
  },
  field:{
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
})
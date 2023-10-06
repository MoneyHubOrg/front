import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Arrows from 'react-native-vector-icons/AntDesign';

import TextWithIcon from '../TextWithIcon';

export default function VisaoGeral() {

  return (
    <View style={stylesVisaoGeral.container}>
      <Text style={stylesVisaoGeral.text}>Visão Geral</Text>

      <View style={stylesVisaoGeral.field}>
        <Arrows name="left" color='white' size={20} style={stylesVisaoGeral.seta} />
        <Text style={stylesVisaoGeral.mes}>Setembro</Text>
        <Arrows name="right" color='white' size={20} style={stylesVisaoGeral.seta} />
      </View>

      <View style={stylesVisaoGeral.EconomyStatusField}>
        <View style={{flex: 1, marginRight: 20}}>
          <TextWithIcon icon="receita" colorTitulo='#828282' colorValor='#45D75C' text="Receita" valor="R$ 50.000,00" />
        </View>
        <View style={{flex: 1}}>
          <TextWithIcon icon="despesa" colorTitulo='#828282' colorValor='#FF3434' text="Despesas" valor="R$ 50.000,00" />
        </View>
      </View>

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
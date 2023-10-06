import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import SaldoEmConta from '../../components/SaldoEmConta';
import VisaoGeral from '../../components/VisaoGeral';
import Atividades from '../../components/Atividades';

export default function Principal() {

  return (
      <View style={stylesPagePrincipal.container}>
        <SaldoEmConta />
        <VisaoGeral />
        <Atividades />
      </View>
  )
}

const stylesPagePrincipal = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: 'black',
    height: '100%',
    paddingBottom: 10,
  }
})
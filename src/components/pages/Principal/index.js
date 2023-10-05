import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import SaldoEmConta from '../../SaldoEmConta/index';
import VisaoGeral from '../../VisaoGeral';
import Atividades from '../../Atividades';

export default function Principal(){

  return(
    <View style={styles.container}>
      <SaldoEmConta />
      <VisaoGeral />
      <Atividades />
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems: 'center',
    backgroundColor: 'black',
    gap: 30,
  }
})
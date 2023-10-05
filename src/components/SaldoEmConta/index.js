import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';

export default function SaldoEmConta(){

  return(
    <View style={styles.container}>
      <Text style={styles.text}>Saldo em conta</Text>
      <View style={styles.field}>
        <Text style={styles.text}>R$ 25.000,00</Text>
        <AntDesign name="eyeo" color='white' size={20} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: 'black'
  },
  field:{
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  text: {
    color: 'white',
    fontSize: 25,
    fontFamily: 'Montserrat-Bold'
  }
})
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import ArrowsUpDown from 'react-native-vector-icons/Feather';

export default function TextDespesa(){

  return(

        <View style={styles.EconomyStatus}>
        <ArrowsUpDown name="arrow-down-circle" color='#FF3434' size={40}/>
          <View>
            <Text style={styles.title_EconomyStatus}>Despesas</Text>
            <Text style={styles.number_receitas}>R$ 50.000,00</Text>
          </View>
        </View>
  )
}

const styles = StyleSheet.create({
  EconomyStatus: {
    gap: 5,
    flexDirection: 'row',
  },
  title_EconomyStatus: {
    color: '#828282',
    fontSize: 12
  },
  number_receitas: {
    color: '#FF3434',
    fontSize: 20
  },
  number_gastos: {
    color: '#FF3434',
    fontSize: 20
  }
})
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Arrows from 'react-native-vector-icons/AntDesign';
import ArrowsUpDown from 'react-native-vector-icons/Feather';

export default function VisaoGeral(){

  return(
    <View style={styles.container}>
      <Text style={styles.text}>Visão Geral</Text>

      <View style={styles.field}>
        <Arrows name="left" color='white' size={20} />
        <Text style={styles.mes}>Setembro</Text>
        <Arrows name="right" color='white' size={20} />
      </View>

      <View style={styles.EconomyStatusField}>
        <View style={styles.EconomyStatus}>
        <ArrowsUpDown name="arrow-up-circle" color='#45D75C' size={40}/>
          <View>
            <Text style={styles.title_EconomyStatus}>Receitas</Text>
            <Text style={styles.number_receitas}>R$ 50.000,00</Text>
          </View>
        </View>

        <View style={styles.EconomyStatus}>
        <ArrowsUpDown name="arrow-down-circle" color='#FF3434' size={40}/>
          <View>
            <Text style={styles.title_EconomyStatus}>Receitas</Text>
            <Text style={styles.number_gastos}>R$ 50.000,00</Text>
          </View>
        </View>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    width: '90%',
    height: '20%',
    alignItems: 'center',
    paddingTop: 20,
    backgroundColor: '#333333',
    borderRadius: 10,
  },
  text: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
  },
  field:{
    paddingTop: 60,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 40
  },
  mes: {
    color: 'white',
    fontSize: 25,
    fontWeight: '400',
  },
  EconomyStatusField: {
    width: '90%',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    gap: 30
  },
  EconomyStatus: {
    gap: 5,
    flexDirection: 'row',
  },
  title_EconomyStatus: {
    color: '#828282',
    fontSize: 12
  },
  number_receitas: {
    color: '#45D75C',
    fontSize: 20
  },
  number_gastos: {
    color: '#FF3434',
    fontSize: 20
  }
})
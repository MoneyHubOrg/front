import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';

export default function VisaoGeral(){

  return(
    <View style={styles.container}>
      <Text style={styles.text}>Visão Geral</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    width: '90%',
    height: '20%',
    alignItems: 'flex-start',
    backgroundColor: '#333333',
    borderRadius: 10,
  },
  text: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  }
})
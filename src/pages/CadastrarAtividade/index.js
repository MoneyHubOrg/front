import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Arrows from 'react-native-vector-icons/AntDesign';


export default function CadastrarAtividade(){

  return(
    <View style={styles.container}>
      <View style={styles.pag_title}>
        <Arrows name="arrowleft" color='white' size={35} onPress={() => console.log('voltar')}/>
        <Text style={styles.text}>Cadastrar Atividade</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    height: '100%',
    alignItems: 'flex-start',
    backgroundColor: 'black',
  },  
  pag_title: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 10,
    paddingTop: 10,
    paddingLeft: 10,
    width: '100%',
  },
  text: {
    color: 'white',
    fontSize: 25,
  }
})
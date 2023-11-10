import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';

export default function SaldoEmConta({ padding }){

  const [visibility, setVisibility] = useState(true)
  console.log(visibility)

  const toggleVisibility = () => {
    setVisibility(!visibility);
  };

  return(
    <View 
      style={[
        stylesSaldoEmConta.container, 
        { paddingLeft: padding || 'auto' }
      ]}
    >
      <Text style={stylesSaldoEmConta.title}>Saldo em Conta</Text>
      <View style={stylesSaldoEmConta.field}>
        <Text style={stylesSaldoEmConta.subTitle}>
          R$ {visibility ? '25.000,00' : '***'}
        </Text>
        <TouchableOpacity onPress={toggleVisibility}>
          <AntDesign name="eyeo" color='white' size={20} />
        </TouchableOpacity>
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
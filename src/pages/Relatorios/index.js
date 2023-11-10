import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import { Link, useNavigation } from '@react-navigation/native';
import SaldoEmConta from '../../components/SaldoEmConta';
import SelectDropdown from 'react-native-select-dropdown';
import { useForm } from 'react-hook-form';

import AntDesign from 'react-native-vector-icons/AntDesign';


export default function CadastrarAtividade(){

  const opcoes = ['Receita', 'Despesa']
  const opcoesCateg = ['Mercado', 'Comida', 'Farmácia', 'Lazer', 'Viagem']
  
  const {register, setValue, handleSubmit} = useForm()

  const navigation = useNavigation();

  const onSubmit = (data) => {
    console.log(data);
    navigation.navigate('Principal');
  };

  useEffect(() => {
    register('valor')
    register('tipo')
    register('categoria')
  }, [register]) 

  return(
    <View style={styles.container}>
      Relatórios
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    height: '100%',
    alignItems: 'flex-start',
    backgroundColor: 'black',
  },
})
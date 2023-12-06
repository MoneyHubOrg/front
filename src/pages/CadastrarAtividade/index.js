import React, {useEffect, useState, useContext} from 'react';
import { View, Text, StyleSheet, TextInput, Button, ToastAndroid } from 'react-native';
import { Link, useNavigation } from '@react-navigation/native';
import SaldoEmConta from '../../components/SaldoEmConta';
import SelectDropdown from 'react-native-select-dropdown';
import { useForm } from 'react-hook-form';

import AntDesign from 'react-native-vector-icons/AntDesign';

import firestore from '@react-native-firebase/firestore';
import { AuthContext } from '../../contexts/AuthContext';
import { AtlContext } from '../../contexts/AtlContext';

export default function CadastrarAtividade(){
  const { user, setGatilhoBuscarDados } = useContext(AuthContext);
  

  let dataAtual = new Date().toLocaleString()

  const opcoes = ['Receita', 'Despesa']
  const opcoesCateg = ['Mercado', 'Comida', 'Farmácia', 'Lazer', 'Viagem']
  
  const {register, setValue, handleSubmit} = useForm()

  const navigation = useNavigation();

  const onSubmit = (data) => {

    
    firestore()
    .collection('financia')
    .add({
      categoria: data['categoria'],
      // aq tem q chegar o email do usuario atual
      email_usuario: user.email,
      valor: data['valor'],
      tipo_financia: data['tipo'],
      data: dataAtual
    })
    .then(() => {
      ToastAndroid.show('Cadastrado com sucesso!', 3)
      setGatilhoBuscarDados(Math.random())
      navigation.navigate('Principal');
  
    })
    .catch(() => {
      ToastAndroid.show('Erro ao Cadastrar', 3)
    })
  };

  useEffect(() => {
    register('valor')
    register('tipo')
    register('categoria')
  }, [register]) 

  return(
    <View style={styles.container}>
      <View style={styles.pag_title}>
        <AntDesign name="arrowleft" color='white' size={25} onPress={() => navigation.navigate('Principal')}/>
        <Text style={styles.text}>Cadastrar Atividade</Text>
      </View>

      <SaldoEmConta padding={20} />

      <View style ={styles.formContainer}>
        <View style={styles.containerInput}>          
          <Text 
            style={styles.text} 
          >
            Valor da Atividade
          </Text>
          <View
            style={{
              borderBottomColor: '#B7B7B7',
              borderBottomWidth: StyleSheet.hairlineWidth,
              width: '95%',
              paddingBottom: 10
            }}
          />

          <View style={styles.inputImage}>
            <TextInput 
              style={styles.inputContainer} 
              keyboardType='numeric'
              placeholder='R$ '
              placeholderTextColor='#B7B7B7'
              onChangeText={text => setValue('valor', text)}
            />
            <AntDesign name="edit" color='white' size={20} />
          </View>
        </View>

        <View style={styles.containerInput}>
          <Text style={styles.text}>Categoria</Text>
          <View
            style={{
              borderBottomColor: '#B7B7B7',
              borderBottomWidth: StyleSheet.hairlineWidth,
              width: '95%',
              paddingBottom: 10
            }}
          />
          <SelectDropdown
            data={opcoesCateg}
            defaultButtonText='Selecione a Categoria'
            buttonStyle={styles.dropDown}
            onSelect={categoria => setValue('categoria', categoria)}
            renderDropdownIcon={isOpened => {
              return <AntDesign name={isOpened ? "arrowup" : "arrowdown"} color='white' size={25} />
            }}
            buttonTextStyle={{ color: 'white' }}
          />
        </View>

        <View style={styles.containerInput}>
          <Text style={styles.text}>Tipo da Atividade</Text>
          <View
            style={{
              borderBottomColor: '#B7B7B7',
              borderBottomWidth: StyleSheet.hairlineWidth,
              width: '95%',
              paddingBottom: 10
            }}
          />
          <SelectDropdown
            data={opcoes}
            defaultButtonText='Selecione o tipo'
            buttonStyle={styles.dropDown}
            onSelect={tipo => setValue('tipo', tipo)}
            renderDropdownIcon={isOpened => {
              return <AntDesign name={isOpened ? "arrowup" : "arrowdown"} color='white' size={25} />
            }}
            buttonTextStyle={styles={color:'white'}}
          />
          <Link to={{ screen: 'Principal' }} style={{paddingTop: 30}}>
            <Button
              title='Cadastrar'
              onPress={handleSubmit(onSubmit)}
              color="#7305CA"
            />
          </Link>
        </View>
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
    flexDirection: 'row',
    gap: 10,
    paddingTop: 10,
    paddingLeft: 20,
    width: '100%',
    alignItems: 'center',
  },
  formContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    gap: 25,
    width: '100%',
    height: '100%',
    backgroundColor: '#333333',
    borderRadius: 30,
    paddingLeft: 50,
    paddingRight: 50,
    paddingTop: 20,
  },
  text: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
  },
  inputContainer: {
    color: 'white',
    width: '90%',
    fontSize: 20
  },
  inputImage: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'flex-start',
  },
  dropDown: {
    backgroundColor: "#333333",
    color: 'white',
  },
  botao: {
    backgroundColor:'white'
  },
  containerInput: {
    alignItems: 'center'
  },
})
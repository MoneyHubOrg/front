import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import TextWithIcon from '../TextWithIcon';


export default function Atividades() {

  return (
    <View style={stylesAtividades.container}>
      <View style={stylesAtividades.title}>
        <Text style={stylesAtividades.text}>Atividades</Text>
        <View
          style={{
            borderBottomColor: '#535353',
            borderBottomWidth: StyleSheet.hairlineWidth,
            width: '95%',
            paddingBottom: 10
          }}
        />
        <View style={stylesAtividades.scrollView}>
          <ScrollView style={stylesAtividades.scroll}>
            <TextWithIcon icon="receita" colorTitulo='#828282' colorValor='#45D75C' text="Receita" valor="R$ 50.000,00" />
            <TextWithIcon icon="receita" colorTitulo='#828282' colorValor='#45D75C' text="Receita" valor="R$ 50.000,00" />
            <TextWithIcon icon="receita" colorTitulo='#828282' colorValor='#45D75C' text="Receita" valor="R$ 50.000,00" />
            <TextWithIcon icon="receita" colorTitulo='#828282' colorValor='#45D75C' text="Receita" valor="R$ 50.000,00" />
            <TextWithIcon icon="receita" colorTitulo='#828282' colorValor='#45D75C' text="Receita" valor="R$ 50.000,00" />
            <TextWithIcon icon="receita" colorTitulo='#828282' colorValor='#45D75C' text="Receita" valor="R$ 50.000,00" />
          </ScrollView>
        </View>
      </View>
    </View>
  )
}

const stylesAtividades = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: '#333333',
    width: '90%',
  },
  title: {
    paddingTop: 10,
    width: '100%',
    alignItems: 'center',
  },
  text: {
    width: '100%',
    textAlign: 'center',
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    // paddingLeft: 10
  },
  scrollView: {
    backgroundColor: '#333333',
    width: '50%',
  },
  scroll: {
    width: '100%',
    height: 210
  }
})
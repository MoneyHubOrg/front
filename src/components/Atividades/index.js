import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';

export default function Atividades(){

  return(
    <View style={styles.container}>
        <View style={styles.title}>
            <Text style={styles.text}>Atividades</Text>
        </View>
        <ScrollView style={styles.scrollView}>
            <Text style={styles.text}>Receita</Text>
            <Text style={styles.text}>Receita</Text>
            <Text style={styles.text}>Receita</Text>
            <Text style={styles.text}>Receita</Text>
            <Text style={styles.text}>Receita</Text>
            <Text style={styles.text}>Receita</Text>
            <Text style={styles.text}>Receita</Text>
            <Text style={styles.text}>Receita</Text>
            <Text style={styles.text}>Receita</Text>
            <Text style={styles.text}>Receita</Text>
            <Text style={styles.text}>Receita</Text>
            <Text style={styles.text}>Receita</Text>
            <Text style={styles.text}>Receita</Text>
            <Text style={styles.text}>Receita</Text>
            <Text style={styles.text}>Receita</Text>
            <Text style={styles.text}>Receita</Text>
            <Text style={styles.text}>Receita</Text>
            <Text style={styles.text}>Receita</Text>
            <Text style={styles.text}>Receita</Text>
            <Text style={styles.text}>Receita</Text>
            <Text style={styles.text}>Receita</Text>
            <Text style={styles.text}>Receita</Text>
            <Text style={styles.text}>Receita</Text>
        </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    width: '90%',
    height: '20%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333333',
  },
  text: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  title: {
    paddingTop: 10,
    width: '90%',
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  scrollView: {
    width: '90%',
    height: '10%',
  }
})
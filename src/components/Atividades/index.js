import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

import TextDespesa from '../TextDespesa';
import TextReceita from '../TextReceita';

export default function Atividades(){

  return(
    <View style={styles.container}>
        <View style={styles.title}>
            <Text style={styles.text}>Atividades</Text>
            <View
                    style={{
                      borderBottomColor: '#535353',
                      borderBottomWidth: StyleSheet.hairlineWidth,
                      width: '95%',
                      paddingBottom: 10
                    }}
                  />
       
        <ScrollView style={styles.scrollView}>
          <View style={{paddingTop:10, paddingLeft:5}}><TextDespesa/></View>
          <View style={{paddingTop:10, paddingLeft:5}}><TextDespesa/></View>
          <View style={{paddingTop:10, paddingLeft:5}}><TextReceita/></View>
          <View style={{paddingTop:10, paddingLeft:5}}><TextDespesa/></View>
          <View style={{paddingTop:10, paddingLeft:5}}><TextReceita/></View>
          <View style={{paddingTop:10, paddingLeft:5}}><TextReceita/></View>
          <View style={{paddingTop:10, paddingLeft:5}}><TextDespesa/></View>
          <View style={{paddingTop:10, paddingLeft:5}}><TextDespesa/></View>
        </ScrollView>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    borderRadius: 10,
    backgroundColor: '#333333',
    width: '90%'
  },
  title: {
    paddingTop: 10,
  },
  text: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    paddingLeft: 10
  },
  scrollView: {
    backgroundColor: '#333333',
  }
})
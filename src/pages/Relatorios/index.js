import React, {useState, useEffect, useContext} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { AuthContext } from '../../contexts/AuthContext'

export default function Relatorios() {
  const screenWidth = Dimensions.get('window').width;

  const { user, receitaJulho, receitaAgosto, receitaSetembro, receitaOutubro, receitaNovembro, receitaDezembro, despesaJulho, despesaAgosto, despesaSetembro, despesaOutubro, despesaNovembro, despesaDezembro } = useContext(AuthContext);

  
  const dataReceita = {
    labels: ['Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    datasets: [
      {
        data: [receitaJulho, receitaAgosto, receitaSetembro, receitaOutubro, receitaNovembro, receitaDezembro],
      },
    ],
  };

  const dataDespesa = {
    labels: ['Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    datasets: [
      {
        data: [despesaJulho, despesaAgosto, despesaSetembro, despesaOutubro, despesaNovembro, despesaDezembro],
      },
    ],
  };

  const GraficoReceita = () => (
    <BarChart
      data={dataReceita}
      width={screenWidth - 20} 
      height={220}
      yAxisLabel="R$"
      chartConfig={{
        backgroundColor: '#1f7a1f',
        backgroundGradientFrom: '#138d13',
        backgroundGradientTo: '#33cc33',
        decimalPlaces: 2,
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        style: {
          borderRadius: 16,
        },
        propsForDots: {
          r: '6',
          strokeWidth: '2',
          stroke: '#33cc33',
        },
      }}
      style={{
        marginVertical: 8,
        borderRadius: 10,
      }}
    />
  );

  const GraficoDespesa = () => (
    <BarChart
      data={dataDespesa}
      width={screenWidth - 20} 
      height={220}
      yAxisLabel="R$"
      chartConfig={{
        backgroundColor: '#990000',
        backgroundGradientFrom: '#cc0000',
        backgroundGradientTo: '#ff3333',
        decimalPlaces: 2,
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        style: {
          borderRadius: 16,
        },
        propsForDots: {
          r: '6',
          strokeWidth: '2',
          stroke: '#33cc33',
        },
      }}
      style={{
        marginVertical: 8,
        borderRadius: 10,
      }}
    />
  );


  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.text}>Relatórios</Text>
        <View
          style={{
            borderBottomColor: '#535353',
            borderBottomWidth: StyleSheet.hairlineWidth,
            width: '100%',
            paddingBottom: 10,
          }}
        />
      </View>
      
      <View>
        <View>
        <Text style={styles.text2}>Receitas</Text>
          <GraficoReceita />
        </View>
        <View
          style={{
            borderBottomColor: '#535353',
            borderBottomWidth: StyleSheet.hairlineWidth,
            width: '100%',
            paddingBottom: 10,
          }}
        />
        <View>
        <Text style={styles.text2}>Despesas</Text>
          <GraficoDespesa />
        </View>
      </View>
     
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333333',
    padding: 10,
  },
  title: {
    paddingTop: 30,
    width: '100%',
    alignItems: 'flex-start',
    paddingRight: 10,
  },
  text: {
    width: '100%',
    paddingLeft: 20,
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
  },
  text2: {
    width: '100%',
    paddingLeft: 20,
    paddingTop: 10,
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
  },
});
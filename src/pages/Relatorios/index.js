import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import {
  BarChart,
} from 'react-native-chart-kit';
import { Dimensions } from 'react-native';



export default function Relatorios(){

  const screenWidth = Dimensions.get('window').width;

  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [{
      data: [20, 45, 28, 80, 99, 43]
    }]
  };

  const chartConfig = {
    backgroundGradientFrom: '#1E2923',
    backgroundGradientTo: '#08130D',
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2
  };

  const MyLineChart = () => (
    <BarChart
      data={data}
      width={screenWidth}
      height={220}
      chartConfig={chartConfig}
    />
  );

  return(
    <View style={styles.container}>
      <MyLineChart />
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
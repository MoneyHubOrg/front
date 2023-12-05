import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Principal from '../pages/Principal';
import CadastrarAtividade from '../pages/CadastrarAtividade';
import Perfil from '../pages/Perfil';
import Transacoes from '../pages/Transacoes';
import Relatorios from '../pages/Relatorios';
import ButtonNew from '../components/ButtonNew/ButtonNew';
import CameraComponente from '../components/Camera';

const Tab = createBottomTabNavigator();

function MainRoutes() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: '#FFF',
        tabBarStyle: {
          backgroundColor: '#202225',
          borderTopWidth: 0,
        },
      }}>
      <Tab.Screen
        name="Principal"
        component={Principal}
        options={{
          tabBarVisible: true,
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="home" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="Transações"
        component={Transacoes}
        options={{
          tabBarVisible: true,
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="bars" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="New"
        component={CadastrarAtividade}
        options={{
          tabBarVisible: true,
          tabBarLabel: '',
          tabBarIcon: ({ color, size }) => (
            <ButtonNew color="white" size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="Relatórios"
        component={Relatorios}
        options={{
          tabBarVisible: true,
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="barschart" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="Perfil"
        component={Perfil}
        options={{
          tabBarVisible: true,
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="user" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default MainRoutes;
import Principal from './src/pages/Principal';
import CadastrarAtividade from './src/pages/CadastrarAtividade';
import Perfil from './src/pages/Perfil';
import Transacoes from './src/pages/Transacoes';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

import ButtonNew from './src/components/ButtonNew/ButtonNew';

const Tab = createBottomTabNavigator();

function Routes() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarHideOnKeyboard: true,
                tabBarActiveTintColor: '#FFF',
    
                tabBarStyle:{
                backgroundColor: '#202225',
                borderTopWidth: 0,
                }
    
            }}
        >
            <Tab.Screen 
                name='Principal'
                component={Principal}
                options={{
                    tabBarIcon: ({ color, size }) => {
                      return <MaterialIcons name="home" color={color} size={size} />
                    },
                  }}
            />

            <Tab.Screen 

                name='Transações'
                component={Transacoes}
                options={{
                    tabBarIcon: ({ color, size }) => {
                        return <AntDesign name="bars" color={color} size={size} />
                    },
                  }}
            />

            <Tab.Screen 
                name='New'
                component={CadastrarAtividade}
                options={{
                    tabBarLabel: '',
                    tabBarIcon: ({ color, size }) => {
                        return <ButtonNew color='white' size={size} />
                    },
                  }}
            />

            <Tab.Screen 
                name='Relatórios'
                component={Principal}
                options={{
                    tabBarIcon: ({ color, size }) => {
                      return <AntDesign name="barschart" color={color} size={size} />
                    },
                  }}
            />
            
            <Tab.Screen 
                name='Perfil'
                component={Perfil}
                options={{
                    tabBarIcon: ({ color, size }) => {
                      return <AntDesign name="user" color={color} size={size} />
                    },
                  }}
            />
        </Tab.Navigator>
    )
};

export default Routes;
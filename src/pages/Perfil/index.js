import React, {useContext} from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import Profile from "../../../assets/img/profile.png"
import { AuthContext } from '../../contexts/AuthContext';

export default function Perfil() {
  const { user } = useContext(AuthContext);

  return (
      <View style={stylesPerfil.container}>
        <View style={stylesPerfil.infoProfile}>
          <View style={stylesPerfil.perfil}>
            <Image source={Profile} style={stylesPerfil.image} />
          </View>
          <Text style={stylesPerfil.Text}>{user.displayName}</Text>
        </View>
        <View style={stylesPerfil.info}>
          <Text style={stylesPerfil.infoTitle}>Informações da Conta</Text>
          <View style={stylesPerfil.informations}>
            <Text style={stylesPerfil.infoText}>Nome: {user.displayName}</Text>
            <Text style={stylesPerfil.infoText}>E-mail: {user.email}</Text>
            {/* <Text style={stylesPerfil.infoText}>Telefone: (12) 99154-7409</Text> */}
          </View>
        </View>
      </View>
  )
}

const stylesPerfil = StyleSheet.create({
  container: {
    paddingTop: 50,
    alignItems: 'center',
    backgroundColor: 'black',
    height: '100%',
    paddingBottom: 10,
  },
  infoProfile: {
    alignItems: 'center',
  },
  perfil: {
    width: 150,
    height: 150,
    backgroundColor: 'white',
    borderRadius: 500,
  },
  image: {
    width: 150,
    height: 150,
  },
  Text: {
    paddingTop: 10,
    paddingBottom: 30,
    color: 'white',
    fontSize: 25,
  },
  info: {
    flex: 1,
    flexDirection: 'column',
    width: '90%',
    height: '100%',
    backgroundColor: '#333333',
    borderRadius: 30,
    paddingLeft: 50,
    paddingRight: 50,
    paddingTop: 20,
  },
  infoTitle: {
    color: 'white',
    fontSize: 20,
  },
  informations: {
    paddingTop: 20,
    gap: 10,
  },
  infoText: {
    color: 'white',
    fontSize: 15,
  }
})
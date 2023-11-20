import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { ToastAndroid } from 'react-native';

import firestore from '@react-native-firebase/firestore';

export default function CadastroUsuario() {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [enable, setEnable] = useState(true);

    const navegar = useNavigation();

    const registerUser = (name, email, password) => {
        auth()
            .createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Atualizando o perfil do usuário com o nome
                return userCredential.user.updateProfile({
                    displayName: name
                });
            })
            .then(() => {
                ToastAndroid.show('Usuário registrado com Sucesso!', 3)
                // criar tabela de conta

                firestore()
                .collection('conta')
                .add({
                  email: email,
                  saldo_em_conta: 0
                })
                .then(() => {

                    navegar.navigate('Login');
                })
                .catch(() => {
                  ToastAndroid.show('Erro ao cadastrar tabela!', 3)
                })

            })
            .catch(error => {
                ToastAndroid.show('Erro ao registrar Usuário, digite dados Reais!', 3)
            });
    };

    useEffect(() => {
        if (nome != '' && email != '' && senha != '') {
            setEnable(false);
        } else {
            setEnable(true);
        }
    }, [nome, email, senha]);


    return (
        <View style={CadUserStyles.container}>
            <Text style={CadUserStyles.texto}>Cadastro de Usuário</Text>
            <TextInput style={CadUserStyles.input} placeholder="Nome" value={nome} onChangeText={text => setNome(text)} />
            <TextInput style={CadUserStyles.input} placeholder="E-mail" value={email} onChangeText={text => setEmail(text)} />
            <TextInput style={CadUserStyles.input} placeholder="Senha" value={senha} onChangeText={text => setSenha(text)} secureTextEntry/>
            <TouchableOpacity style={CadUserStyles.botao} onPress={(e) => {
                e.preventDefault();
                registerUser(nome, email, senha)
            }
            } disabled={enable}>
                <Text style={CadUserStyles.textoBotao}>Cadastrar</Text>
            </TouchableOpacity>
        </View>

    )
}


const CadUserStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    texto: {
        fontSize: 30,
        textAlign: 'center',
        marginBottom: 20,
        color: "#FFFFFF"
    },
    input: {
        backgroundColor: '#FFFFFF',
        fontSize: 16,
        padding: 15,
        marginBottom: 15,
        borderRadius: 7,
    },
    botao: {
        backgroundColor: '#7305CA',
        padding: 15,
        borderRadius: 7,
        alignItems: 'center',
    },
    textoBotao: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    }
})
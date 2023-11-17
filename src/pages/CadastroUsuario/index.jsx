import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';


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
                console.log('Usuário registrado com o nome!');
                // Navegue para a tela principal
                navegar.navigate('Login');

            })
            .catch(error => {
                console.error(error);
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
    },
    input: {
        backgroundColor: '#eeeeee1a',
        fontSize: 16,
        padding: 15,
        marginBottom: 15,
        borderRadius: 7,
    },
    botao: {
        backgroundColor: '#0031b7',
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
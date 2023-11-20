import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Dimensions } from 'react-native';
import MoneyHub1 from '../../../assets/MoneyHub1.png';
import { useForm } from 'react-hook-form';
import auth from '@react-native-firebase/auth';
import { ToastAndroid } from 'react-native';




export default function Login() {

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [enable, setEnable] = useState(true);


    const navegar = useNavigation();

    const cadastrar = () => {
        navegar.navigate('Register');
    }

    const loginUser = (email, password) => {
        auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => {
    
                ToastAndroid.show('Logado com Sucesso!', 3)
                // Navegue para a tela principal
                navegar.navigate('Main');

            })
            .catch(error => {
                ToastAndroid.show('Credenciais inválidas!', 3)
             
            });
    };

    useEffect(() => {
        if (email != '' && senha != '') {
            setEnable(false);
        } else {
            setEnable(true);
        }
    }, [email, senha]);



    return (
        <View style={LoginStyle.container}>
            <Text style={LoginStyle.titulo}>Bem vindo de volta </Text>
            {/* inserindo imagem */}
            <View style={LoginStyle.inputsContainer}>
                {/* label */}
                <Text style={LoginStyle.label}>Usuário</Text>
                <TextInput style={LoginStyle.input} placeholder="Usuario" onChangeText={text => setEmail(text)} />
                <Text style={LoginStyle.label}>Senha</Text>
                <TextInput style={LoginStyle.input} placeholder="Senha" onChangeText={text => setSenha(text)} secureTextEntry/>
                <TouchableOpacity style={LoginStyle.button}
                    onPress={() => loginUser(email, senha)}
                    disabled={enable}
                >
                    <Text style={LoginStyle.buttonText}>Entrar </Text>
                </TouchableOpacity>
            </View>
            <View style={LoginStyle.SemCadastro}>
                <Text style={LoginStyle.textoSemCadastro}>Não tem cadastro? </Text>
                <TouchableOpacity onPress={() => {
                    cadastrar();
                }}>
                    <Text style={LoginStyle.textoSemCadastro}>Cadastre-se </Text>
                </TouchableOpacity>
            </View>
        </View>
    )

}


const LoginStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e6e6e6',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    imagemFundo: {
        height: '100vh',
        flex: 1,
        justifyContent: 'flex-start',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: -1,
    },

    inputsContainer: {
        width: '90%',
        padding: 20,
        paddingTop: 40,
        paddingBottom: 40,
        borderRadius: 5,
        marginTop: 130,
        justifyContent: 'center',
        alignItems: 'center',
    },

    titulo: {
        fontSize: 25,
        fontWeight: '700',
        fontFamily: 'Passion One Black',
        color: '#ffffff',
        marginTop: 30,
    },

    input: {
        backgroundColor: '#0000002d',
        borderRadius: 5,
        marginBottom: 10,
        padding: 10,
        width: '100%',
    },
    label: {
        width: '100%',
        color: '#000000',
        marginBottom: 10,
        paddingLeft: 5,
        fontSize: 15,
        fontWeight: '700',
    },
    button: {
        backgroundColor: '#7305CA',
        marginTop: 20,
        // backgroundColor: '#000000',
        padding: 10,
        width: '50%',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        // marginBottom: 25,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        // marginBottom: 25,
    },
    SemCadastro: {
        flexDirection: 'row',
        marginTop: 10,
        backgroundColor: '#000000',
        padding: 20,
        width: '100%',
        justifyContent: 'center',
    },
    textoSemCadastro: {
        color: '#fff',
    }
});
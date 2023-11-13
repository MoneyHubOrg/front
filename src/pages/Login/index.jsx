import { useNavigation } from '@react-navigation/native';
import React, {useEffect, useState, useContext} from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Dimensions } from 'react-native';
import Svg, { Image, Path } from 'react-native-svg';
import MoneyHub1 from '../../../assets/MoneyHub1.png';
import { useForm } from 'react-hook-form';



export default function Login() {


      
    const {register, setValue, handleSubmit} = useForm()

    const navegar = useNavigation();

    const cadastrar = () => {
        navegar.navigate('Register');
    }






    const onSubmit = (data) => {
        console.log(data)
        navegar.navigate('Main');
    }





    // Obter a largura da tela
    const screenWidth = Dimensions.get('window').width;

    // Calcular a altura correspondente mantendo a proporção do SVG original
    const svgHeight = (screenWidth * 902) / 1081;


    useEffect(() => {
        register('email')
        register('senha')
      }, [register]) 

      

    return (
        <View style={LoginStyle.container}>
            <View style={LoginStyle.imagemFundo}>
                <Svg xmlns="http://www.w3.org/2000/svg" width={screenWidth} height={svgHeight} viewBox="0 0 1081 902" fill="none">
                    <Path d="M0.414724 901.713L114.958 835.604L165.415 801.713L194.915 784.214L229.502 769.495L400.63 716.407L486.194 689.864L529.915 673.713L558.454 663.96C565.737 661.471 573.283 659.831 580.942 659.072L619.915 655.213L670.336 648.941L768.915 634.563L867.493 620.184L916.782 612.995L947.164 607.925C955.958 606.457 964.517 603.82 972.612 600.083L994.657 589.908L1023.24 574.01L1080.41 542.214L1080.41 0.713299L0.414722 0.713476L0.414724 901.713Z" fill="#000" />
                </Svg>
            </View>
            <Text style={LoginStyle.titulo}>Bem vindo de volta </Text>
            {/* inserindo imagem */}
            <Image source={MoneyHub1} style={{ width: 100, height: 100 }} />
            <View style={LoginStyle.inputsContainer}>
                {/* label */}
                <Text style={LoginStyle.label}>Usuário</Text>
                <TextInput style={LoginStyle.input} placeholder="Usuario" onChangeText={text => setValue('email', text)}/>
                <Text style={LoginStyle.label}>Senha</Text>
                <TextInput style={LoginStyle.input} placeholder="Senha" onChangeText={text => setValue('senha', text)}/>
                <TouchableOpacity style={LoginStyle.button} 
                    onPress={handleSubmit(onSubmit)}
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
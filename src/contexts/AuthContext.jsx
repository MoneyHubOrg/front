import React, {createContext, useState, useEffect} from 'react';
import auth from '@react-native-firebase/auth';

import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';


export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);


  const [loading, setLoading] = useState(true)
  const [gatilhoBuscarFinancias, setGatilhoBuscarFinancias] = useState(100)
  const [gatilhoBuscarSaldoConta, setGatilhoBuscarSaldoConta] = useState(100)
  const [gatilhoBuscarImagem, setgatilhoBuscarImagem] = useState(100)
  const [gatilhoBuscaParaContas, setGatilhoBuscaParaContas] = useState(100)
  const [financias, setFinancias] = useState([])
  const [saldo, setSaldo] = useState()
  const[imgUrl, setImgUrl] = useState(null)



  const [receitaFinal, setReceitaFinal] = useState(0)
  const [despesaFinal, setDespesaFinal] = useState(0)



  const buscaFinancias = async () => {
   

    if(gatilhoBuscarFinancias == 100) {
      console.log('nulo')
     
    } else {
      setFinancias([])
      setLoading(true)
      const collectionRef = await firestore()
      .collection('financia')
      .where('email_usuario', '==', user.email)
      .orderBy('data', 'desc');
  
      collectionRef
          .get()
          .then(snapshot => {
            if (snapshot.empty) {
              console.log('Nenhum documento encontrado na coleção.');
              return;
            }
  
            snapshot.forEach(doc => {
              setFinancias(prevArray => [
                ...prevArray,
                {id: doc.id, ...doc.data()},
              ]);
            });
  
            console.log('vou setar o loading pra off')
            setLoading(false);
            console.log('setei pra off' + loading)
          })
          .catch(err => {
            console.error('Erro ao obter documentos da coleção:', err);
            setLoading(false);
          })
    }
    
  }


  const buscaSaldoEmConta = async() => {
    console.log('bati na busca saldo')
    if(gatilhoBuscarSaldoConta == 100) {
      console.log('nulo')
     
    } else {
      setSaldo()
      console.log('bati no loading do saldo')
      setLoading(true)
        const collectionRef = firestore().collection('conta').where('email', '==', user.email);

        collectionRef.get()
          .then(snapshot => {
            snapshot.forEach(doc => {
              setSaldo(doc.data().saldo_em_conta)
            });
          
            setLoading(false)
          })
          .catch(err => {
            console.error('Erro ao obter documentos da coleção:', err);
            setLoading(false)
          });
    }

  }


  const buscaImagemPerfil = async() => {

    if(gatilhoBuscarImagem == 100) {
      console.log('nulo')
    } else {
      
      const imagePath = `imgs/${user.email}`
      
        try {
          console.log('entrei no fetch')
          const url = await storage().ref(imagePath).getDownloadURL();
          setImgUrl(url)
        } catch (error) {
          console.log('erro ao buscar img' + error)
        }
    
      
    }


  }


  const buscaParaContasVisaoGeral = async() => {
    let receitas=0;
    let despesas=0; 
    if(gatilhoBuscarSaldoConta == 100) {
      console.log('nulo')
     
    } else {
      setLoading(true)
      const collectionRef = firestore().collection('financia').where('email_usuario', '==', user.email).orderBy("data", "desc");

      collectionRef.get()
        .then(snapshot => {
          if (snapshot.empty) {
            console.log('Nenhum documento encontrado na coleção.');
            return;
          }

         
          snapshot.forEach(doc => {
            if(doc.data().tipo_financia == 'Receita') { 
              receitas = parseFloat(doc.data().valor)  + receitas
              console.log('receitas'+receitas)

            } else if(doc.data().tipo_financia == 'Despesa') { 
              despesas = parseFloat(doc.data().valor) + despesas
              console.log('despesas'+despesas)
 
            }
          });
          setReceitaFinal(receitas)
          setDespesaFinal(despesas)
          setLoading(false)
        })
        .catch(err => {
          console.error('Erro ao obter documentos da coleção:', err);
          setLoading(false)
        });
    }

  }



  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(setUser);
    return unsubscribe;
  }, []);


  useEffect(() => {
      buscaFinancias()
  },[gatilhoBuscarFinancias])


  useEffect(() => {
    buscaSaldoEmConta()
},[gatilhoBuscarSaldoConta])

  useEffect(() => {
    buscaImagemPerfil()
  },[gatilhoBuscarImagem])

  useEffect(() => {
    buscaParaContasVisaoGeral()
  },[gatilhoBuscaParaContas])



  return <AuthContext.Provider value={{user, loading, setGatilhoBuscarFinancias, setGatilhoBuscarSaldoConta, setgatilhoBuscarImagem, setGatilhoBuscaParaContas, financias, saldo, imgUrl, receitaFinal, despesaFinal}}>{children}</AuthContext.Provider>;
};

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
  const [gatilhoBuscaParaContasReceitasDespesas, setGatilhoBuscaParaContasReceitasDespesas] = useState(100)
  const [financias, setFinancias] = useState([])
  const [saldo, setSaldo] = useState()
  const[imgUrl, setImgUrl] = useState(null)



  const [receitaFinal, setReceitaFinal] = useState(0)
  const [despesaFinal, setDespesaFinal] = useState(0)


  
  const [receitaJulho, setReceitaJulho] = useState(0)
  const [receitaAgosto, setReceitaAgosto] = useState(0)
  const [receitaSetembro, setReceitaSetembro] = useState(0)
  const [receitaOutubro, setReceitaOutubro] = useState(0)
  const [receitaNovembro, setReceitaNovembro] = useState(0)
  const [receitaDezembro, setReceitaDezembro] = useState(0)

  const [despesaJulho, setDespesaJulho] = useState(0)
  const [despesaAgosto, setDespesaAgosto] = useState(0)
  const [despesaSetembro, setDespesaSetembro] = useState(0)
  const [despesaOutubro, setDespesaOutubro] = useState(0)
  const [despesaNovembro, setDespesaNovembro] = useState(0)
  const [despesaDezembro, setDespesaDezembro] = useState(0)



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
              

            } else if(doc.data().tipo_financia == 'Despesa') { 
              despesas = parseFloat(doc.data().valor) + despesas
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



  const buscaParaContasReceitasDespesas = async() => {

    let receita_julho = 0;
    let receita_agosto = 0;
    let receita_setembro = 0;
    let receita_outubro = 0;
    let receita_novembro = 0;
    let receita_dezembro = 0;

    let despesa_julho = 0;
    let despesa_agosto = 0;
    let despesa_setembro = 0;
    let despesa_outubro = 0;
    let despesa_novembro = 0;
    let despesa_dezembro = 0;

    


    if(gatilhoBuscaParaContasReceitasDespesas == 100) {
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
            let string_data = doc.data().data;

            let partesDataHora = string_data.split(' ');
            let partesData = partesDataHora[0].split('/');
            let novaStringData = `${partesData[2]}-${partesData[1]}-${partesData[0]}T${partesDataHora[1]}`;

            let dateObj = new Date(novaStringData);
            let mes = dateObj.getMonth() + 1;
      

            if(doc.data().tipo_financia == 'Receita') { 
              
              switch(mes) {
                case 7:
                  receita_julho = parseFloat(doc.data().valor)  + receita_julho
                  break;
                case 8:
                  receita_agosto = parseFloat(doc.data().valor)  + receita_agosto
                  break;  
                case 9:
                  receita_setembro = parseFloat(doc.data().valor)  + receita_setembro
                  break;
                case 10:
                  receita_outubro = parseFloat(doc.data().valor)  + receita_outubro
                  break;  
                case 11:
                  receita_novembro = parseFloat(doc.data().valor)  + receita_novembro
                  break;  
                case 12:
                  receita_dezembro = parseFloat(doc.data().valor)  + receita_dezembro
                  break;
              }
              

            } else if(doc.data().tipo_financia == 'Despesa') { 

              switch(mes) {
                case 7:
                  despesa_julho = parseFloat(doc.data().valor)  + despesa_julho
                  break;
                case 8:
                  despesa_agosto = parseFloat(doc.data().valor)  + despesa_agosto
                  break;  
                case 9:
                  despesa_setembro = parseFloat(doc.data().valor)  + despesa_setembro
                  break;
                case 10:
                  despesa_outubro = parseFloat(doc.data().valor)  + despesa_outubro
                  break;  
                case 11:
                  despesa_novembro = parseFloat(doc.data().valor)  + despesa_novembro
                  break;  
                case 12:
                  despesa_dezembro = parseFloat(doc.data().valor)  + despesa_dezembro
                  break;
              }
              
            }
          });
          setReceitaJulho(receita_julho)
          setReceitaAgosto(receita_agosto)
          setReceitaSetembro(receita_setembro)
          setReceitaOutubro(receita_outubro)
          setReceitaNovembro(receita_novembro)
          setReceitaDezembro(receita_dezembro)

          setDespesaJulho(despesa_julho)
          setDespesaAgosto(despesa_agosto)
          setDespesaSetembro(despesa_setembro)
          setDespesaOutubro(despesa_outubro)
          setDespesaNovembro(despesa_novembro)
          setDespesaDezembro(despesa_dezembro)

         

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

  useEffect(() => {
    buscaParaContasReceitasDespesas()
  },[gatilhoBuscaParaContasReceitasDespesas])



  return <AuthContext.Provider value={{user, loading, setGatilhoBuscarFinancias, setGatilhoBuscarSaldoConta, setgatilhoBuscarImagem, setGatilhoBuscaParaContas, setGatilhoBuscaParaContasReceitasDespesas, financias, saldo, imgUrl, receitaFinal, despesaFinal, receitaJulho, receitaAgosto, receitaSetembro, receitaOutubro, receitaNovembro, receitaDezembro, despesaJulho, despesaAgosto, despesaSetembro, despesaOutubro, despesaNovembro, despesaDezembro}}>{children}</AuthContext.Provider>;
};

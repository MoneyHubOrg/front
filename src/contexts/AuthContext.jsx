import React, {createContext, useState, useEffect} from 'react';
import auth from '@react-native-firebase/auth';

import firestore from '@react-native-firebase/firestore';


export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);


  const [loading, setLoading] = useState(true)
  const [gatilhoBuscarDados, setGatilhoBuscarDados] = useState(100)
  const [financias, setFinancias] = useState([])



  const buscaFinancias = async () => {
   

    if(gatilhoBuscarDados == 100) {
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




  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(setUser);
    return unsubscribe;
  }, []);


  useEffect(() => {
      buscaFinancias()
  },[gatilhoBuscarDados])

  return <AuthContext.Provider value={{user, loading, gatilhoBuscarDados, setGatilhoBuscarDados, financias}}>{children}</AuthContext.Provider>;
};

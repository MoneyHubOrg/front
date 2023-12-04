import React, {createContext, useState, useEffect, useContext} from 'react';
import {AuthContext} from './AuthContext';
import firestore from '@react-native-firebase/firestore';


export const AtlContext = createContext();


export const AtlProvider = ({children}) => {
  const { user } = useContext(AuthContext);
  const [atividades, setAtividades] = useState(null);
  const [atualizaInfos, setAtualizaInfo] = useState(0);

  const [loading, setLoading] = useState(true)
  const [financias, setFinancias] = useState([])
  const [dadosAtualizados, setDadosAtualizados] = useState(true)

  useEffect(() => {
    console.log('funcao procura rodando agora');
    const collectionRef = firestore()
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

        setLoading(false);
      })
      .catch(err => {
        console.error('Erro ao obter documentos da coleção:', err);
        setLoading(false);
      })
      .finally(() => {
        setDadosAtualizados(false)
      })
  }, [dadosAtualizados]);

  return (
    <AtlContext.Provider value={{atividades, setAtualizaInfo, atualizaInfos, loading, setLoading, financias, setFinancias, dadosAtualizados, setDadosAtualizados}}>
      {children}
    </AtlContext.Provider>
  );
};

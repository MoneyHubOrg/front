import React, {createContext, useState, useEffect, useContext} from 'react';
import {AuthContext} from './AuthContext';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';


export const AtlContext = createContext();


export const AtlProvider = ({children}) => {
  const { user } = useContext(AuthContext);
  const [atividades, setAtividades] = useState(null);
  const [atualizaInfos, setAtualizaInfo] = useState(0);

  const [loading, setLoading] = useState(true)
  const [financias, setFinancias] = useState([])
  const [dadosAtualizados, setDadosAtualizados] = useState(true)


  const[imgUrl, setImgUrl] = useState(null)

  const BuscandoDados = () => {
    const collectionRef = firestore()
        .collection('financia')
        // .where('email_usuario', '==', user.email)
        .where('email_usuario', '==', 'lucasrpmedici@gmail.com')
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

  }


  const BuscandoFotoPerfil = () => {
    // const imagePath = `imgs/${user.email}`
    const imagePath = `imgs/lucasrpmedici@gmail.com`

    const fetchImage = async () => {
      try {
        const url = await storage().ref(imagePath).getDownloadURL();
        setImgUrl(url)
      } catch (error) {
        console.log('erro ao buscar img' + error)
      }
    }

    fetchImage()


  }


  useEffect(() => {
    BuscandoDados()
    BuscandoFotoPerfil()
  }, [dadosAtualizados]);

  return (
    <AtlContext.Provider value={{atividades, setAtualizaInfo, atualizaInfos, loading, setLoading, financias, setFinancias, dadosAtualizados, setDadosAtualizados, imgUrl}}>
      {children}
    </AtlContext.Provider>
  );
};

import React, {createContext, useState, useEffect} from 'react';
import auth from '@react-native-firebase/auth';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [atualizaDadosAtividade, setAtualizaDadosAtividade] = useState(false);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(setUser);
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{user, setAtualizaDadosAtividade, atualizaDadosAtividade}}>
      {children}
    </AuthContext.Provider>
  );
};

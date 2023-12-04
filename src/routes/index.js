import { createStackNavigator } from '@react-navigation/stack';
import MainRoutes from './main.routes';
import Login from '../pages/Login';
import CadastroUsuario from '../pages/CadastroUsuario';
import { AuthContext, AuthProvider } from '../contexts/AuthContext';
import { AtlContext, AtlProvider } from '../contexts/AtlContext';

const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <AuthProvider>
      <AtlProvider>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="Main" component={MainRoutes} options={{ headerShown: false }} />
          <Stack.Screen name="Register" component={CadastroUsuario} options={{ headerShown: false }} />
        </Stack.Navigator>
      </AtlProvider>
    </AuthProvider>
  );
}

export default AppNavigator;

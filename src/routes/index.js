import { createStackNavigator } from '@react-navigation/stack';
import MainRoutes from './main.routes';
import Login from '../pages/Login';

const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="Main" component={MainRoutes} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

export default AppNavigator;

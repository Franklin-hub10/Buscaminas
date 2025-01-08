const handleLogin = async () => {
};
import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import RegistroScreen from '../Screens/RegistroScreens';


export interface RootStackParams {
Inicio: undefined;
Registro: undefined;
Menu: undefined;
Tabs: undefined;
Home: undefined;
Servicios: undefined;
Tienda: undefined;
MiPerfil: undefined;
[key: string]: undefined; 
}

const Stack = createStackNavigator<RootStackParams>();

const StackNavigator = () => {
return (
<Stack.Navigator
 screenOptions={{
   headerShown: false,
   headerStyle: {
     elevation: 1,
   },
 }}
>
<Stack.Screen name="Registro" component={RegistroScreen} />

</Stack.Navigator>
);
};

export default StackNavigator;
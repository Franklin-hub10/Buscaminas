import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreens from "../Screens/LoginScreens";
import RegistroScreen from "../Screens/RegistroScreens";
import BuscaminasScrenns from '../Screens/BuscaminasScrenns';
import ScoreScreen from "../Screens/ScoreScreen";
import CreditosScrenn from "../Screens/CreditosScrenn";
import { createStackNavigator } from "@react-navigation/stack";
import { View } from "react-native";




export type RootStackParams = {
    Login: undefined;
    Botton: undefined; 
    Registro: undefined;
    Juego: undefined;
  };
  

const Top = createMaterialTopTabNavigator();

function MyTops(){
    return(
        <View style={{ marginTop: '10%', flex: 1, backgroundColor: '#f0f0f0' }}>
        <Top.Navigator >
            <Top.Screen name="Jugar" component={BuscaminasScrenns}/>
            <Top.Screen name="Score" component={ScoreScreen}/>
            <Top.Screen name="Creditos" component={CreditosScrenn}/>
        </Top.Navigator>
        </View>

    );
}


//////////

const Stack = createStackNavigator();
function MyStack(){
    return(
<Stack.Navigator screenOptions={()=> ({headerShown: false}) }>
    <Stack.Screen name = 'Login' component={LoginScreens}/>

<Stack.Screen name ='Botton' component={RegistroScreen}/>
<Stack.Screen name ='Juego' component={MyTops}/>
</Stack.Navigator>
    );
}

//////


export default function MainNavigador(){
    return(
        <NavigationContainer>
            <MyStack/>
        </NavigationContainer>
    )
}
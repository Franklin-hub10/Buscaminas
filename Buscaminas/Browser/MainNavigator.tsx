import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreens from "../Screens/LoginScreens";
import RegistroScreen from "../Screens/RegistroScreens";
import BuscaminasScrenns from '../Screens/BuscaminasScrenns';
import ScoreScreen from "../Screens/ScoreScreen";
import CreditosScrenn from "../Screens/CreditosScrenn";



const Top = createMaterialTopTabNavigator();

function MyTops(){
    return(
        <Top.Navigator initialRouteName="Guardar">
            <Top.Screen name="Login" component={LoginScreens}/>
            <Top.Screen name="Registro" component={RegistroScreen}/>
            <Top.Screen name="Juegar" component={BuscaminasScrenns}/>
            <Top.Screen name="Score" component={ScoreScreen}/>
            <Top.Screen name="Creditos" component={CreditosScrenn}/>
        </Top.Navigator>

    );
}

export default function MainNavigador(){
    return(
        <NavigationContainer>
            <MyTops/>
        </NavigationContainer>
    )
}
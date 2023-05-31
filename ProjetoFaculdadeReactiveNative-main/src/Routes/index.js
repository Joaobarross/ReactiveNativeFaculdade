import {createNativeStackNavigator} from "@react-navigation/native-stack";

import Login from "../Pages/Login";
import Cadastro from "../Pages/Cadastro";
import Home from "../Pages/Home"
import Profile from "../Pages/Profile";
import Edit from "../Pages/Edit";
import Favoritos from "../Pages/Favoritos";

const Stack = createNativeStackNavigator();

Rotas = () => {
    return(
        <Stack.Navigator initialRouteName="Login">

            <Stack.Screen
               name="Login"
               component={Login}
               options={{headerShown: false}}
               
            />
            <Stack.Screen
               name="Cadastro"
               component={Cadastro}
               options={{headerShown: false}}
               
            />
            <Stack.Screen
                name="Home"
                component={Home}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="Profile"
                component={Profile}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="Edit"
                component={Edit}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="Favoritos"
                component={Favoritos}
                options={{headerShown: false}}
            />
           
        </Stack.Navigator>
    )
}
export default Rotas;
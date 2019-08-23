/**
 * @author Douglas Canevarollo
 * 
 * Arquivo de rotas da aplicação.
 */
import React from 'react';
import { Image } from 'react-native';
import { 
    createAppContainer, 
    createStackNavigator  // O stack navigator automaticamente cria um header na aplicação.
} from 'react-navigation';

import logo from './assets/instagram.png';

import Feed from './pages/Feed';

const Routes = createAppContainer(

    /* O segundo parâmetro é uma configuração do stack navigator. */
    createStackNavigator({
        Feed
    }, {
        headerLayoutPreset: 'center',
        defaultNavigationOptions: {  // Configuração passada para todas as telas da aplicação.
            headerTitle: <Image source={logo} />,
            headerStyle: {
                backgroundColor: '#f5f5f5'
            }
        }
    })
); 

export default Routes;

/**
 * @author Douglas Canevarollo
 * 
 * Arquivo de rotas da aplicação.
 */
import { 
    createAppContainer, 
    createStackNavigator  // O stack navigator automaticamente cria um header na aplicação.
} from 'react-navigation';

import Feed from './pages/Feed';

const Routes = createAppContainer(
    createStackNavigator({
        Feed
    })
); 

export default Routes;

/**
 * @author Douglas Canevarollo
 * 
 * Arquivo de entrada da aplicação.
 */
import React from 'react';
import { StatusBar } from 'react-native';

import Routes from './routes';

export default function App() {
    return(
        /* Fragment: não é permitido ter dois elementos, um abaixo do outro, sem ter um outro elemtento por vota deles.
        Então, o fragment é utilizado como um "elemento invisível" para solucionarmos esse problema. */
        <>
            <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />
            <Routes />
        </>
        /* O dark-content da status bar diz respeito a cor dos textos/conteúdos da barra de status. */
    );
}

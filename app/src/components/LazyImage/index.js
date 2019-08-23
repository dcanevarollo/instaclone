/**
 * @author Douglas Canevarollo
 * 
 * Componente de imagens que têm prévias carregadas.
 */
import React, { useState, useEffect } from 'react';
import { Animated } from 'react-native';

import { Small, Original } from './styles';

/* Componentes com animações devem utilizar o Animated do React Native. */
const OriginalAnimated = Animated.createAnimatedComponent(Original);

/**
 * @param {String} smallSource : fonte da imagem pequena (baixa definição).
 * @param {String} source : fonte da imagem original (alta definição).
 * @param {Number} aspectRatio : raio total da imagem a ser carregada. 
 */
export default function LazyImage({
    smallSource,
    source,
    aspectRatio,
    shouldLoad
}) {
    const opacity = new Animated.Value(0);
    const [loaded, setLoaded] = useState(false);

    /**
     * Utiliza um delay de 1s para carregar a imagem original. É disparado se a propriedade shouldLoad for verdadeira
     * (ou ser alterada). Esta, por sinal, é atribuída no feed quando o usuário consegue visualizar a imagem.
     */
    useEffect(() => {
        if (shouldLoad) {
            setTimeout(() => {
                setLoaded(true);
            }, 500);
        }
    }, [shouldLoad]);

    /**
     * Anima a variável opacity quando a função for chamada.
     */
    function handleAnimate() {
        Animated.timing(opacity, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true  // Faz com que a animação ocorra no lado nativo da aplicação (Java ou Objective C).
        }).start();
    }

    return(
        <Small
            source={smallSource} 
            ratio={aspectRatio} 
            resizeMode="contain"
            blurRadius={2} 
        >
            { 
                loaded && 
                    <OriginalAnimated
                        style={{ opacity }} 
                        source={source}
                        ratio={aspectRatio}
                        resizeMode="contain"
                        onLoadEnd={handleAnimate}    
                    /> 
            }
            
        </Small>
    );
}

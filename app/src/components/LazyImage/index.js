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
    aspectRatio
}) {
    const [loaded, setLoaded] = useState(false);

    /**
     * Utiliza um delay de 1s para carregar a imagem original.
     */
    useEffect(() => {
        setTimeout(() => {
            setLoaded(true);
        }, 1000);
    }, []);

    function handleAnimate() {

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
                        source={source}
                        ratio={aspectRatio}
                        resizeMode="contain"
                        onLoadEnd={handleAnimate}    
                    /> 
            }
            
        </Small>
    );
}

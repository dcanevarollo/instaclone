/**
 * @author Douglas Canevarollo
 * 
 * Estilização do componente LazyImage.
 */
import styled from 'styled-components/native';

export const Small = styled.ImageBackground`
    width: 100%;
    /* A propriedade deverá ser pega pela pelo componente (das props recebida, pego a ratio). */
    aspect-ratio: ${props => props.ratio};
`;

export const Original = styled.Image`
    width: 100%;
    aspect-ratio: ${props => props.ratio};
`;

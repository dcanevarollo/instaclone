/**
 * @author Douglas Canevarollo
 * 
 * Componente de estilização do feed de posts da aplicação. Utilizaremos os styled components para a componentização.
 */
import styled from 'styled-components/native';

export const Post = styled.View`
    margin-top: 10px;
`;

export const Header = styled.View`
    padding: 15px;
    flex-direction: row;
    align-items: center;
`;

export const Avatar = styled.Image`
    width: 32px;
    height: 32px;
    border-radius: 16px;  /* Metade da altura/largura para ela ficar redonda. */
    margin-right: 10px;
`;

export const Name = styled.Text`
    color: #333;
    font-weight: bold;
`;

export const PostImage = styled.Image`
    width: 100%;
    /* A propriedade deverá ser pega pela pelo componente (das props recebida, pego a ratio). */
    aspect-ratio: ${props => props.ratio};
`;

export const Description = styled.Text`
    padding: 15px;
    line-height: 18px;
`;

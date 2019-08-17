/**
 * @author Douglas Canevarollo
 * 
 * Componente de visualização do feed da aplicação.
 */
import React, { useState, useEffect } from 'react';
import { 
    View,
    FlatList  // Listagem com scroll.
} from 'react-native'

import { 
    Post,
    Header,
    Avatar,
    Name,
    PostImage,
    Description
} from './styles';

export default function Feed() {
    let [feed, setFeed] = useState([]);

    /**
     * Ao carregar a tela, carregaremos o feed do servidor para exibirmos na tela principal.
     * Como o parâmetro de sensibiidade está vazio, só será executado uma vez (no início).
     */
    useEffect(() => {
        async function loadFeed() {
            /* Utilizaremos fetch (em vez do axios) pois somente uma chamara a API será feita. Passamos também, como
            parâmetro, além do feed, os autores das postagens (semelhante a um JOIN em SQL), por meio do _expand.
            Ademais, limitamos a apenas 5 postagens carregadas para a página 1 do feed. */
            const response = await fetch('http://localhost:3000/feed?_expand=author&_limit=5&_page=1');
            /* Lembre-se de ajustar o endereço IP para a máquina hospedeira. */

            const data = await response.json();  // Formata a resposta em JSON.

            setFeed(data);
        }

        loadFeed();
    }, []);

    return (
        <View>
            <FlatList 
                data={feed}
                keyExtractor={post => String(post.id)}
                renderItem={({ item }) => (
                    <Post>
                        <Header>
                            <Avatar source={{ uri: item.author.avatar }} />
                            <Name>{item.author.name}</Name>
                        </Header>

                        <PostImage ratio={item.aspectRatio} source={{ uri: item.image }} />

                        <Description>
                            <Name>{item.author.name}</Name> {item.description}
                        </Description>
                    </Post>
                )}
            />
        </View>
    );
}

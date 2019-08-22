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

import LazyImage from '../../components/LazyImage';

import { 
    Post,
    Header,
    Avatar,
    Name,
    Description,
    Loading
} from './styles';

export default function Feed() {
    const [feed, setFeed] = useState([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    /**
     * Carrega a página corrente (pageNumber) na tela, buscando as informações do servidor JSON.
     * 
     * @param {Number} pageNumber : indica qual a página que deverá ser carregada no momento; por padrão, será 1.
     * @param {Boolean} shouldRefresh : indica quando deve ser feita uma atualização ou apenas um novo carregamento.
     */
    async function loadPage(pageNumber = page, shouldRefresh = false) {
        /* Não permite carregar mais páginas que o total definido. */
        if (total !== 0 && pageNumber > total) return;

        setLoading(true);

        /* Utilizaremos fetch (em vez do axios) pois somente uma chamara a API será feita. Passamos também, como
        parâmetro, além do feed, os autores das postagens (semelhante a um JOIN em SQL), por meio do _expand.
        Ademais, limitamos a apenas 5 postagens carregadas para a página 1 do feed. */
        const response = await fetch(`http://localhost:3000/feed?_expand=author&_limit=5&_page=${pageNumber}`);
        /* Lembre-se de ajustar o endereço IP para a máquina hospedeira. */

        /* Formata a resposta em JSON. */
        const data = await response.json();
        /* A resposta do servidor possui um campo de cabeçalho contendo o valor total de itens. */
        const totalItems = response.headers.get('X-Total-Count');

        /* O total será o número de itens por página (limitamos por 5 itens na chamada à API). */
        setTotal(Math.ceil(totalItems / 5));
        /* Se não for uma atualização, para não substituirmos o novo feed ao antigo, devemos incrementá-lo. Assim, defi-
        nimos o novo feed como o feed atual (...feed copia tudo o que feed contém) e adicionamos os novos dados 
        (...data). */
        setFeed(shouldRefresh ? data : [...feed, ...data]);
        setPage(pageNumber + 1);

        setLoading(false);
    }

    /**
     * Atualiza o feed da tela.
     */
    async function refreshList() {
        setRefreshing(true);

        /* Carrega a primeira página. */
        await loadPage(1, true);

        setRefreshing(false);
    }

    /**
     * Ao carregar a tela, carregaremos o feed do servidor para exibirmos na tela principal.
     * Como o parâmetro de sensibiidade está vazio, só será executado uma vez (no início).
     */
    useEffect(() => {
        loadPage();
    }, []);

    return (
        <View>
            <FlatList 
                data={feed}
                keyExtractor={post => String(post.id)}
                /* Ao final da lista, chama a função loadPage(). É necessário utilizar funções funcionais pois, por pa-
                drão, onEndReached envia alguns parâmetros à função chamada, mas não queremos isso. */
                onEndReached={() => loadPage()}
                /* Carrega os próximos itens do servidor quando o usuário chegar a 10% do final da lista (threshold). */
                onEndReachedThreshold={0.1}
                onRefresh={refreshList}
                refreshing={refreshing}
                ListFooterComponent={loading && <Loading />}
                renderItem={({ item }) => (
                    <Post>
                        <Header>
                            <Avatar source={{ uri: item.author.avatar }} />
                            <Name>{item.author.name}</Name>
                        </Header>

                        <LazyImage 
                            aspectRatio={item.aspectRatio} 
                            source={{ uri: item.image }}
                            smallSource={{ uri: item.small }}
                        />

                        <Description>
                            <Name>{item.author.name}</Name> {item.description}
                        </Description>
                    </Post>
                )}
            />
        </View>
    );
}

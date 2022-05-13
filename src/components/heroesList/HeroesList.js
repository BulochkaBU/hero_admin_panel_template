import {useHttp} from '../../hooks/http.hook';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import { heroesFetching, heroesFetched, heroesFetchingError, heroesDeleted} from '../../actions';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';

// Задача для этого компонента:
// При клике на "крестик" идет удаление персонажа из общего состояния
// Усложненная задача:
// Удаление идет и с json файла при помощи метода DELETE

const HeroesList = () => {

    const filteredHeroesSelector = createSelector(
        (state) => state.filters.activeFilter,
        (state) => state.heroes.heroes,
        (filter, heroes) => {
            if (filter === 'all'){
                console.log('render') // при таком методе селектор мемоизирует данные
                return heroes
            } else {
                return heroes.filter(item => item.element === filter)
            }
        }
    )

    // const filteredHeroes = useSelector(state => {
    //     if (state.filters.activeFilter === 'all'){
    //         console.log('render') // при таком методе будет селектор вызываться каждый раз, страдает оптимизация
    //         return state.heroes.heroes
    //     } else {
    //         return state.heroes.heroes.filter(item => item.element === state.filters.activeFilter)
    //     }
    // });

    const filteredHeroes = useSelector(filteredHeroesSelector)
    const {heroesLoadingStatus} = useSelector(state => state.heroes.heroesLoadingStatus);
    const dispatch = useDispatch();
    const {request} = useHttp();

    useEffect(() => {
        dispatch(heroesFetching());
        request("http://localhost:3001/heroes", 'GET')
            .then(data => dispatch(heroesFetched(data)))
            .catch(() => dispatch(heroesFetchingError()))

        // eslint-disable-next-line
    }, []);


    if (heroesLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (heroesLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }


    const onDelete = (id) => {
        // dispatch(heroesDeleted(heroes, id));
        request("http://localhost:3001/heroes/" + id, 'DELETE')
        dispatch(heroesDeleted(id));
        
    }   
    
    const renderHeroesList = (arr) => {
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">Героев пока нет</h5>
        }

        return arr.map(({id, ...props}) => {            
            return <HeroesListItem key={id} {...props} onDelete={() => onDelete(id)}/>
        })
    }

    const elements = renderHeroesList(filteredHeroes);
    
    return (
        <ul>
            {elements}
        </ul>
    )
}

export default HeroesList;
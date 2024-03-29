import {useMemo} from 'react';
import { useSelector } from 'react-redux';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';
import {useGetHeroesQuery, useDeleteHeroMutation} from '../../api/apiSlice'

// Задача для этого компонента:
// При клике на "крестик" идет удаление персонажа из общего состояния
// Усложненная задача:
// Удаление идет и с json файла при помощи метода DELETE

const HeroesList = () => {

    const {
        isLoading,
        isFetching,
        isError,
        data: heroes = []

    } = useGetHeroesQuery()

    const activeFilter = useSelector(state => state.filter.activeFilter)

    const [deleteHero] = useDeleteHeroMutation()

    const filteredHeroes = useMemo(() => {
        const filteredHeroes = heroes.slice()

        if (activeFilter === 'all'){
            return filteredHeroes
        } else {
            return filteredHeroes.filter(item => item.element === activeFilter)
        }
    }, [heroes, activeFilter])

    if (isLoading || isFetching) {
        return <Spinner/>;
    } else if (isError) {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const onDelete = (id) => {
        deleteHero(id)        
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
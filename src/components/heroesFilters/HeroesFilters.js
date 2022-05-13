import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import {useHttp} from '../../hooks/http.hook';

import { filterFetched,filterActive, heroesFetched, heroesFiltered} from '../../actions';



// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

const HeroesFilters = () => {
    const {filters} = useSelector(state => state)
    const {request} = useHttp();
    const dispatch = useDispatch();

    useEffect(() => {
        request("http://localhost:3001/filters", 'GET')
        .then(data => dispatch(filterFetched(data)))

    },[])


    const renderFilters = (arr) => {
        return arr.map(item => {
            return  <button
                key={item.name}
                className={item.classNames}
                name={item.name}
                onClick={() => dispatch(filterActive(item.name))}>
                {item.label}
                </button>
        })
    }

    const elements = renderFilters(filters)


    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {elements}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useHttp } from '../../hooks/http.hook';
import { heroAdded, heroesFetchingError} from '../../actions';
// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров

const HeroesAddForm = () => {
    const {filters} = useSelector(state => state.filters);
    const dispatch = useDispatch();
    const {request} = useHttp();
    const [newHero, setNewHero] = useState({id: '', name: '', description: '', element: ''})    

    const onNewHero = (e) => {
        setNewHero({...newHero,
            [e.target.name]: e.target.value,
            id: uuidv4()
        })      
    }

    const onAddNewHero = (e) => {
        e.preventDefault();
        //dispatch(heroAdded(heroes, newHero))
        request("http://localhost:3001/heroes/", 'POST', JSON.stringify(newHero))

            .then(dispatch(heroAdded(newHero)))
            .catch(() => dispatch(heroesFetchingError()))
        
        setNewHero({id: '', name: '', description: '', element: ''})
      
    }

    const renderFilters= (arr) => {
        return arr.map(el => {
            // eslint-disable-next-line
            if (el.name === 'all') return 
            
            return <option key={el.name} value={el.name}>{el.label}</option>
        })
        
    }
    const newFilters = renderFilters(filters)    

    return (
        <form onSubmit={onAddNewHero} className="border p-4 shadow-lg rounded">
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                <input 
                    required
                    onChange={onNewHero}
                    type="text" 
                    name='name'
                    value={newHero.name}
                    className="form-control" 
                    id="name" 
                    placeholder="Как меня зовут?"/>
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Описание</label>
                <textarea
                    required
                    onChange={onNewHero}
                    name="description"
                    value={newHero.description}
                    className="form-control" 
                    id="text" 
                    placeholder="Что я умею?"
                    style={{"height": '130px'}}/>
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                <select 
                    required
                    onChange={onNewHero}
                    value={newHero.element}
                    className="form-select" 
                    id="element" 
                    name="element">
                    <option >Я владею элементом...</option>
                    
                   {newFilters}
                        
                    
                    
                </select>
            </div>


            <button type="submit" className="btn btn-primary">Создать</button>
        </form>
    )
}

export default HeroesAddForm;
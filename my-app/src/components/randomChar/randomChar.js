//mod
import React, {Component} from 'react';
import gotService from '../services/gotService';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../error';
//css
import './randomChar.css';

export default class RandomChar extends Component {
    constructor() {
        super();
        this.updataChar();
    }
    gotService = new gotService();
    state = {
      char: {},//Пустой обьект.
      loading: true,
      error: false
    }
    //Загрузка персонажа
    onCharLoaded = (char) => {
        this.setState({
            char,
            loading: false
        })
    }
    //Загрузка ошибки
    onError = (err) => {
        this.setState({
            error: true,
            loading: false
        })
    }
    //Обновление рандомного персонажа
    updataChar() {
        // const id = Math.floor(Math.random()*140 + 25);
        const id = 50; //Для теста ошибки.
        this.gotService.getCharacter(id)
            .then(this.onCharLoaded)
            .catch(this.onError)
    }

    render() {
        const { char, loading, error } = this.state;

        const errorMes = error ? <ErrorMessage/> : null; //Проверка на ошибку  если проверка true выводим сообщение из модуля.
        const spinner = loading ? <Spinner/> :  null; //Если данные долго грузятся то мапим спинер.
        const content = !(loading || error) ? <View char={char}/> : null; //Инверсивная проверка если не loading и не error, то мапим список

        return (
            <div className="random-block rounded">
                {errorMes}
                {spinner}
                {content}
            </div>
        );
    }
}
//Представление персонажа которое принимает данные из gotService
const View = ({char}) => {
    const {name, gender, born, died, culture} = char;
    return (
        <>
        <h4>Random Character: {name}</h4>
        <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Gender </span>
                    <span>{gender}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Born </span>
                    <span>{born}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Died </span>
                    <span>{died}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Culture </span>
                    <span>{culture}</span>
                </li>
            </ul>
        </>
    )
}
import React from "react";
import img from './er.png'
//css
import './errorMessage.css';

const ErrorMessage = () => {
    return (
        <>
            {/* <img src={process.env.PUBLIC_URL + '/img/got.jpeg'} alt='error'></img> Ссылка на статический обьект в проекте */ } 
            <span className="text"><p>Где-то ошибка.</p></span>
            <img src={img} alt='error'></img>
        </>
    )
}

export default ErrorMessage;
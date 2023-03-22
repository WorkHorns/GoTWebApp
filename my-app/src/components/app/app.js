import React, { Component } from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ErrorMessage from '../error';
import CharacterPage, {HousesPage, BookPage} from '../itemPages';
import gotService from '../services/gotService';
// import {BrowserRouter as Router, Route} from 'react-router-dom';

export default class App extends Component {
    gotService = new gotService();

    state = {
        showRandomChar: true,
        error: false
    };

    componentDidCatch() {
        this.setState({error: true})
    }

    toggleRandomChar = () => {
    this.setState((state) => {
        return {
                showRandomChar: !state.showRandomChar
            }
        })
    }
    
    render() {
        const char = this.state.showRandomChar ? <RandomChar/> : null;

        if(this.state.error) {
            return <ErrorMessage/>
        }
        return(
            <>
                    <Container>
                        <Header />
                    </Container>
                    <Container>
                        <Row>
                            <Col lg={{size: 5, offset: 0}}>
                                {char}
                                <button 
                                className="toggle-block"
                                onClick={this.toggleRandomChar}>Hide character
                                </button>
                            </Col>
                        </Row>
                       
                        <CharacterPage/>
                        <HousesPage/>
                        <BookPage/>
                    </Container>
            </>
         
        )
    }
}

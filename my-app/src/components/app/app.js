import React, { Component } from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ErrorMessage from '../error';
import {CharacterPage, HousePage, BookPage} from '../itemPages';
import gotService from '../services/gotService';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

//css
import './app.css'

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
            <Router>
                <div>
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
                    <Routes>
                        <Route path='/characters' Component={CharacterPage}/>
                        <Route path='/houses' Component={HousePage}/>
                        <Route path='/books' Component={BookPage}/>
                    </Routes>
                </Container>
                </div>
            </Router>
        )
    }
}

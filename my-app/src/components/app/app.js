import React, { Component } from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ErrorMessage from '../error';
import CharacterPage, {HousesPage} from '../itemPages';
import CharDetails from '../charDetails';
import ItemList from '../itemList';
import gotService from '../services/gotService';
// import {BrowserRouter as Router, Route} from 'react-router-dom'

export default class App extends Component {
    gotService = new gotService();

    state = {
        showRandomChar: true,
        error: false
    };

    componentDidCatch() {
        console.log('error');
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
                <Row>
                    <Col md='6'>
                        <ItemList 
                        onItemSelected={this.onItemSelected}
                        getData={this.gotService.getAllBooks}
                        renderItem={(item) => item.name}/>
                    </Col>
                    <Col md='6'>
                        <CharDetails 
                        charID={this.state.selectedChar}/>
                    </Col>
                </Row>
                {/* <Row>
                    <Col md='6'>
                        <ItemList 
                        onItemSelected={this.onItemSelected}
                        getData={this.gotService.getAllHouses}
                        renderItem={(item) => item.name}/>
                    </Col>
                    <Col md='6'>
                        <CharDetails 
                        charID={this.state.selectedChar}/>
                    </Col>
                </Row> */}
            </Container>
        </>
        )
    }
}

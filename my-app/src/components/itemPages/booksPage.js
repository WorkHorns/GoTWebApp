import React, { Component } from 'react';
import ItemList from '../itemList';
import BookDetails, {Field} from '../bookDetails';
import ErrorMessage from '../error';
import gotService from '../services/gotService';
import RowBlock from '../rowBlock';



export default class BookPage extends Component {
    gotService = new gotService();

    state = {
        selectedBook: null,
        error: false
    }

    componentDidCatch() {
        this.setState({error: true})
    }

    onItemSelected = (id) => {
        this.setState({
            selectedBook: id
        })
    }

    render() {
        if(this.state.error) {
            return <ErrorMessage/>
        }

        const itemList = (
            <ItemList 
            onItemSelected={this.onItemSelected}
            getData={this.gotService.getAllBooks}
            renderItem={({name}) => `${name}`}
            />
            )

        const bookDetails = (
            <BookDetails bookId={this.state.selectedBook}>
                <Field field='numberOfPages' label='Number Of Pages'/>
                <Field field='released' label='Released'/>
            </BookDetails>
        )

        return (
            <RowBlock left={itemList} right={bookDetails}/>
        )
    }
}


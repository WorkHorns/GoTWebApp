import React, { Component } from 'react';
import ItemList from '../itemList';
import HouseDetails, {Field} from '../houseDetails';
import ErrorMessage from '../error';
import gotService from '../services/gotService';
import RowBlock from '../rowBlock';



export default class HousesPage extends Component {
    gotService = new gotService();

    state = {
        selectedHouse: null,
        error: false
    }

    componentDidCatch() {
        this.setState({error: true})
    }

    onItemSelected = (id) => {
        this.setState({
            selectedHouse:id
        })
    }

    render() {
        if(this.state.error) {
            return <ErrorMessage/>
        }

        const itemList = (
            <ItemList 
            onItemSelected={this.onItemSelected}
            getData={this.gotService.getAllHouses}
            renderItem={({name}) => `${name}`}
            />
            )

        const houseDetails = (
            <HouseDetails houseId={this.state.selectedHouse}>
                <Field field='region' label='Region'/>
                <Field field='words' label='Words'/>
                <Field field='coatOfArms' label='Coat Of Arms'/>
            </HouseDetails>
        )

        return (
            <RowBlock left={itemList} right={houseDetails}/>
        )
    }
}


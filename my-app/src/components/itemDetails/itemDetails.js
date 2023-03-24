import React, {Component} from 'react';
import gotService from '../services/gotService';


import './itemDetails.css';

const Field = ({item, field, label}) => {
    return (
        <li className="list-group-item d-flex justify-content-between">
            <span className="term">{label}</span>
            <span>{item[field]}</span>
        </li>
    )
}

export {Field};
export default class ItemDetails extends Component {

    gotService = new gotService();

    state = {
        item: null,
        logo: "Сhoose what are you interested"
    }

    componentDidMount() {
        this.updateItem();
    }

    componentDidUpdate(prevProps) {
        if(this.props.itemId !== prevProps.itemId) {
            this.updateItem();
        }
    }

    updateItem() {
        const {itemId} = this.props;
        const {getData} = this.props;

        if(!itemId){
            return;
        }

        getData(itemId)
            .then((item) => {
            this.setState({item})
        })
    }

    render() {
        const {item} = this.state; 
        const {logo} = this.state;

        if(!item) {
            return <span className='select-error'>{logo}</span>
        }
        
        const {name} = item

        return (
            <div className="item-details rounded">
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
                   {
                        React.Children.map(this.props.children, (child) => {
                            return React.cloneElement(child, {item})
                        })
                   }
                </ul>
            </div>
        );
    }
}
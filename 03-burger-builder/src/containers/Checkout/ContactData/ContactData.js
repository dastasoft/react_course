import React, { Component } from 'react';
import axios from '../../../axios-orders';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.module.css';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    };

    orderHandler = event => {
        event.preventDefault();
        this.setState({ loading: true });
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price, // calculate this on the server
            customer: {
                name: 'KoshiroKun',
                address: {
                    street: 'Baker Street',
                    zipCode: '1212',
                    country: 'London'
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'asap'
        };

        axios
            .post('/orders.json', order)
            .then(_response => {
                this.setState({ loading: false });
                this.props.history.push('/');
            })
            .catch(_error => {
                this.setState({ loading: false });
            });
    };

    render() {
        let form = (
            <form>
                <input
                    className={classes.Input}
                    type="text"
                    name="name"
                    placeholder="Your Name"
                />
                <input
                    className={classes.Input}
                    type="email"
                    name="email"
                    placeholder="Your Mail"
                />
                <input
                    className={classes.Input}
                    type="text"
                    name="street"
                    placeholder="Street"
                />
                <input
                    className={classes.Input}
                    type="text"
                    name="postal"
                    placeholder="Postal Code"
                />
                <Button btnType="Success" clicked={this.orderHandler}>
                    ORDER
                </Button>
            </form>
        );

        if (this.state.loading) {
            form = <Spinner />;
        }

        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;

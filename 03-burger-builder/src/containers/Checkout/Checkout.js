import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/Checkout';
import ContactData from './ContactData/ContactData';
import * as actions from '../../store/actions';

class Checkout extends Component {
    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    };

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    };

    render() {
        let checkOutSummary = <Redirect to="/" />;

        if (this.props.ings) {
            const purchasedRedirect = this.props.purchased ? (
                <Redirect to="/" />
            ) : null;

            checkOutSummary = (
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary
                        ingredients={this.props.ings}
                        checkoutCancelled={this.checkoutCancelledHandler}
                        checkoutContinued={this.checkoutContinuedHandler}
                    />
                    <Route
                        path={`${this.props.match.path}/contact-data`}
                        component={ContactData}
                    />
                </div>
            );
        }

        return checkOutSummary;
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    };
};

export default connect(mapStateToProps)(Checkout);

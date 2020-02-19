import React, { Component } from 'react';
import { connect } from 'react-redux';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actionTypes from '../../store/actions';
const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

class BurgerBuilder extends Component {
    state = {
        totalPrice: 4,
        purchaseable: false,
        purchasing: false,
        loading: false
    };

    componentDidMount() {
        // axios
        //     .get(
        //         'https://react-my-burger-b4c57.firebaseio.com/ingredients.json'
        //     )
        //     .then(response => {
        //         this.setState({ ingredients: response.data });
        //     })
        //     .catch(error => {});
    }

    updatePurchaseState = ingredients => {
        const sum = Object.keys(ingredients)
            .map(igKey => ingredients[igKey])
            .reduce((sum, el) => sum + el, 0);

        this.setState({ purchaseable: sum > 0 });
    };

    addIngredientHandler = type => {
        const updatedIngredients = { ...this.props.ings };
        updatedIngredients[type] = updatedIngredients[type] + 1;

        this.setState({
            ingredients: updatedIngredients,
            totalPrice: this.state.totalPrice + INGREDIENT_PRICES[type]
        });

        this.updatePurchaseState(updatedIngredients);
    };

    removeIngredientHandler = type => {
        const updatedIngredients = { ...this.props.ings };
        if (updatedIngredients[type] <= 0) return;
        updatedIngredients[type] = updatedIngredients[type] - 1;

        this.setState({
            ingredients: updatedIngredients,
            totalPrice: this.state.totalPrice - INGREDIENT_PRICES[type]
        });

        this.updatePurchaseState(updatedIngredients);
    };

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    };

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    };

    purchaseContinueHandler = () => {
        const queryParams = Object.keys(this.props.ings).map(
            ingredient =>
                encodeURIComponent(ingredient) +
                '=' +
                encodeURIComponent(this.props.ings[ingredient])
        );

        queryParams.push(`price=${this.state.totalPrice}`);

        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryParams.join('&')
        });
    };

    render() {
        const disabledInfo = {
            ...this.props.ings
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null;
        let burger = <Spinner />;

        if (this.props.ings) {
            burger = (
                <>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        price={this.state.totalPrice}
                        ordered={this.purchaseHandler}
                        purchaseable={this.state.purchaseable}
                    />
                </>
            );

            orderSummary = (
                <OrderSummary
                    ingredients={this.props.ings}
                    price={this.state.totalPrice}
                    purchaseCancelled={this.purchaseCancelHandler}
                    purchaseContinued={this.purchaseContinueHandler}
                />
            );

            if (this.state.loading) {
                orderSummary = <Spinner />;
            }
        }

        return (
            <>
                <Modal
                    show={this.state.purchasing}
                    modalClosed={this.purchaseCancelHandler}
                >
                    {orderSummary}
                </Modal>
                {burger}
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: ingredientName =>
            dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName }),
        onIngredientRemoved: ingredientName =>
            dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingredientName })
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));

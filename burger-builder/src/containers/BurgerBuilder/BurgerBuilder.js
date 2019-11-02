import React, { Component } from 'react';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

class BurgerBuilder extends Component {
    // constructor (props) {
    //     super(props);
    //     this.state = {};
    // }

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 0
    };

    addIngredientHandler = type => {
        const updatedIngredients = { ...this.state.ingredients };
        updatedIngredients[type] = updatedIngredients[type] + 1;

        this.setState({
            ingredients: updatedIngredients,
            totalPrice: this.state.totalPrice + INGREDIENT_PRICES[type]
        });
    };

    removeIngredientHandler = type => {};

    render() {
        return (
            <>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls 
                    ingridientAdded={this.addIngredientHandler}
                />
            </>
        );
    }
}

export default BurgerBuilder;

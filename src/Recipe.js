import React, { Component, useState } from "react";
import style from './recipe.module.css';

import axios from "axios";

class Recipe extends Component {

    constructor(props) {
      super(props);
      this.state = {details : false, recipeItems: {}, ingredientsMeta: {}};
      this.toggleDetails = this.toggleDetails.bind(this);
      this.getIngredientMeta = this.getIngredientMeta.bind(this);
    }

    toggleDetails() {
        if(this.state.details) {
            this.setState({details : false});
        }
        else
        {
            // Get ingredients in recipe
            axios.get('http://localhost:8080/COM3014_CW_Group10/api/recipe/' + this.props.id + "/ingredients", {withCredentials: true}).then(
                res => {
                    this.getIngredientMeta(res.data);
                    this.setState({details : !this.state.details, recipeItems : res.data});
            }); 
        }
    }

    getIngredientMeta(data) {
        for(var i = 0; i < data.length; i++) {
            var obj = data[i];
            axios.get('http://localhost:8080/COM3014_CW_Group10/api/ingredient/' + obj.ingredientID, {withCredentials: true}).then(
                res => {
                    var tempArray = this.state.ingredientsMeta;
                    tempArray[res.data.id] = res.data.name;
                    this.setState({ ingredientsMeta : tempArray});
                });
            console.log(obj.ingredientID);
        }
    }
  
    render() {   
      return (
        <div className={style.recipe}>
                    <h1>#{this.props.id} {this.props.title}</h1>
                        { this.state.details ? 
                            // stuff to show
                            <div>
                                <h2>Method</h2>
                                <p>{this.props.method}</p>
                                <ol>
                                <h2>Ingredients</h2>
                                { this.state.recipeItems.map( recipeItem => (
                                    <li key={recipeItem.ingredientID}> {recipeItem.amount} {recipeItem.quantifier} of {this.state.ingredientsMeta[recipeItem.ingredientID]}</li>
                                ))}
                                </ol>
                            </div>
                            : // stuff to not
                            <div></div>
                        }
                        <form onSubmit={this.toggleDetails}>
                        <button type="submit">{this.state.details ? "Close" : "More"}</button>
                        </form>
                </div>
      );
    }
  }
  

export default Recipe;
import React, { Component } from "react";
//import './addrecipe.scss';
import axios from "axios";


class AddRecipe extends React.Component {

  constructor(props) {
    super(props);

    const response = fetch(`http://10.77.60.243:8080/COM3014_CW_Group10/api/recipe/`);
    
    this.state = {
      recipe: '',
      ingredient: null,
    };
  }

  mySubmitHandler = (event) => {
    event.preventDefault();
    let ingredient = this.state.ingredient;
    
  }
  myChangeHandler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({[nam]: val});
  }
  render() {
    return (
      <form onSubmit={this.mySubmitHandler}>
      
      <p>Recipe</p>
      <input
        type='text'
        name='username'
        onChange={this.myChangeHandler}
      />
      <p>Ingredients</p>
      <input
        type='text'
        name='age'
        onChange={this.myChangeHandler}
        
      />
      <br/>
      <br/>
      <input type='submit' />
      </form>
    );
  }
}
export default AddRecipe;
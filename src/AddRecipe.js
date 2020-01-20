import React, { Component } from "react";
//import './addrecipe.scss';
import axios from "axios";


class AddRecipe extends React.Component {

  constructor(props) {
    super(props);
    
    this.state = {
      recipeId: "",
      recipeName: "",
      ingredients: [],
      ingredientsList: [],
      currentIngredientAmount: "",
      currentIngredientUnit: "",
      recipeMethod: "",
      currentIngredientId: "", 
      loggedIn: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addItemToRecipe = this.addItemToRecipe.bind(this);
    this.saveRecipeItem = this.saveRecipeItem.bind(this);
    this.doUserCheck = this.doUserCheck.bind(this);
  }

  componentDidMount() {
    this.doUserCheck();

    axios.get('http://localhost:8080/COM3014_CW_Group10/api/ingredient', {withCredentials: true}).then(
      res => {
        this.setState({ingredientsList : res.data})
    });
  }

  doUserCheck() {
    axios.get('http://localhost:8080/COM3014_CW_Group10/api/user', {withCredentials: true}).then(
      res => {
        if (res.data.nature !== "MESSAGE_FAILURE") {
          this.setState({ loggedIn : true });
        }
        else
        {
          this.setState({ loggedIn : false })
        }
    });
  }

  handleSubmit(event) {
    axios.post('http://localhost:8080/COM3014_CW_Group10/api/recipe/new', { name: this.state.recipeName, method: this.state.recipeMethod })
      .then(res => {
          if (res.data.nature === "MESSAGE_SUCCESS") {
            this.setState({ recipeId : res.data.messages.recipeId });
            this.state.ingredients.forEach( recipeItem => this.saveRecipeItem(recipeItem));
          }
          else
          {
            alert("There was a problem");
          }
      });
    event.preventDefault();
  }
  
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  addItemToRecipe(event) {
    var ingredientsListPrevious = this.state.ingredients;
    ingredientsListPrevious[this.state.currentIngredientId] = { id: this.state.currentIngredientId, amount: this.state.currentIngredientAmount, unit: this.state.currentIngredientUnit };
    this.setState({ingredients : ingredientsListPrevious});
    event.preventDefault();
  }

  saveRecipeItem(recipeItem) {
    axios.post('http://localhost:8080/COM3014_CW_Group10/api/recipe/' + this.state.recipeId + '/new/' + recipeItem.id, { recipeId: this.state.recipeId, ingredientId: recipeItem.id, quantifier: recipeItem.unit, amount: recipeItem.amount })
      .then(res => {
          if (res.data.nature === "MESSAGE_SUCCESS") {
          }
          else
          {
            alert("There was a problem");
          }
      });
  }

  render() {
    return (
      <div>
        { this.state.loggedIn ? 
        <div>
          <form onSubmit={this.handleSubmit}>
          
          <p>Recipe Name</p>
          <input
            name="recipeName"
            type="text"
            value={this.state.recipeName}
            onChange={this.handleChange}
          />
          <p>Ingredients</p>
          <input
            type='text'
            name="currentIngredientAmount"
            placeholder="Amount (i.e. 1)"
            onChange={this.handleChange}
          />
          <select
            name="currentIngredientUnit"
            onChange={this.handleChange}>
            <option>Choose a unit (kg, ml, etc)</option>
            <option value="item">Item (generic)</option>
            <option value="g">Grams (g)</option>
            <option value="kg">Kilogram (kg)</option>
            <option value="oz">Ounce (oz)</option>
            <option value="l">Litres (l)</option>
            <option value="ml">Milliliters (ml)</option>
          </select>
          <select name="currentIngredientId" onChange={this.handleChange}>
            <option>Choose an ingredient</option>
            {
            this.state.ingredientsList.map( ingredient => (
              <option value={ingredient.id} key={ingredient.id}>{ingredient.name}</option>
            ))}
          </select>
          <button onClick={this.addItemToRecipe}>Add to Recipe</button>
          <ol>
            {this.state.ingredients.map( ingredient => (
              <li key={ingredient.id}>{ingredient.amount} {ingredient.unit} of {this.state.ingredientsList[ingredient.id].name} </li>
            ))}
          </ol>
          <br/>
          <p>Method</p>
          <textarea name="recipeMethod" onChange={this.handleChange}></textarea>
          <br/>
          <input type='submit' />
          </form>
        </div>
        :
        <h1>Sorry, you need to be logged in to do this.</h1>
            }
      </div>
    );
  }
}
export default AddRecipe;
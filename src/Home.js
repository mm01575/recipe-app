import React, { useEffect, useState } from "react";
import Recipe from "./Recipe";
import "./App.css";

const Home = () => {
    const APP_ID = "c0e150d7"
    const APP_KEY = "04c0ee5d67057c6ccd23da48749b0d8c"
  
    const [recipes, setRecipes] = useState([]);
    const [search, setSearch] = useState('');
    const [query, setQuery] = useState('');
  
    useEffect(() => {
      getRecipes();
    }, [query]);
  
    const getRecipes = async () => {
      const response = await fetch(`http://10.77.60.243:8080/COM3014_CW_Group10/api/recipe/`);
      const data = await response.json();
      setRecipes(data.hits);
      console.log(data.hits);
    }
  
    const updateSearch = e => {
      setSearch(e.target.value);
    }
  
    const getSearch = e => {
      e.preventDefault();
      setQuery(search);
      setSearch('');
    }
 
     return (
        <div className="App">
          <form onSubmit={getSearch} className="search-form">
            <input className="search-bar" type="text" value={search} onChange={updateSearch} />
            <button className="search-button" type="submit">
              Search
            </button>
          </form>
          <div className="recipes">
          {recipes.map(recipe =>(
            <Recipe
            key={recipe.recipe.label}
            title={recipe.recipe.label}
            calories={recipe.recipe.calories}
            image={recipe.recipe.image}
            ingredients={recipe.recipe.ingredients}
            />
          ))}
          </div>
        </div>
      )
    
    }
 
export default Home;


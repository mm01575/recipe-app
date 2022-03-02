import React, { useEffect, useState } from "react";
import Recipe from "./Recipe";
import "./App.css";

import axios from "axios";
const Home = () => {
  
    const [recipes, setRecipes] = useState([]);
    const [search, setSearch] = useState('');
    const [query, setQuery] = useState('');
    const [loggedIn, setLoggedIn] = useState('');
  
    useEffect(() => {
      getRecipes();
      getLoggedIn();
    }, [query]);
  
    const getRecipes = e => {
      var data = [];
        axios.get('http://localhost:8080/COM3014_CW_Group10/api/recipe', {withCredentials: true}).then(
        res => {
          setRecipes(res.data);
      }); 
    }
    
    const getLoggedIn = e => {
      axios.get('http://localhost:8080/COM3014_CW_Group10/api/user', {withCredentials: true}).then(
        res => {
          if (res.data.nature !== "MESSAGE_FAILURE") {
            setLoggedIn(true);
          }
          else
          {
            setLoggedIn(false)
          }
      });
    }
 
     return (
        <div className="App">
         {/*  <form onSubmit={getSearch} className="search-form">
            <input className="search-bar" type="text" value={search} onChange={updateSearch} />
            <button className="search-button" type="submit">
              Search
            </button>
          </form> */}
          {
            loggedIn ? 
            <div className="recipes">
            {recipes.map(recipe =>(
              <Recipe
                key={recipe.id}
                id={recipe.id}
                title={recipe.name}
                method={recipe.method}
              />
            ))}
            </div> 
            : 
            <h1>Sorry, you need to be logged in to view all recipes.</h1>
          }
          
        </div>
      )
    
    }
 
export default Home;


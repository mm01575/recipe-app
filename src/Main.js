import React, { Component } from "react";
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Featured from "./Featured";
 
class Main extends Component {
    render() {
      return (
        <HashRouter>
          <div>
            
            <ul className="header">
              <li><NavLink exact to="/">Home</NavLink></li>
              <li><NavLink to="/featured">Featured Recipes</NavLink></li>
              <li><NavLink to="/login">Login</NavLink></li>
            </ul>
            <div className="content">
                <Route exact path="/" component={Home}/>
                <Route path="/featured" component={Featured}/>
                <Route path="/login" component={Login}/>
                </div>
          </div>
        </HashRouter>
      );
    }
  }

export default Main;
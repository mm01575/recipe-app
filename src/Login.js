import React, { Component } from 'react';
//import { HashRouter as Router, Route, Link, NavLink } from 'react-router-dom';
//import SignUpForm from './SignUpForm';
//import SignInForm from './SignInForm';

import './login.css';
import axios from "axios";

class Login extends Component {

  constructor() {
    super();    
    
    this.state = {form: 'login'};   
    
    this.toggle = {
      login: 'register',
      register: 'login'
    };
  }
  
  onSubmit(e) {
    try {
      const response = axios.post("http://10.77.60.243:8080/COM3014_CW_Group10/api/user/login", {
        username: this.state.username,
        password: this.state.password
      });
    }
    catch (exception) {
      console.log(exception);
    }
    
    e.preventDefault();
  }

  render() {    
    return (
      <div className="login">
        <div style={{transform: `translate(${this.state.form === 'login' ? 0 : 250}px, 0px)`}} className="form-div">
          <form onSubmit={this.onSubmit.bind(this)}>
            <input placeholder="Username" type="text" />
            <input placeholder="Password" type="password" />
            {this.state.form === 'login' ? '': 
            <input placeholder="Re-typed password" type="password" />}
            <button className="button-primary">Submit</button>
          </form>
        </div>
        <div style={{transform: `translate(${this.state.form === 'login' ? 0 : -250}px, 0px)`}} className="button-div">
          <p>{this.state.form === 'login' ? 'Do not have an account?' : 'Already a member?'}</p>
          <button onClick={() => {this.setState({form: this.toggle[this.state.form]})}}>{this.toggle[this.state.form]}</button>
        </div>
      </div>
    );
  }
}

export default Login;
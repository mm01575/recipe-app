import React, { Component } from 'react';
//import { HashRouter as Router, Route, Link, NavLink } from 'react-router-dom';
//import SignUpForm from './SignUpForm';
//import SignInForm from './SignInForm';

import './login.css';
import axios from "axios";

const qs = require('querystring')

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {username: '', password: '', displayName: '', passwordRepeat: '', form: 'login', loggedIn: false}
    this.toggle = {
      login: 'register',
      register: 'login'
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.doUserCheck = this.doUserCheck.bind(this);
  }

  componentDidMount() {
    this.doUserCheck();
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    if(this.state.form === "login") {
      axios.post('http://localhost:8080/COM3014_CW_Group10/api/user/login', qs.stringify({ username: this.state.username, password: this.state.password }))
      .then(res => {
          if (res.data.nature === "MESSAGE_SUCCESS") {
            this.doUserCheck();
          }
          else
          {
            var messages = "";
            Object.keys(res.data.messages).map((e, i) => {
              messages = i + ": " + e +". ";
            });
            alert("Sorry - there was a problem! " + messages);
          }
      });
    }
    else if (this.state.form === "register")
    {
      axios.post('http://localhost:8080/COM3014_CW_Group10/api/user/register', qs.stringify({ username: this.state.username, displayName: this.state.displayName, password: this.state.password, passwordRepeat: this.state.passwordRepeat}))
      .then(res => {
          if (res.data.nature == "MESSAGE_SUCCESS") {
            this.doUserCheck();
          }
          else
          {
            var messages = "";
            Object.keys(res.data.messages).map((e, i) => {
              messages = i + ": " + e +". ";
            });
            alert("Sorry - there was a problem! " + messages);
          }
      });
    }
    
    event.preventDefault();
  }

  handleLogout(event) {
    axios.get('http://localhost:8080/COM3014_CW_Group10/api/user/logout', {withCredentials: true}).then(
      res => {
        if (res.data.nature === "MESSAGE_SUCCESS") {
          this.doUserCheck();
        }
        else
        {
          var messages = "";
          Object.keys(res.data.messages).map((e, i) => {
            messages = i + ": " + e +". ";
          });
          alert("There was an error! The error was: " + messages)
        }
    });

    event.preventDefault();
  }

  doUserCheck() {
    axios.get('http://localhost:8080/COM3014_CW_Group10/api/user', {withCredentials: true}).then(
      res => {
        if (res.data.nature !== "MESSAGE_FAILURE") {
          this.setState({ loggedIn : true, username : res.data.username, displayName : res.data.displayName, password : ''});
        }
        else
        {
          this.setState({ loggedIn : false })
        }
    });
  }

  render() {   
    return (
      <div>
        {
          this.state.loggedIn ? 
          // To display if the user is logged in
          <div>
          <h1>Greetings {this.state.displayName}</h1>
            <form onSubmit={this.handleLogout}>
              <p>Your username is {this.state.username}.</p>
              <input type="submit" value="Log out" />
            </form>
          </div>
          : // To display if user is not logged in (login and registration components
          <div className="login">
          <div style={{transform: `translate(${this.state.form === 'login' ? 0 : 250}px, 0px)`}} className="form-div">
            <form onSubmit={this.handleSubmit}>
              {this.state.form === 'login' ? '': 
              <input placeholder="Display Name" name="displayName" value={this.state.displayName} onChange={this.handleChange}  type="text" />}
              <input placeholder="Username" name="username" value={this.state.username} onChange={this.handleChange} type="text" />
              <input placeholder="Password" name="password" value={this.state.password} onChange={this.handleChange} type="password" />
              {this.state.form === 'login' ? '': 
              <input placeholder="Re-typed password" name="passwordRepeat" value={this.state.passwordRepeat} onChange={this.handleChange} type="password" />}
              <button className="button-primary">Submit</button>
            </form>
          </div>
          <div style={{transform: `translate(${this.state.form === 'login' ? 0 : -250}px, 0px)`}} className="button-div">
            <p>{this.state.form === 'login' ? "Don't have an account? Register today." : 'Already a member? Sign in here.'}</p>
            <button onClick={() => {this.setState({form: this.toggle[this.state.form]})}}>{this.toggle[this.state.form]}</button>
          </div>
        </div>
        }
      </div>
    );
  }
}

export default Login;
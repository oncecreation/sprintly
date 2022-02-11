import React, { Component } from 'react';
import { signup } from './auth-service';
import { Link } from 'react-router-dom';


class Signup extends Component {

  state = { username: '', email: '', password: '' }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const username = this.state.username;
    const email = this.state.email;
    const password = this.state.password;
  
    signup(username, password, email)
      .then(response => {
        this.setState({username: "", email: "", password: ""});
        this.props.updateUser(response)
      })
      .catch(err => console.log('error', err))
  }
  
  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleFormSubmit}>
          <label>Name:</label>
          <input type="text" name="username" value={this.state.username} onChange={e => this.handleChange(e)} />
          
          <label>Email:</label>
          <input name="email" value={this.state.email} onChange={e => this.handleChange(e)} />

          <label>Password:</label>
          <input type="password" name="password" value={this.state.password} onChange={e => this.handleChange(e)} />
          
          <button>Sign up</button>
        </form>
 
        <p>Already a user? 
          <Link to={"/login"}>Login</Link>
        </p>
 
      </div>
    )
  }
}

export default Signup;

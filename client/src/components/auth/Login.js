import React, { Component } from 'react';
import { login } from './auth-service';
import { Link } from 'react-router-dom';

class Login extends Component {
  state = { email: '', password: '', errorMessage: ''}

  handleFormSubmit = (event) => {
    event.preventDefault();
    const email = this.state.email;
    const password = this.state.password;

    login(email, password)
      .then(response => {
        this.setState({ email: "", password: "", errorMessage: ""});
        this.props.updateUser(response);
        this.props.history.push('/dashboard');
      })
      .catch(err =>  this.setState({errorMessage: err.response.data.errorMessage}) )
  }
    
  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
  }
    
  render(){
    return(
      <div>
        <form onSubmit={this.handleFormSubmit}>
          <label>Email:</label>
          <input type="text" name="email" value={this.state.email} onChange={e => this.handleChange(e)}/>
          
          <label>Password:</label>
          <input type="password" name="password" value={this.state.password} onChange={ e => this.handleChange(e)}/>
          
          <button>Log in</button>
        </form>

        {this.state.errorMessage && (
          <p className="error">{this.state.errorMessage}</p>
        )}

        <aside>
          <Link to={"/"}>Forgot password?</Link>
        </aside>
        <p>Need an account? 
          <Link to={"/signup"}>Sign up</Link>
        </p>
      </div>
    )
  }
}

export default Login;
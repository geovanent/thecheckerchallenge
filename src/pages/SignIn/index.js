import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

import Logo from "../../assets/logo.png";
import api from "../../services/api";
import { login } from "../../services/auth";

import { Form, Container } from "./styles";

class SignIn extends Component {
  state = {
    email: "",
    password: "",
    error: "",
    isLoading: false
  };

  handleSignIn = async e => {
    e.preventDefault();
    const { email, password } = this.state;
    if (!email || !password) {
      this.setState({ error: "Fill all fields" });
    } else {
      this.setState({ error: "", isLoading: true });
      try {
        const response = await api.post("/api/login", { email, password });
        login(response.data.token);
        this.props.history.push("/home");
      } catch (err) {
        this.setState({
          error:
            "An error occurred on login attemp.\n"
        });
      }
      this.setState({ isLoading: false });
    }
  };

  render() {
    return (
      <Container>
        <Form onSubmit={this.handleSignIn}>
          <img src={Logo} alt="Logo" />
          {this.state.error && <p>{this.state.error}</p>}
          <input
            type="email"
            placeholder="Email"
            onChange={e => this.setState({ email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={e => this.setState({ password: e.target.value })}
          />
          <button 
            type="submit"
            disabled={this.state.isLoading}>
            {this.state.isLoading ? "Loading" : "Login"}
          </button>
          <hr />
          <Link to="/signup">Sign Up</Link>
        </Form>
      </Container>
    );
  }
}

export default withRouter(SignIn);
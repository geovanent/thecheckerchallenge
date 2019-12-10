import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

import Logo from "../../assets/logo.png";

import { Form, Container } from "./styles";
import api from "../../services/api";

class SignUp extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    mailchimpapi: "",
    thecheckerapi: "",
    error: ""
  };

handleSignUp = async e => {
    e.preventDefault();
    const { name, email, password, mailchimpapi, thecheckerapi } = this.state;
    if (!name || !email || !password || !mailchimpapi || !thecheckerapi ) {
        this.setState({ error: "Fill all fields!" });
    } else {
        try {
          await api.post("/api/signup", { name, email, password, mailchimpapi, thecheckerapi });
          this.props.history.push("/");
        } catch (err) {
        this.setState({ error: "An error occurred at create your account." });
        }
    }
};

  render() {
    return (
      <Container>
        <Form onSubmit={this.handleSignUp}>
          <img src={Logo} alt="Logo" />
          {this.state.error && <p>{this.state.error}</p>}
          <input
            type="text"
            required
            placeholder="Name"
            onChange={e => this.setState({ name: e.target.value })}
          />
          <input
            type="email"
            required
            placeholder="Email"
            onChange={e => this.setState({ email: e.target.value })}
          />
          <input
            type="password"
            required
            placeholder="Password"
            onChange={e => this.setState({ password: e.target.value })}
          />
          <input
            type="text"
            required
            placeholder="Mailchimp API Key"
            onChange={e => this.setState({ mailchimpapi: e.target.value })}
          />
          <input
            type="text"
            required
            placeholder="TheChecker API Key"
            onChange={e => this.setState({ thecheckerapi: e.target.value })}
          />
          <button type="submit">New User</button>
          <hr />
          <Link to="/">Sign In</Link>
        </Form>
      </Container>
    );
  }
}

export default withRouter(SignUp);
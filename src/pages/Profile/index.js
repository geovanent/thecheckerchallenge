import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

import Logo from "../../assets/logo.png";

import { Form, Container } from "./styles";
import api from "../../services/api";

class Profile extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    mailchimpapi: "",
    thecheckerapi: "",
    error: ""
  };

handleUpdate = async e => {
    e.preventDefault();
    const { name, email, password, mailchimpapi, thecheckerapi } = this.state;
    if (!name || !email || !mailchimpapi || !thecheckerapi ) {
        this.setState({ error: "Fill all fields!" });
    } else {
        try {
          await api.post("/api/update", { name, email, password, mailchimpapi, thecheckerapi });
          this.props.history.push("/home");
        } catch (err) {
        this.setState({ error: "An error occurred at create your account." });
        }
    }
};

componentDidMount() {
    this.setState({ isLoading: true });
    api.get("/users/me")
    .then(response => {
        const { name, email, mailchimpapi, thecheckerapi } = response.data;
        this.setState({
            name, email, mailchimpapi, thecheckerapi
        })
  })
  .catch(error => {
    this.setState({
      error: "Error on reading lists. Verify your API's keys.",
      isLoading: false
    })
  });
}

  render() {
    return (
      <Container>
        <Form onSubmit={this.handleUpdate}>
          <img src={Logo} alt="Logo" />
          {this.state.error && <p>{this.state.error}</p>}
          <input
            type="text"
            required
            placeholder="Name"
            value={this.state.name}
            onChange={e => this.setState({ name: e.target.value })}
          />
          <input
            type="email"
            required
            placeholder="Email"
            value={this.state.email}
            onChange={e => this.setState({ email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={e => this.setState({ password: e.target.value })}
          />
          <input
            type="text"
            required
            placeholder="Mailchimp API Key"
            value={this.state.mailchimpapi}
            onChange={e => this.setState({ mailchimpapi: e.target.value })}
          />
          <input
            type="text"
            required
            placeholder="TheChecker API Key"
            value={this.state.thecheckerapi}
            onChange={e => this.setState({ thecheckerapi: e.target.value })}
          />
          <button type="submit">Update</button>
          <hr/>
          <button type="submit" onClick={() => this.props.history.push("/home")}>Back</button>
        </Form>
      </Container>
    );
  }
}

export default withRouter(Profile);
import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import api from "../../services/api";
import { login } from "../../services/auth";
import CollapseItem from "../../components/CollapseItem"
import { Container } from "./styles";
import "./styles.css"

class Home extends Component {

  constructor() {
    super();
    this.state = {
        listData: {},
        error: "",
        isLoading: true,
    };
    this.toggleOpen = this.toggleOpen.bind(this);
  }

  componentDidMount() {
      this.setState({ isLoading: true });
      api.get("/api/lists")
      .then(response => {
        // console.log(JSON.stringify(response, null, 2));
        this.setState({
            listData: response.data.lists,
            isLoading: false
          })
    })
    .catch(error => {
      this.setState({
        error: "Error on reading lists. Verify your API's keys.",
        isLoading: false
      })
    });
  }
 
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

  toggleOpen() {
    this.setState({ open: !this.state.open });
  }

  createList = (listData) => {
    let list = []

    for (let i = 0; i < listData.length; i++) {
      list.push(
        <CollapseItem key={i+"dad"} data={listData[i]}/>
      )
    }
    return list
  }

  render() {
    const { listData } = this.state;
    return (
      <Container>
         <div class="topnav">
          <a class="active" href="/home">Home</a>
          <a href="/profile">Profile</a>
          <a href="/logout" style={{float:"right"}}>Logout</a>
        </div> 
        {this.state.error && <p>{this.state.error}</p>}
        {this.state.isLoading
            ? <p>Wait a minute, is loading...</p>
            : this.state.listData
              ? this.createList(listData)
              : <p>Empty List</p>}
      </Container>
    );
  }
}

export default withRouter(Home);
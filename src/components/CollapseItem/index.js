import React, { Component } from "react";
import api from "../../services/api";

import { Heading, Content } from "./styles";
import './styles.css';

class CollapseItem extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      isLoading: true,
      mailList: undefined,
    };
    this.toggleOpen = this.toggleOpen.bind(this);
    this.getMailList = this.getMailList.bind(this);
    this.verifyEmail = this.verifyEmail.bind(this);
    this.verifyAll = this.verifyAll.bind(this);
  }
  
  toggleOpen() {
    this.setState({ open: !this.state.open });
    const { open, mailList } = this.state;
    if( !open && mailList === undefined ) {
      this.getMailList();
    }
  }

  handleClick = (e, i) => {
    e.preventDefault();
    this.verifyEmail(i);
  };

  verifyEmail(i) {
    const { mailList } = this.state;
    if(mailList[i].isLoading) return;

    mailList[i].isLoading = true;
    mailList[i].verifyStatus = "Checking";
    this.setState({
      mailList
    })
    api.post("/api/lists/verify", { email: mailList[i].email_address })
    .then(response => {
      // console.log(JSON.stringify(response, null, 2));
        const { mailList } = this.state;
        mailList[i].verifyStatus = response.data.result;
        mailList[i].isLoading = false;
        this.setState({
            mailList
          })
      })
      .catch(error => {
        mailList[i].isLoading = false;
        this.setState({
          mailList,
          error: "Error on reading lists. Verify your API's keys.",
        })
      });
  }

  verifyAll = () => {
    for(let i = 0; i < this.state.mailList.length; i++) {
      this.verifyEmail(i);
    }
  }

  getMailList() {
    this.setState({ isLoading: true });
    const { id } = this.props.data
    api.post("/api/lists/mail", { id })
    .then(response => {
      // console.log(JSON.stringify(response, null, 2));
      this.setState({
          mailList: response.data.members,
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

createList = (mailList) => {
  let list = []
    for (let i = 0; i < mailList.length; i++) {
      list.push(
      <tr key={"tr"+i}>
        <td key={"email"+i}>{mailList[i].email_address}</td>
        <td key={"check"+i} style={{textAlign:"center"}}>{this.state.mailList[i].verifyStatus || "not verified"}</td>
        <td key={"button"+i} style={{textAlign:"center"}}>
          <a 
            href="#"
            className="verifyButton"
            onClick={(event) => this.handleClick(event, i)}>
            {this.state.mailList[i].isLoading ? "Working" : "Verify"}
          </a>
        </td>
      </tr>
      )
    }
  return list
}

  render() {
    const { mailList } = this.state;
    return (
      <div>
        <Heading onClick={this.toggleOpen}>{this.props.data.name} ({this.props.data.stats.member_count})</Heading>
        <Content open={this.state.open}>
          {this.state.isLoading
            ? <p>Wait a minute, is loading...</p>
            : this.state.mailList
              ? <div>
                  <table className="comicGreen">
                    <tbody>
                      {this.createList(mailList)}
                    </tbody>
                  </table>
                  <div style={{float: "right", marginTop:"10px"}}>
                    <a 
                      href="#"
                      onClick={() => this.verifyAll()}
                      className="verifyButton verifyAll">
                      Verify All
                    </a>
                  </div>
                </div>
              : <p>Empty List</p>}
        </Content>
      </div>
    );
  }
}

export default CollapseItem;
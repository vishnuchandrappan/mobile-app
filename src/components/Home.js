import React, { Component } from "react";
import { reactLocalStorage } from "reactjs-localstorage";

class Home extends Component {
  state = {
    lastPage: "/",
    currentPage: "/",
    speaking: false,
  };
  componentDidMount() {
    if (reactLocalStorage.get("lastPage")) {
      this.setState({
        lastPage: reactLocalStorage.get("lastPage"),
      });
    }
  }

  changePage = () => {
    reactLocalStorage.set("lastPage", 2);
    this.setState({
      lastPage: 2,
    });
  };
  render() {
    return (
      <div className="container">
        {this.state.currentPage !== this.state.lastPage}
        <h1>Hello User</h1>
        <div className="full-page">
          {this.state.speaking ? (
            <button
              className="btn btn-warning"
              onClick={() => {
                this.setState({
                  speaking: false,
                  lastPage: "2",
                });
              }}
            >
              Listening
            </button>
          ) : (
            <button
              className="btn btn-primary"
              onClick={() => {
                this.setState({
                  speaking: true,
                });
              }}
            >
              Tap to Speak <i className="fa fa-microphone"></i>{" "}
            </button>
          )}
          {this.state.speaking ? (
            <div className="lds-ellipsis">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          ) : (
            ""
          )}
          {!this.state.speaking && this.state.lastPage === "2" ? (
            <div className="btn-container">
              <button
                className="btn btn-danger"
                onClick={() => {
                  window.location.href = this.state.lastPage;
                }}
              >
                Next
              </button>
              <button
                onClick={() => {
                  this.setState({
                    speaking: true,
                  });
                }}
                className="btn btn-success"
              >
                Try Again
              </button>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}

export default Home;

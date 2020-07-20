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
        <h1>What all symptoms do you have ?</h1>
        <div className="full-page">
          {this.state.speaking ? (
            <button
              className="btn btn-warning"
              onClick={() => {
                this.setState({
                  speaking: false,
                  lastPage: "3",
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
          {!this.state.speaking && this.state.lastPage === "3" ? (
            <>
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
              <div className="list-group">
                <span className="list-group-item">Symotom 1</span>
                <span className="list-group-item">Symotom 2</span>
                <span className="list-group-item">Symotom 3</span>
              </div>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}

export default Home;

import React, { Component } from "react";
import { Link } from "react-router-dom";
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
        <h1>Your Responses have been recorded</h1>
        <div className="full-page">
          {this.state.speaking ? (
            <button
              className="btn btn-warning"
              onClick={() => {
                this.setState({
                  speaking: false,
                  lastPage: "/",
                });
              }}
            >
              Listening
            </button>
          ) : (
            <button className="btn btn-primary">
              <Link to="/">HOME</Link>
            </button>
          )}
        </div>
      </div>
    );
  }
}

export default Home;

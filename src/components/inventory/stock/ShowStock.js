import React, { Component } from "react";
import { connect } from "react-redux";
import api from "../../../Resources/api";

class ShowStock extends Component {
  state = {
    data: [],
  };
  componentDidMount() {
    api.defaults.headers.common["Authorization"] = "Bearer " + this.props.token;
    api
      .get("items/" + this.props.match.params.id)
      .then(({ data }) => {
        this.setState({
          data: data.data,
        });
      })
      .catch((err) => {
        console.log("error in fetching items");
      });
  }
  render() {
    return (
      <div className="container">
        <h1>Stocks</h1>
        <div className="list-group">
          {this.state.data.map((item) => (
            <div key={item.id} className="list-group-item items">
              <div className="item-details">
                <span>{item.stock}</span>
                <span>Added On : {item.created_at}</span>
              </div>
              <div className="item-options">
                <span className="btn btn-danger">Edit</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    token: state.login.token,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onLogin: (token) => dispatch({ type: "USER_LOGIN", data: token }),
    fetchUser: (user) => dispatch({ type: "FETCH_USER_DATA", data: user }),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowStock);

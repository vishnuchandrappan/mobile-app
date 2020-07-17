import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import api from "../../../Resources/api";
import NewItem from "../NewItem";

class Show extends Component {
  state = {
    data: [],
    labels: [],
  };

  componentDidMount() {
    api.defaults.headers.common["Authorization"] = "Bearer " + this.props.token;
    api
      .get("labels/" + this.props.match.params.id)
      .then(({ data }) => {
        this.setState({
          data: data.data,
        });
      })
      .catch((err) => {
        console.log("error in fetching items");
      });

    api
      .get("labels")
      .then(({ data }) => {
        this.setState({
          labels: data.data,
        });
      })
      .catch((err) => {
        console.log("error in fetching labels");
      });
  }
  render() {
    return (
      <div className="container">
        <h1>Items</h1>
        <div className="list-group">
          {this.state.data.map((item) => (
            <div
              key={item.id}
              className={
                item.stock === 0
                  ? "list-group-item items bg-danger text-light"
                  : item.stock < 100
                  ? "list-group-item items bg-warning text-dark"
                  : "list-group-item items"
              }
            >
              <div className="item-details">
                <span>{item.name}</span>
                <span> Rs.{item.unit_price}</span>
                <span> Remaining :{item.stock}</span>
              </div>
              <div className="item-options">
                <Link to="/" className="btn btn-success">
                  View
                </Link>
                <Link to="/" className="btn btn-info">
                  Update Stock
                </Link>
              </div>
            </div>
          ))}
        </div>
        <NewItem labels={this.state.labels}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(Show);

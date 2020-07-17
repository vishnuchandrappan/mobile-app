import React, { Component } from "react";
import { connect } from "react-redux";
import api from "../../Resources/api";
import BCard from "../BCard";

class Home extends Component {
  state = {
    data: [],
  };
  componentDidMount() {
    api.defaults.headers.common["Authorization"] = "Bearer " + this.props.token;
    api
      .get("labels")
      .then(({ data }) => {
        this.setState({
          data: data.data,
        });
      })
      .catch((err) => {
        console.log("error in fetching labels");
      });
  }
  render() {
    return (
      <div className="container">
        <h1>Categories</h1>
        <div className="form-1 grid grid-col-3">
          {this.state.data.map((item) => (
            <BCard key={item.id} title={item.name} link={"categories/" + item.id} />
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);

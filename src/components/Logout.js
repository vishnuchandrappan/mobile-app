import React, { Component } from "react";
import { connect } from "react-redux";

class Logout extends Component {
  componentDidMount() {
    this.props.onLogout();
    this.props.clearUser();
  }
  render() {
    return <div></div>;
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onLogout: () => dispatch({ type: "USER_LOGOUT" }),
    clearUser: () => dispatch({ type: "CLEAR_USER" }),
  };
}

export default connect({}, mapDispatchToProps)(Logout);

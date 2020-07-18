import React from "react";
import { connect } from "react-redux";
import SuperMarket from "../SuperMarket";
import ChangePassword from "./ChangePassword";
import ChangeStatus from "./ChangeStatus";
import EditProfile from "./EditProfile";

function Profile({ user }) {
  return (
    <div className="container">
      <div className="jumbotron">
        <h1>{user.name}</h1>
        <hr />
        <div className="user-details">
          <div>Phone : {user.phone_number}</div>
          <div>Email : {user.email}</div>
        </div>
        <div className="super-market">
          <SuperMarket />
          <ChangeStatus/>
        </div>
      </div>
      <div className="row">
        <div className="col-8">
          <EditProfile />
        </div>
        <div className="col-4">
          <ChangePassword />
        </div>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    user: state.profile,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onLogin: (token) => dispatch({ type: "USER_LOGIN", data: token }),
    fetchUser: (user) => dispatch({ type: "FETCH_USER_DATA", data: user }),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

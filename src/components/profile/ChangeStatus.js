import { Switch } from "@material-ui/core";
import React, { Component } from "react";
import { connect } from "react-redux";
import api from "../../Resources/api";

class ChangeStatus extends Component {
  state = {
    checked: true,
  };

  componentDidMount(){
    api.defaults.headers.common["Authorization"] = "Bearer " + this.props.token;
    api.get('/superMarket')
    .then(({data}) => {
        this.setState({
            checked:data.data.is_opened
        })
    })
  }

  handleChange = (event) => {
    api.defaults.headers.common["Authorization"] = "Bearer " + this.props.token;
    api
      .post("/superMarket/changeState")
      .then(() => {
        this.setState({
          checked: !this.state.checked,
        });
      })
      .catch((err) => {
        alert("Something went wrong...");
      });
  };
  render() {
    return (
      <div>
        <h3>Change Active Status</h3>
        <Switch
          checked={this.state.checked}
          onChange={this.handleChange}
          name="checked"
          inputProps={{ "aria-label": "secondary checkbox" }}
        />
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

export default connect(mapStateToProps, mapDispatchToProps)(ChangeStatus);

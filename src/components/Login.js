import { TextField } from "@material-ui/core";
import { Formik } from "formik";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import api from "../Resources/api";
import { required } from "../Resources/errors";
import "./style.scss";
class Login extends Component {
  render() {
    if (this.props.isLoggedIn) {
      return <Redirect to="/" />;
    }
    return (
      <div className="container">
        <h1>Login</h1> <hr />
        <Formik
          initialValues={{
            email: "user1@test.com",
            password: "password",
          }}
          validate={(values) => {
            const errors = {};

            if (!values.email) {
              errors.email = required("email");
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = "Invalid  Email";
            }

            if (!values.password) {
              errors.password = required("password");
            } else if (values.password.length < 8) {
              errors.email = "Minimum 8 characters required";
            }

            return errors;
          }}
          onSubmit={(values, { setStatus, setSubmitting }) => {
            setSubmitting(true);
            setStatus(true);

            api
              .post("/login", values)
              .then(({ data }) => {
                setSubmitting(false);
                this.props.onLogin(data.data.token);
                this.props.fetchUser(data.data.user);
                toast.success("Login Successful");
              })
              .catch((err) => {
                setSubmitting(false);
                toast.error("Invalid Credentials");
              });

          }}
        >
          {({
            values,
            status,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <form onSubmit={handleSubmit} className="form">
              {status && (
                <ToastContainer
                  position="top-right"
                  autoClose={5000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                />
              )}
              <div className="form-group">
                <TextField
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                  helperText={touched.email && errors.email}
                  error={Boolean(touched.email && errors.email)}
                  variant="filled"
                  label="Email"
                  placeholder="john@example.com"
                />
              </div>
              <div className="form-group">
                <TextField
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                  helperText={touched.password && errors.password}
                  error={Boolean(touched.password && errors.password)}
                  variant="filled"
                  label="Password"
                  type="password"
                  placeholder="Your password here"
                />
              </div>
              <button
                disabled={isSubmitting}
                className="btn btn-primary btn-elevate kt-login__btn-primary"
                type="submit"
              >
                Login
              </button>
              <div className="change-op">
                forgot Password ?{" "}
                <Link className="btn btn-warning" to="/forgotPassword">
                  Reset
                </Link>
                <br />
                don't have an account ?{" "}
                <Link className="btn btn-warning" to="/signup">
                  SignUp
                </Link>
              </div>
            </form>
          )}
        </Formik>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isLoggedIn: state.login.isLoggedIn,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onLogin: (token) => dispatch({ type: "USER_LOGIN", data: token }),
    fetchUser: (user) => dispatch({ type: "FETCH_USER_DATA", data: user }),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);

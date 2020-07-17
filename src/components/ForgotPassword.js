import { TextField } from "@material-ui/core";
import { Formik } from "formik";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { required } from "../Resources/errors";
import "./style.scss";
class ForgotPassword extends Component {
  render() {
    if (this.props.isLoggedIn) {
      return <Redirect to="/" />;
    }
    return (
      <div className="container">
        <h1>Reset Password</h1> <hr />
        <Formik
          initialValues={{
            email: "",
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

            return errors;
          }}
          onSubmit={(values, { setStatus, setSubmitting }) => {
            setSubmitting(true);
            setStatus(true);

            console.log(values);

            setSubmitting(false);
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
                  variant="outlined"
                  label="Email"
                  placeholder="john@example.com"
                />
              </div>
              <button
                disabled={isSubmitting}
                className="btn btn-primary btn-elevate kt-login__btn-primary"
                type="submit"
              >
                Request Password Reset
              </button>
              <div className="change-op">
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

export default connect(mapStateToProps)(ForgotPassword);

import { TextField } from "@material-ui/core";
import { Formik } from "formik";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import api from "../Resources/api";
import { required } from "../Resources/errors";
import "./style.scss";
class SignUp extends Component {
  render() {
    if (this.props.isLoggedIn) {
      return <Redirect to="/" />;
    }
    return (
      <div className="container">
        <h1>Create New Account</h1> <hr />
        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
            password_confirmation: "",
            phone_number: "",
          }}
          validate={(values) => {
            const errors = {};

            if (!values.name) {
              errors.name = required("name");
            }

            if (!values.email) {
              errors.email = required("email");
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = "Invalid  Email";
            }

            if (!values.phone_number) {
              errors.phone_number = required("phone number");
            } else if (
              parseInt(values.phone_number) < 9999999999 &&
              parseInt(values.phone_number) > 1111111111
            ) {
            } else {
              errors.phone_number = "Invalid Phone Number";
            }

            if (!values.password) {
              errors.password = required("password");
            } else if (values.password.length < 8) {
              errors.password = "Minimum 8 characters required";
            }

            if (!values.password_confirmation) {
              errors.password_confirmation = required("password confirmation");
            } else if (values.password_confirmation !== values.password) {
              errors.password_confirmation = "Passwords do not match";
            }

            return errors;
          }}
          onSubmit={(values, { setStatus, setSubmitting }) => {
            setSubmitting(true);
            setStatus(true);

            api
              .post("/createAdmin", values)
              .then(({ data }) => {
                setSubmitting(false);
                this.props.onLogin(data.data.token);
                this.props.fetchUser(data.data.user);
                toast.success("OTP has been sent to your phone number");
              })
              .catch((err) => {
                setSubmitting(false);
                console.log(err.response);
                if (err.response.data.errors) {
                  for (const key in err.response.data.errors) {
                    toast.error(err.response.data.errors[key][0]);
                  }
                }
                else{
                  toast.error(err.response.data.message);
                }
              });

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
                  name="name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.name}
                  helperText={touched.name && errors.name}
                  error={Boolean(touched.name && errors.name)}
                  variant="outlined"
                  label="Your Name"
                  placeholder="John Doe"
                />
              </div>
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
              <div className="form-group">
                <TextField
                  type="number"
                  name="phone_number"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.phone_number}
                  helperText={touched.phone_number && errors.phone_number}
                  error={Boolean(touched.phone_number && errors.phone_number)}
                  variant="outlined"
                  label="Contact"
                  placeholder="9999999999"
                />
              </div>
              <div className="form-group">
                <TextField
                  name="password"
                  type="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                  helperText={touched.password && errors.password}
                  error={Boolean(touched.password && errors.password)}
                  variant="outlined"
                  label="Password"
                  placeholder="Your password here"
                />
              </div>
              <div className="form-group">
                <TextField
                  name="password_confirmation"
                  type="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password_confirmation}
                  helperText={
                    touched.password_confirmation &&
                    errors.password_confirmation
                  }
                  error={Boolean(
                    touched.password_confirmation &&
                      errors.password_confirmation
                  )}
                  variant="outlined"
                  label="Password Confirmation"
                  placeholder="Retype your password"
                />
              </div>
              <button
                disabled={isSubmitting}
                className="btn btn-primary btn-elevate kt-login__btn-primary"
                type="submit"
              >
                Create My Account !
              </button>
              <div className="change-op">
                already have an account ?{" "}
                <Link className="btn btn-warning" to="/login">
                  Login
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
    isVerified: state.profile.isVerified,
    isCreated: state.profile.id !== null,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onLogin: (token) => dispatch({ type: "USER_LOGIN", token: token }),
    fetchUser: (user) => dispatch({ type: "FETCH_USER_DATA", data: user }),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);

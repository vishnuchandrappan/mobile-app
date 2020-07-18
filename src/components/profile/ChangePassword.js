import { TextField } from "@material-ui/core";
import { Formik } from "formik";
import React, { Component } from "react";
import { connect } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import api from "../../Resources/api";
import { required } from "../../Resources/errors";
import "../style.scss";
class ChangePassword extends Component {
  render() {
    return (
      <div className="container-fluid">
        <h1>Change Password</h1> <hr />
        <Formik
          initialValues={{
            password: "",
            password_confirmation: "",
            current_password: "",
          }}
          validate={(values) => {
            const errors = {};

            if (!values.password) {
              errors.password = required("password");
            } else if (values.password.length < 8) {
              errors.password = "Minimum 8 characters required";
            }

            if (!values.current_password) {
              errors.current_password = required("password");
            } else if (values.current_password.length < 8) {
              errors.current_password = "Minimum 8 characters required";
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
                } else {
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
            <form onSubmit={handleSubmit} >
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
                  type="password"
                  name="current_password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.current_password}
                  helperText={
                    touched.current_password && errors.current_password
                  }
                  error={Boolean(
                    touched.current_password && errors.current_password
                  )}
                  variant="outlined"
                  label="current_password"
                  placeholder="Current Password"
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
                  label="New Password"
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
                  placeholder="Retype New Password"
                />
              </div>
              <button
                disabled={isSubmitting}
                className="btn btn-primary btn-elevate kt-login__btn-primary"
                type="submit"
              >
                Save Changes
              </button>
            </form>
          )}
        </Formik>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.profile,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onLogin: (token) => dispatch({ type: "USER_LOGIN", token: token }),
    fetchUser: (user) => dispatch({ type: "FETCH_USER_DATA", data: user }),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);

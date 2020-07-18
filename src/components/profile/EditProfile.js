import { TextField } from "@material-ui/core";
import { Formik } from "formik";
import React, { Component } from "react";
import { connect } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import api from "../../Resources/api";
import { required } from "../../Resources/errors";
import "../style.scss";
class EditProfile extends Component {
  state = {
    name: "",
    email: "",
  };
  componentDidMount() {
    setTimeout(() => {
      this.setState({
        name: this.props.user.name,
        email: this.props.user.email,
      });
    }, 1000);
  }
  render() {
    return (
      <div className="container-fluid">
        <h1>Edit Account</h1> <hr />
        <Formik
          initialValues={{
            name: this.state.name,
            email: this.state.email,
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
            <form onSubmit={handleSubmit} style={{width:"100%"}}>
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

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);

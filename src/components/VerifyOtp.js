import { TextField } from "@material-ui/core";
import { Formik } from "formik";
import React, { Component } from "react";
import { connect } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { required } from "../Resources/errors";
class VerifyOtp extends Component {
  state = {
    status: false,
  };

  submitValues = (otp) => {
    // const data = {
    //   otp,
    //   user_id: this.props.user_id,
    // };
    this.props.userVerified();
    toast.success("OTP verified Successfully");
};

resendOTP = () => {
    // http request to reset OTP here
    this.setState({
      status: !this.state.status,
    });
    toast.info("OTP has been sent to your registered contact number");
  };

  render() {
    return (
      <div className="container">
        <h1>Verify OTP</h1> <hr />
        <Formik
          initialValues={{
            otp: "",
          }}
          validate={(values) => {
            const errors = {};

            if (!values.otp) {
              errors.otp = required("otp");
            } else if (values.otp.length !== 6) {
              errors.otp = "OTP is 6 digits long !";
            }

            return errors;
          }}
          onSubmit={({ otp }, { setStatus, setSubmitting }) => {
            setSubmitting(true);
            setStatus(true);

            // do api here
            this.submitValues(otp);

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
              {(status || this.state.status) && (
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
                  name="otp"
                  type="number"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.otp}
                  helperText={touched.otp && errors.otp}
                  error={Boolean(touched.otp && errors.otp)}
                  variant="outlined"
                  label="OTP"
                  placeholder="6 digit OTP"
                />
              </div>
              <button
                disabled={isSubmitting}
                className="btn btn-primary btn-elevate kt-login__btn-primary"
                type="submit"
              >
                Verify OTP
              </button>
              <div className="change-op">
                OTP expired ?{" "}
                <button
                  className="btn btn-warning"
                  onClick={(e) => {
                    e.preventDefault();
                    this.resendOTP();
                  }}
                >
                  Resend OTP
                </button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { user_id: state.profile.id };
}

function mapDispatchToProps(dispatch) {
  return {
    userVerified: () => dispatch({ type: "VERIFY_USER" }),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(VerifyOtp);

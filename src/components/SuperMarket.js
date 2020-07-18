import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from "@material-ui/core";
import { Formik } from "formik";
import React, { Component, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { connect } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import api from "../Resources/api";
import { required } from "../Resources/errors";

class SuperMarket extends Component {
  state = {
    isAvailable: true,
    data: "",
    districts: [],
  };
  componentDidMount() {
    api.defaults.headers.common["Authorization"] = "Bearer " + this.props.token;
    api
      .get("/superMarket")
      .then((data) => {
        this.setState({
          isAvailable: true,
          data: data.data.data,
        });
      })
      .catch((err) => {
        this.setState({
          isAvailable: false,
        });
      });

    api
      .get("/districts")
      .then(({ data }) => {
        this.setState({
          districts: data.data,
        });
      })
      .catch((err) => {
        console.log("no districts found");
        alert("no districts found");
      });
  }
  render() {
    return (
      <React.Fragment>
        {this.state.isAvailable ? (
          <div className="container">
            <h4>Super Market Details</h4>
            <table className="theaters table table-striped">
              <tbody>
                <tr>
                  <th scope="col">Name</th>
                  <td>{this.state.data.name}</td>
                </tr>
                <tr>
                  <th scope="col">Address</th>
                  <td>{this.state.data.address}</td>
                </tr>
                <tr>
                  <th scope="row">Contact</th>
                  <td>{this.state.data.phone_number}</td>
                </tr>
              </tbody>
            </table>
          </div>
        ) : (
          <div className="new">
            <Example data={this.state.districts} />
          </div>
        )}
      </React.Fragment>
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

export default connect(mapStateToProps, mapDispatchToProps)(SuperMarket);

function Example({ data }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div className="btn-container flex-1">
        <span>Your SuperMarket is not registered</span>
        <Button variant="primary" onClick={handleShow}>
          Register Your SuperMarket
        </Button>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Register Super Market</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{
              name: "",
              address: "",
              phone_number: "",
              district_id: 1,
            }}
            validate={(values) => {
              const errors = {};

              if (!values.name) {
                errors.name = required("name");
              }

              if (!values.address) {
                errors.address = required("address");
              }

              if (!values.phone_number) {
                errors.phone_number = required("Phone Number");
              }

              if (values.district_id === "") {
                errors.district_id = "Select a district";
              }

              return errors;
            }}
            onSubmit={(values, { setStatus, setSubmitting }) => {
              setSubmitting(true);
              setStatus(true);

              api
                .post("/superMarket", values)
                .then(({ data }) => {
                  setSubmitting(false);
                  toast.success("Registration Successful");
                  window.location.reload();
                })
                .catch((err) => {
                  setSubmitting(false);
                  toast.error("Something went wrong");
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
              <form onSubmit={handleSubmit}>
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
                <div className="form-group form-modal">
                  <TextField
                    name="name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.name}
                    helperText={touched.name && errors.name}
                    error={Boolean(touched.name && errors.name)}
                    variant="outlined"
                    label="name"
                  />
                </div>
                <div className="form-group form-modal">
                  <TextField
                    name="address"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.address}
                    helperText={touched.address && errors.address}
                    error={Boolean(touched.address && errors.address)}
                    variant="outlined"
                    label="address"
                  />
                </div>
                <div className="form-group form-modal">
                  <TextField
                    name="phone_number"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.phone_number}
                    helperText={touched.phone_number && errors.phone_number}
                    error={Boolean(touched.phone_number && errors.phone_number)}
                    variant="outlined"
                    label="phone_number"
                    type="number"
                  />
                </div>
                <div className="form-group form-modal">
                  <FormControl variant="outlined">
                    <InputLabel id="demo-simple-select-outlined-label">
                      District
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      value={values.district_id}
                      onChange={handleChange}
                      name="district_id"
                      onBlur={handleBlur}
                      error={Boolean(
                        touched.appUrlProtocol && errors.appUrlProtocol
                      )}
                      label="District"
                    >
                      <MenuItem value="">
                        <em>Select</em>
                      </MenuItem>
                      {data.map((item) => (
                        <MenuItem key={item.id} value={item.id}>
                          {item.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
                <button
                  disabled={isSubmitting}
                  className="btn btn-danger btn-elevate kt-login__btn-primary"
                  type="submit"
                >
                  Register
                </button>
              </form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </>
  );
}

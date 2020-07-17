import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from "@material-ui/core";
import { Formik } from "formik";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast, ToastContainer } from "react-toastify";
import api from "../../Resources/api";
import { required } from "../../Resources/errors";

function Example({ labels }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button
        variant="primary"
        className="mt-4 float-right"
        onClick={handleShow}
      >
        Create New Item
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{
              name: "",
              unit_price: "",
              discount: "",
              label_id: 1,
            }}
            validate={(values) => {
              const errors = {};

              if (!values.name) {
                errors.name = required("name");
              }

              if (!values.unit_price) {
                errors.unit_price = required("unit_price");
              }

              if (!values.discount) {
                errors.discount = required("Phone Number");
              }

              if (values.label_id === "") {
                errors.label_id = "Select a Label";
              }

              return errors;
            }}
            onSubmit={(values, { setStatus, setSubmitting }) => {
              setSubmitting(true);
              setStatus(true);

              api
                .post("/items", values)
                .then(() => {
                  setSubmitting(false);
                  toast.success("Item Created Successfully");
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
                    name="unit_price"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.unit_price}
                    helperText={touched.unit_price && errors.unit_price}
                    error={Boolean(touched.unit_price && errors.unit_price)}
                    variant="outlined"
                    label="unit_price"
                  />
                </div>
                <div className="form-group form-modal">
                  <TextField
                    name="discount"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.discount}
                    helperText={touched.discount && errors.discount}
                    error={Boolean(touched.discount && errors.discount)}
                    variant="outlined"
                    label="discount"
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
                      value={values.label_id}
                      onChange={handleChange}
                      name="label_id"
                      onBlur={handleBlur}
                      error={Boolean(
                        touched.appUrlProtocol && errors.appUrlProtocol
                      )}
                      label="District"
                    >
                      <MenuItem value="">
                        <em>Select</em>
                      </MenuItem>
                      {labels.map((item) => (
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

export default Example;

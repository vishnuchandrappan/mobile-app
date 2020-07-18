import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField
} from "@material-ui/core";
import { Formik } from "formik";
import React from "react";
import Modal from "react-bootstrap/Modal";
import { toast, ToastContainer } from "react-toastify";
import api from "../../Resources/api";
import { required } from "../../Resources/errors";

function getInitialValues(item) {
  return {
    name: item.name,
    unit_price: item.unit_price,
    discount: item.discount,
    label_id: item.label_id,
    _method: "PUT",
  };
}

function Example({ show, item, handleClose, labels }) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Item</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={getInitialValues(item)}
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
              .post("/items" + item.id, {})
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
            setFieldValue,
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
                    Category
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
  );
}

export default Example;

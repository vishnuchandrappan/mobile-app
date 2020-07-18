import { TextField } from "@material-ui/core";
import { Formik } from "formik";
import React from "react";
import Modal from "react-bootstrap/Modal";
import { toast, ToastContainer } from "react-toastify";
import api from "../../Resources/api";
import { required } from "../../Resources/errors";

function Example({ show, item, handleClose }) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Update Stock</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{
            stock: 0,
          }}
          validate={(values) => {
            const errors = {};

            if (!values.stock) {
              errors.stock = required("Stock");
            }

            return errors;
          }}
          onSubmit={(values, { setStatus, setSubmitting }) => {
            setSubmitting(true);
            setStatus(true);

            api
              .post("/stocks", {
                item_id: item.id,
                stock: values.stock,
              })
              .then(() => {
                setSubmitting(false);
                toast.success("Stock Updated");
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
                  name="stock"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.stock}
                  helperText={touched.stock && errors.stock}
                  error={Boolean(touched.stock && errors.stock)}
                  variant="outlined"
                  label="stock"
                />
              </div>
              <button
                disabled={isSubmitting}
                className="btn btn-danger btn-elevate kt-login__btn-primary"
                type="submit"
              >
                Update Stock
              </button>
            </form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
}

export default Example;

import { Form, Formik } from "formik";
import React from "react";
import { FiCheck, FiRotateCcw } from "react-icons/fi";
import { Button, Modal } from "rsuite";
import * as yup from "yup";

import FormControls from "../../components/common/FormControls";

function ModalForm(props) {
  const { open, title, onClose, onSubmit, initialValues } = props;

  const validationSchema = yup
    .object({
      name: yup.string().required("This field is required!"),
      genre: yup.string().required("This field is required!"),
    })
    .pick(Object.keys(initialValues));

  return (
    <>
      <Modal
        backdrop="static"
        size="xs"
        keyboard={false}
        open={open}
        onClose={onClose}
      >
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting, isValidating }) => (
            <Form>
              <Modal.Header>
                <Modal.Title>{title}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <FormControls control="text" name="genre" label="Name" />
              </Modal.Body>
              <Modal.Footer>
                <Button
                  appearance="primary"
                  type="submit"
                  className="button-blue"
                  startIcon={<FiCheck />}
                  disabled={isSubmitting || isValidating}
                >
                  Submit
                </Button>
                <Button
                  type="reset"
                  appearance="primary"
                  className="button-red"
                  startIcon={<FiRotateCcw />}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
              </Modal.Footer>
            </Form>
          )}
        </Formik>
      </Modal>
    </>
  );
}

export default ModalForm;

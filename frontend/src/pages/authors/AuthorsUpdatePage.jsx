import React, { useEffect, useState } from "react";
import { Form, Formik } from "formik";
import * as yup from "yup";
import FormControls from "../../components/common/FormControls";
import { useUpdateAuthorMutation } from "../../features/authors/authorsApi";
import { Button, Message, Stack, useToaster } from "rsuite";
import { FiEdit } from "react-icons/fi";
import { useLocation } from "react-router-dom";

function AuthorsUpdatePage({ data }) {
  const [show, setShow] = useState(false);
  const location = useLocation();
  const [updateAuthor] = useUpdateAuthorMutation();
  const toaster = useToaster();
  const validationSchema = yup.object({
    name: yup.string().required("This field is required!"),
  });
  useEffect(() => {
    setShow(false);
  }, [location]);

  const onSubmit = async (values, actions) => {
    try {
      await updateAuthor({ id: data.id, data: values });
      toaster.push(
        <Message showIcon type="success" closable>
          Author successfully updated.
        </Message>,
        { duration: 4500, placement: "topCenter" }
      );
    } catch (error) {
      console.log("error", error);
      toaster.push(
        <Message showIcon type="error" closable>
          The following error ocurred while updating the author.
          {error}
        </Message>,
        { duration: 5000, placement: "topCenter" }
      );
    } finally {
      setShow(false);
    }
  };
  return show ? (
    <Stack>
      <Formik
        initialValues={{ name: data.name }}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        onReset={(values, actions) => {
          setShow(false);
          actions.resetForm();
        }}
      >
        <Form>
          <FormControls control="group" name="name" label="Name" />
        </Form>
      </Formik>
    </Stack>
  ) : (
    <Button
      startIcon={<FiEdit />}
      className="button-blue"
      onClick={() => setShow(true)}
    >
      Edit
    </Button>
  );
}

export default AuthorsUpdatePage;

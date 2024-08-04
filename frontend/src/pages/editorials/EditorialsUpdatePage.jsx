import React, { useState } from "react";
import { FiEdit } from "react-icons/fi";
import { IconButton, Message, useToaster } from "rsuite";
import EditorialModalForm from "../../components/editorials/EditorialModalForm";

import { useUpdateEditorialMutation } from "../../features/editorials/editorialsApi";

function EditorialsUpdatePage({ data }) {
  const [open, setOpen] = useState(false);
  const [updateEditorial] = useUpdateEditorialMutation();
  const toaster = useToaster();

  const onSubmit = async (values) => {
    try {
      await updateEditorial({ id: data.id, data: values });
      toaster.push(
        <Message showIcon type="success" closable>
          Editorial successfully updated.
        </Message>,
        { duration: 4500, placement: "topCenter" }
      );
    } catch (error) {
      console.log("error", error);
      toaster.push(
        <Message showIcon type="error" closable>
          The following error ocurred while updating the editorial.
          {error}
        </Message>,
        { duration: 5000, placement: "topCenter" }
      );
    } finally {
      setOpen(false);
    }
  };

  return (
    <>
      <IconButton
        icon={<FiEdit />}
        className="button-blue"
        style={{ marginRight: "3px" }}
        appearance="primary"
        onClick={() => setOpen(true)}
      />
      <EditorialModalForm
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={onSubmit}
        prevData={{ name: data?.name }}
        title="Update Editorial"
      />
    </>
  );
}

export default EditorialsUpdatePage;

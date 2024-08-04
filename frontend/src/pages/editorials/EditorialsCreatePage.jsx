import React, { useState } from "react";
import { FiPlus } from "react-icons/fi";
import { Button, Message, useToaster } from "rsuite";
import EditorialModalForm from "../../components/editorials/EditorialModalForm";
import { useCreateEditorialMutation } from "../../features/editorials/editorialsApi";

function EditorialsCreatePage() {
  const [open, setOpen] = useState(false);
  const [createEditorial] = useCreateEditorialMutation();
  const toaster = useToaster();

  const onSubmit = async (values, actions) => {
    try {
      await createEditorial(values);
      setOpen(false);
      toaster.push(
        <Message showIcon type="success" closable>
          Editorial successfully created.
        </Message>,
        { duration: 4500, placement: "topCenter" }
      );
    } catch (error) {
      console.log("error", error);
      toaster.push(
        <Message showIcon type="error" closable>
          The following error ocurred while creating the editorial.
          {error}
        </Message>,
        { duration: 5000, placement: "topCenter" }
      );
    }
  };
  return (
    <>
      <Button
        startIcon={<FiPlus />}
        className="button-green"
        onClick={() => setOpen(true)}
      >
        Add Editorial
      </Button>
      <EditorialModalForm
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={onSubmit}
        title="Create Editorial"
      />
    </>
  );
}

export default EditorialsCreatePage;

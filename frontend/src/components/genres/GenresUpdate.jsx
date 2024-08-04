import React, { useState } from "react";
import { FiEdit } from "react-icons/fi";
import { IconButton, Message, useToaster } from "rsuite";
import { useUpdateGenreMutation } from "../../features/genres/genresApi";
import ModalForm from "./GenresModalForm";

function GenresUpdate({ data }) {
  const [open, setOpen] = useState(false);
  const [updateGenre] = useUpdateGenreMutation();
  const toaster = useToaster();

  const onSubmit = async (values) => {
    try {
      await updateGenre({ id: data.id, data: values });
      toaster.push(
        <Message showIcon type="success" closable>
          Genre successfully updated.
        </Message>,
        { duration: 4500, placement: "topCenter" }
      );
    } catch (error) {
      // console.log("error", error);
      toaster.push(
        <Message showIcon type="error" closable>
          The following error ocurred while updating the Genre.
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
      <ModalForm
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={onSubmit}
        initialValues={{ genre: data?.genre }}
        title="Update Genre"
      />
    </>
  );
}

export default GenresUpdate;

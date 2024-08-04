import React, { useState } from "react";
import { FiPlus } from "react-icons/fi";
import { Button, Message, useToaster } from "rsuite";
import AuthorsModalForm from "../../components/authors/AuthorsModalForm";
import { useCreateAuthorMutation } from "../../features/authors/authorsApi";

function AuthorsCreatePage() {
  const [open, setOpen] = useState(false);
  const [createAuthor] = useCreateAuthorMutation();
  const toaster = useToaster();

  const onSubmit = async (values, actions) => {
    try {
      await createAuthor(values);
      setOpen(false);
      toaster.push(
        <Message showIcon type="success" closable>
          Author successfully created.
        </Message>,
        { duration: 4500, placement: "topCenter" }
      );
    } catch (error) {
      console.log("error", error);
      toaster.push(
        <Message showIcon type="error" closable>
          The following error ocurred while creating the author.
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
        Add Author
      </Button>
      <AuthorsModalForm
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={onSubmit}
        title='Create Author'
      />
    </>
  );
}

export default AuthorsCreatePage;

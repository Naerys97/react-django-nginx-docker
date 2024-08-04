import React from "react";
import { Button, Message, Stack, useToaster } from "rsuite";
import { FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

import { useCreateBookMutation } from "../../features/books/bookApi";
import BooksForm from "../../components/books/BooksForm";

function BookCreatePage() {
  const [createBook] = useCreateBookMutation();
  const navigate = useNavigate();
  const toaster = useToaster();

  const onSubmit = async (values, actions) => {
    try {
      await createBook(values).unwrap();
      toaster.push(
        <Message showIcon type="success" closable>
          Book successfully created.
        </Message>,
        { duration: 4500, placement: "topCenter" }
      );
      navigate("/books");
    } catch (error) {
      console.log("error", error);
      toaster.push(
        <Message showIcon type="error" closable>
          The following error ocurred while creating the book.
          {error}
        </Message>,
        { duration: 5000, placement: "topCenter" }
      );
    }
  };
  return (
    <>
      <Stack className="panel-toolbar" justifyContent="space-between">
        <h4>Create Book</h4>
        <Button startIcon={<FiArrowLeft />} onClick={() => navigate(-1)}>
          Back
        </Button>
      </Stack>
      <BooksForm onSubmit={onSubmit} />
    </>
  );
}

export default BookCreatePage;

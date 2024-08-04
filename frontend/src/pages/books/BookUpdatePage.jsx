import React from "react";
import { FiArrowLeft } from "react-icons/fi";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Button, Message, Stack, useToaster } from "rsuite";
import BooksForm from "../../components/books/BooksForm";
import { useUpdateBookMutation } from "../../features/books/bookApi";

function BookUpdatePage() {
  const [updateBook] = useUpdateBookMutation();
  const { bookId } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const toaster = useToaster();

  const bookData = {
    title: state.title,
    authors: state.authors.map((v) => ({ label: v.name, value: v.id })),
    amount: state.amount,
    description: state.description,
    quality: state.quality.toLowerCase(),
    genres: state.genres.map((v) => v.id),
    details: state.details,
    editorial: state.editorial?.id,
    language: state.language,
    cover: null,
  };

  const onSubmit = async (values, actions) => {
    try {
      await updateBook({ id: bookId, data: values }).unwrap();
      toaster.push(
        <Message showIcon type="success" closable>
          Book successfully updated.
        </Message>,
        { duration: 4500, placement: "topCenter" }
      );
    } catch (error) {
      console.log("error", error);
      toaster.push(
        <Message showIcon type="error" closable>
          The following error ocurred while updating the book.
          {error}
        </Message>,
        { duration: 5000, placement: "topCenter" }
      );
    } finally {
      navigate("/books");
    }
  };

  return (
    <>
      <Stack className="panel-toolbar" justifyContent="space-between">
        <h4>Update Book</h4>
        <Button startIcon={<FiArrowLeft />} onClick={() => navigate(-1)}>
          Back
        </Button>
      </Stack>
      <BooksForm onSubmit={onSubmit} bookData={bookData} />
    </>
  );
}

export default BookUpdatePage;

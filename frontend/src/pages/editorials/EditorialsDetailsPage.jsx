import React from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Col, List, Loader, Placeholder, Stack } from "rsuite";
import AuthorsDetails from "../../components/authors/AuthorsDetails";
import { useGetBooksQuery } from "../../features/books/bookApi";
import { getEditorialBooks } from "../../features/editorials/editorialsSlice";

function EditorialsDetailsPage() {
  const { isFetching, isLoading, isSuccess } = useGetBooksQuery();
  const { state } = useLocation();
  //   const navigate = useNavigate();

  const books = useSelector(getEditorialBooks(state?.id));
//   console.log("booksFinal", books);

  if (isFetching || isLoading) {
    return (
      <div>
        <Placeholder.Paragraph
          style={{ marginTop: 30 }}
          graph="image"
          rows={3}
        />
        <Placeholder.Paragraph
          style={{ marginTop: 30 }}
          graph="image"
          rows={3}
        />
        <Placeholder.Paragraph
          style={{ marginTop: 30 }}
          graph="image"
          rows={3}
        />
        <Loader center />
      </div>
    );
  }

  if (isSuccess && !state?.id) {
    return (
      <div
        style={{
          display: "flex",
          flex: "1",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <p>Select an editorial</p>
      </div>
    );
  }

  return (
    <Col xs={23}>
      <Stack className="panel-toolbar" justifyContent="space-between">
        <Stack spacing={10}>
          <h4>{state.name}</h4>
        </Stack>
        <Stack spacing={6}>
        </Stack>
      </Stack>
      <List
        autoScroll
        className="square scrollbar-lady-lips thin"
        style={{ flex: "1", height: "400px", background: "#fde8e9df" }}
      >
        {books.length === 0 ? (
          <span
            style={{
              display: "flex",
              height: "400px",
              justifyContent: "center",
              alignItems: "center",
              background: "#fde8e9df",
            }}
          >
            There are no books to show :(
          </span>
        ) : (
          books.map((book) => (
            <List.Item key={book.id} style={{ background: "#fde8e9df" }}>
              <AuthorsDetails book={book} />
            </List.Item>
          ))
        )}
      </List>
    </Col>
  );
}

export default EditorialsDetailsPage;

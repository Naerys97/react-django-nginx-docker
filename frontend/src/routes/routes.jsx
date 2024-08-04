import AuthorsDetailsPage from "../pages/authors/AuthorsDetailsPage";
import AuthorsListPage from "../pages/authors/AuthorsListPage";
import BookCreatePage from "../pages/books/BookCreatePage";
import BookListPage from "../pages/books/BookListPage";
import BooksPage from "../pages/books/BooksPage";
import BookUpdatePage from "../pages/books/BookUpdatePage";
import EditorialsDetailsPage from "../pages/editorials/EditorialsDetailsPage";
import EditorialsListPage from "../pages/editorials/EditorialsListPage";
import GenresListPage from "../pages/genres/GenresListPage";

export const routes = [
  {
    path: "books",
    element: <BooksPage />,
    children: [
      {
        index: true,
        element: <BookListPage />,
      },
      {
        path: "create",
        element: <BookCreatePage />,
      },
      {
        path: "update/:bookId",
        element: <BookUpdatePage />,
      },
    ],
  },
  {
    path: "authors",
    element: <AuthorsListPage />,
    children: [
      // {
      //   index: true,
      //   element: <AuthorsDetailsPage />,
      // },
      {
        path: ":id",
        element: <AuthorsDetailsPage />,
      },
    ],
  },
  {
    path: "editorials",
    element: <EditorialsListPage />,
    children: [
      // {
      //   index: true,
      //   element: <EditorialsDetailsPage />,
      // },
      {
        path: ":id",
        element: <EditorialsDetailsPage />,
      },
    ],
  },
  {
    path: "genres",
    element: <GenresListPage />,
  },
];

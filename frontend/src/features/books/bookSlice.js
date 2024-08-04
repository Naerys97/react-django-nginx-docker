import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { booksExtendedApi } from './bookApi'
import { normalize } from "normalizr";
import { bookEntity } from "../schema";

const bookAdapter = createEntityAdapter({
    selectId: book => book.id
})

const slice = createSlice({
    name: 'books',
    initialState: bookAdapter.getInitialState(),
    extraReducers: builder => {
        builder
            .addMatcher(booksExtendedApi.endpoints.getBooks.matchFulfilled, (state, { payload }) => {
                if (payload.length > 0) {
                    const normalizedPayload = normalize(payload, [bookEntity])
                    bookAdapter.upsertMany(state, normalizedPayload?.entities?.books)
                }
            })
            .addMatcher(booksExtendedApi.endpoints.createBook.matchFulfilled, (state, { payload }) => {
                const normalizedPayload = normalize(payload, bookEntity)
                const result = normalizedPayload.result
                bookAdapter.addOne(state, normalizedPayload.entities.books[result])
            })
            .addMatcher(booksExtendedApi.endpoints.updateBook.matchFulfilled, (state, { payload }) => {
                const normalizedPayload = normalize(payload, bookEntity)
                const result = normalizedPayload.result
                const { id, ...data } = normalizedPayload.entities.books[result]
                bookAdapter.updateOne(state, { id, data })
            })
            .addMatcher(booksExtendedApi.endpoints.deleteBook.matchFulfilled, (state, { payload }) => {
                bookAdapter.removeOne(state, payload)
            })
    }
})

export const {
    selectAll: getBooks,
    selectById: getBookById,
    selectIds: getBooksIds,
} = bookAdapter.getSelectors((state) => state.books);

// export const getAuthorsPerBook = () =>
//     createDraftSafeSelector(
//         [
//             (state) => getBooks(state),
//             (state) => state.authors.ids.map((id) => state.authors.entities[id]),
//         ],
//         (book, authors) => {
//             console.log(`book`, book);
//             console.log(`authors`, authors);
//             const booksAuthors = book.map((b) => {
//                 return {
//                     book: b.id,
//                     authors: authors.filter((author) => b.authors.includes(author.id)),
//                 };
//             });
//             console.log("booksAuthors", booksAuthors);

//             return booksAuthors;
//         }
//     );

// export const getAuthorsByBookId = (bookId) =>
//     createDraftSafeSelector(
//         [
//             (state) => getBookById(state, bookId), // select the current article
//             (state) => state.authors.ids.map((id) => state.authors.entities[id]), // this is the same as selectAllComments
//         ],
//         (book, authors) => {
//             console.log(`book`, book);
//             console.log(`authors`, authors);
//             return Object.keys(authors)
//                 .map((c) => authors[c])
//                 .filter((author) => book.authors.includes(author.id));
//         }
//     );

export default slice.reducer
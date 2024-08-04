import { createSlice, createEntityAdapter, createDraftSafeSelector } from "@reduxjs/toolkit";
import { authorsExtendedApi } from './authorsApi'
import { normalize } from "normalizr";
import { authorEntity, bookEntity } from "../schema";
import { booksExtendedApi } from "../books/bookApi";

const authorAdapter = createEntityAdapter({
    selectId: author => author.id
})

const slice = createSlice({
    name: 'authors',
    initialState: authorAdapter.getInitialState(),
    extraReducers: builder => {
        builder
            .addMatcher(booksExtendedApi.endpoints.getBooks.matchFulfilled, (state, { payload }) => {
                if (payload.length > 0) {
                    const normalizedPayload = normalize(payload, [bookEntity])
                    authorAdapter.upsertMany(state, normalizedPayload.entities.authors)
                }
            })
            .addMatcher(booksExtendedApi.endpoints.createBook.matchFulfilled, (state, { payload }) => {
                const normalizedPayload = normalize(payload, bookEntity)
                const result = normalizedPayload.result
                authorAdapter.upsertMany(state, normalizedPayload.entities.books[result].authors)
            })
            .addMatcher(booksExtendedApi.endpoints.updateBook.matchFulfilled, (state, { payload }) => {
                const normalizedPayload = normalize(payload, bookEntity)
                const result = normalizedPayload.result
                authorAdapter.upsertMany(state, normalizedPayload.entities.books[result].authors)
            })
            .addMatcher(authorsExtendedApi.endpoints.getAuthors.matchFulfilled, (state, { payload }) => {
                const normalizedPayload = normalize(payload, [authorEntity])
                authorAdapter.upsertMany(state, normalizedPayload.entities.authors)
            })
            .addMatcher(authorsExtendedApi.endpoints.createAuthor.matchFulfilled, (state, { payload }) => {
                const normalizedPayload = normalize(payload, authorEntity)
                const result = normalizedPayload.result
                authorAdapter.addOne(state, normalizedPayload.entities.authors[result])
            })
            .addMatcher(authorsExtendedApi.endpoints.updateAuthor.matchFulfilled, (state, { payload }) => {
                const normalizedPayload = normalize(payload, authorEntity)
                const result = normalizedPayload.result
                const { id, ...data } = normalizedPayload.entities.authors[result]
                authorAdapter.updateOne(state, { id, data })
            })
            .addMatcher(authorsExtendedApi.endpoints.deleteAuthor.matchFulfilled, (state, { payload }) => {
                authorAdapter.removeOne(state, payload)
            })
    }
})

export const {
    selectAll: getAuthors,
    selectById: getAuthorById,
} = authorAdapter.getSelectors((state) => state.authors);

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

export const getAuthorBooks = (id) =>
    createDraftSafeSelector(
        [
            (state) => state.books.ids.map((id) => state.books.entities[id]),
            state => state
        ],
        (books, state) => {
            return books.filter(book => book.authors.includes(id)).map(book => ({
                ...book,
                authors: book.authors.map(author => getAuthorById(state, author).name)
            }))
        }
    );

export default slice.reducer
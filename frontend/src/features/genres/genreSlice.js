// import { createSlice, createEntityAdapter, createDraftSafeSelector } from "@reduxjs/toolkit";
// import { authorsExtendedApi } from './authorsApi'
// import { normalize } from "normalizr";
// import { authorEntity, bookEntity } from "../schema";
// import { booksExtendedApi } from "../books/bookApi";

// const genreAdapter = createEntityAdapter({
//     selectId: genre => genre.id
// })

// const slice = createSlice({
//     name: 'authors',
//     initialState: authorAdapter.getInitialState(),
//     extraReducers: builder => {
//         builder
//             .addMatcher(booksExtendedApi.endpoints.getBooks.matchFulfilled, (state, { payload }) => {
//                 const normalizedPayload = normalize(payload, [bookEntity])
//                 genreAdapter.upsertMany(state, normalizedPayload.entities.authors)
//             })
//             .addMatcher(booksExtendedApi.endpoints.createBook.matchFulfilled, (state, { payload }) => {
//                 const normalizedPayload = normalize(payload, bookEntity)
//                 console.log('normalizedPayload', normalizedPayload)
//                 const result = normalizedPayload.result
//                 authorAdapter.upsertMany(state, normalizedPayload.entities.books[result].authors)
//             })
//             .addMatcher(booksExtendedApi.endpoints.updateBook.matchFulfilled, (state, { payload }) => {
//                 const normalizedPayload = normalize(payload, bookEntity)
//                 const result = normalizedPayload.result
//                 authorAdapter.upsertMany(state, normalizedPayload.entities.books[result].authors)
//             })
//             .addMatcher(authorsExtendedApi.endpoints.getAuthors.matchFulfilled, (state, { payload }) => {
//                 const normalizedPayload = normalize(payload, [authorEntity])
//                 authorAdapter.upsertMany(state, normalizedPayload.entities.authors)
//             })
//             .addMatcher(authorsExtendedApi.endpoints.createAuthor.matchFulfilled, (state, { payload }) => {
//                 console.log('payload', payload)
//                 const normalizedPayload = normalize(payload, authorEntity)
//                 console.log('normalizedPayload', normalizedPayload)
//                 const result = normalizedPayload.result
//                 authorAdapter.addOne(state, normalizedPayload.entities.authors[result])
//             })
//             .addMatcher(authorsExtendedApi.endpoints.updateAuthor.matchFulfilled, (state, { payload }) => {
//                 const normalizedPayload = normalize(payload, authorEntity)
//                 const result = normalizedPayload.result
//                 const { id, ...data } = normalizedPayload.entities.authors[result]
//                 authorAdapter.updateOne(state, { id, data })
//             })
//             .addMatcher(authorsExtendedApi.endpoints.deleteAuthor.matchFulfilled, (state, { payload }) => {
//                 authorAdapter.removeOne(state, payload)
//             })
//     }
// })

// export const {
//     selectAll: getAuthors,
//     selectById: getAuthorById,
// } = authorAdapter.getSelectors((state) => state.authors);





// export default slice.reducer
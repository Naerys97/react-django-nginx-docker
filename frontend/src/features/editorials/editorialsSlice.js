import { createSlice, createEntityAdapter, createDraftSafeSelector } from "@reduxjs/toolkit";
import { editorialsExtendedApi } from './editorialsApi'
import { normalize } from "normalizr";
import { editorialEntity, bookEntity } from "../schema";
import { booksExtendedApi } from "../books/bookApi";
import { getAuthorById } from "../authors/authorsSlice";

const editorialAdapter = createEntityAdapter({
    selectId: e => e.id
})

const slice = createSlice({
    name: 'editorials',
    initialState: editorialAdapter.getInitialState(),
    extraReducers: builder => {
        builder
            .addMatcher(booksExtendedApi.endpoints.getBooks.matchFulfilled, (state, { payload }) => {
                if (payload.length > 0) {
                    const normalizedPayload = normalize(payload, [bookEntity])
                    editorialAdapter.upsertOne(state, normalizedPayload.entities.editorials)
                }
            })
            .addMatcher(editorialsExtendedApi.endpoints.getEditorials.matchFulfilled, (state, { payload }) => {
                const normalizedPayload = normalize(payload, [editorialEntity])
                editorialAdapter.upsertMany(state, normalizedPayload.entities.editorials)
            })
            .addMatcher(editorialsExtendedApi.endpoints.createEditorial.matchFulfilled, (state, { payload }) => {
                const normalizedPayload = normalize(payload, editorialEntity)
                const result = normalizedPayload.result
                editorialAdapter.addOne(state, normalizedPayload.entities.editorials[result])
            })
            .addMatcher(editorialsExtendedApi.endpoints.updateEditorial.matchFulfilled, (state, { payload }) => {
                const normalizedPayload = normalize(payload, editorialEntity)
                const result = normalizedPayload.result
                const { id, ...data } = normalizedPayload.entities.editorials[result]
                editorialAdapter.updateOne(state, { id, data })
            })
            .addMatcher(editorialsExtendedApi.endpoints.deleteEditorial.matchFulfilled, (state, { payload }) => {
                editorialAdapter.removeOne(state, payload)
            })
    }
})

export const {
    selectAll: getEditorials,
    selectById: getEditorialById,
} = editorialAdapter.getSelectors((state) => state.editorials);

export const getEditorialBooks = (id) =>
    createDraftSafeSelector(
        [
            (state) => state.books.ids.map((id) => state.books.entities[id]),
            state => state
        ],
        (books, state) => {
            return books.filter(book => book.editorial === id).map(book => ({
                ...book,
                authors: book.authors.map(author => getAuthorById(state, author).name)
            }))
        }
    );

export const getEditorialAuthors = id => createDraftSafeSelector(
    [
        (state) => state.books.ids.map((id) => state.books.entities[id]),
        (state) => state.authors.ids.map((id) => state.authors.entities[id]),
        state => state
    ],
    (books, state) => {
        const authors = new Set()
        books.forEach(book => {
            if (book.editorial === id) {
                book.authors.forEach(author => authors.add(getAuthorById(state, author).name))
            }
        })
        return authors
    }
)

export default slice.reducer
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';
import booksReducer from '../features/books/bookSlice'
import authorsReducer from '../features/authors/authorsSlice'
import { baseSplitApi } from '../features/api/apiSlice';

export const store = configureStore({
  reducer: {
    [baseSplitApi.reducerPath]: baseSplitApi.reducer,
    books: booksReducer,
    authors: authorsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseSplitApi.middleware)
});


setupListeners(store.dispatch)
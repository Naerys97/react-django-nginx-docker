import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

let BASE_URL = process.env.REACT_APP_BASE_URL || 'http://127.0.0.1:8000/api/v3/'
// new code
if (window.location.origin === "http://localhost:3000") {
    BASE_URL = process.env.REACT_APP_BASE_URL
} else {
    BASE_URL = `${window.location.origin}/api/v3`;
}


// const BASE_URL =  'http://127.0.0.1:8000/api/v3/'
// console.log('process.env.REACT_APP_BASE_URL', process.env.REACT_APP_BASE_URL)
export const baseSplitApi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
    tagTypes: ['Books', 'Authors', 'Editorials', 'Genres'],
    // prepareHeaders: (headers, { getState }) => {
    //     const token = getState().auth.token

    //     // If we have a token set in state, let's assume that we should be passing it.
    //     if (token) {
    //       headers.set('authorization', `Bearer ${token}`)
    //     }

    //     return headers
    //   },
    endpoints: () => ({})
})
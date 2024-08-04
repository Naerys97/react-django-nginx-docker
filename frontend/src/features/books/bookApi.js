import { baseSplitApi } from "../api/apiSlice";

const BASE_URL = 'catalog/books'

const formData = (data) => {
    let form_data = new FormData()
    let authors = data.authors.map((a) => a.value)
    form_data.append('title', data.title)
    form_data.append('authors', JSON.stringify(authors))
    form_data.append('amount', data.amount)
    form_data.append('description', data.description)
    form_data.append('quality', data.quality)
    form_data.append('genres', JSON.stringify(data.genres))
    form_data.append('details', data.details)
    form_data.append('editorial', data.editorial)
    form_data.append('language', data.language)
    if (data.cover) {
        form_data.append('cover', data.cover, data.cover.name)
    }
    return form_data
}

export const booksExtendedApi = baseSplitApi.injectEndpoints({
    endpoints: builder => ({
        getBooks: builder.query({
            query: () => BASE_URL,
            providesTags: (result) =>
            result
              ? [
                  ...result.map(({ id }) => ({ type: 'Books', id })),
                  { type: 'Books', id: 'LIST' },
                ]
              : [{ type: 'Books', id: 'LIST' }],
        }),
        getBook: builder.query({
            query: id => `${BASE_URL}/${id}`,
            providesTags: (result, error, arg) => [{ type: 'Books', id: arg }]
        }),
        createBook: builder.mutation({
            query: data => ({
                url: `${BASE_URL}/`,
                method: 'POST',
                body: formData(data)
            }),
            invalidatesTags: [{ type: 'Books', id: 'LIST' }]
        }),
        updateBook: builder.mutation({
            query: ({ id, data }) => ({
                url: `${BASE_URL}/${id}/`,
                method: 'PUT',
                body: formData(data)
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'Books', id: arg.id }]
        }),
        deleteBook: builder.mutation({
            query: id => ({
                url: `${BASE_URL}/${id}`,
                method: 'DELETE',
            }),
            transformResponse: (response, meta, arg) => arg,
            invalidatesTags: (result, error, arg) => [{ type: 'Books', id: arg.id }]

        })
    }),
    overrideExisting: false,
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetBooksQuery, useCreateBookMutation, useUpdateBookMutation, useDeleteBookMutation } = booksExtendedApi
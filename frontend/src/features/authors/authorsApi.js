import { baseSplitApi } from "../api/apiSlice";

export const authorsExtendedApi = baseSplitApi.injectEndpoints({
    endpoints: builder => ({
        getAuthors: builder.query({
            query: () => 'catalog/authors',
            providesTags: (result) =>
                result
                    ? [
                        ...result.map(({ id }) => ({ type: 'Authors ', id })),
                        { type: 'Authors', id: 'LIST' },
                    ]
                    : [{ type: 'Authors', id: 'LIST' }],
        }),
        getAuthor: builder.query({
            query: id => `/catalog/authors/${id}`,
            providesTags: (result, error, arg) => [{ type: 'Authors', id: arg }]
        }),
        createAuthor: builder.mutation({
            query: data => ({
                url: 'catalog/authors/',
                method: 'POST',
                body: data
            }),
            invalidatesTags: [{ type: 'Authors', id: 'LIST' }]
        }),
        updateAuthor: builder.mutation({
            query: ({ id, data }) => ({
                url: `/catalog/authors/${id}/`,
                method: 'PUT',
                body: data
            }),
            async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
                const patchResult = dispatch(
                  authorsExtendedApi.util.updateQueryData('getAuthor', id, (draft) => {
                    Object.assign(draft, patch)
                  })
                )
                try {
                  await queryFulfilled
                } catch {
                  patchResult.undo()
                }
              },
            invalidatesTags: (result, error, arg) => [{ type: 'Authors', id: arg.id }]
        }),
        deleteAuthor: builder.mutation({
            query: id => ({
                url: `catalog/authors/${id}`,
                method: 'DELETE'
            }),
            transformResponse: (response, meta, arg) => arg,
            invalidatesTags: (result, error, arg) => [{ type: 'Authors', id: arg.id }]
        })
    }),
    overrideExisting: false,
})

export const { useGetAuthorsQuery, useCreateAuthorMutation, useDeleteAuthorMutation, useUpdateAuthorMutation } = authorsExtendedApi 
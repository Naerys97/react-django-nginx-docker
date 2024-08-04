import { baseSplitApi } from "../api/apiSlice";

const BASE_URL = 'catalog/editorials'

export const editorialsExtendedApi = baseSplitApi.injectEndpoints({
    endpoints: builder => ({
        getEditorials: builder.query({
            query: () => BASE_URL,
            providesTags: (result) =>
                result
                    ? [
                        ...result.map(({ id }) => ({ type: 'Editorials ', id })),
                        { type: 'Editorials', id: 'LIST' },
                    ]
                    : [{ type: 'Editorials', id: 'LIST' }],
        }),
        getEditorial: builder.query({
            query: id => `${BASE_URL}/${id}`,
            providesTags: (result, error, arg) => [{ type: 'Editorials', id: arg }]
        }),
        createEditorial: builder.mutation({
            query: data => ({
                url: `${BASE_URL}/`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: [{ type: 'Editorials', id: 'LIST' }]
        }),
        updateEditorial: builder.mutation({
            query: ({ id, data }) => ({
                url: `${BASE_URL}/${id}/`,
                method: 'PUT',
                body: data
            }),
            async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
                const patchResult = dispatch(
                    editorialsExtendedApi.util.updateQueryData('getEditorial', id, (draft) => {
                        Object.assign(draft, patch)
                    })
                )
                try {
                    await queryFulfilled
                } catch {
                    patchResult.undo()
                }
            },
            invalidatesTags: (result, error, arg) => [{ type: 'Editorials', id: arg.id }]
        }),
        deleteEditorial: builder.mutation({
            query: id => ({
                url: `${BASE_URL}/${id}`,
                method: 'DELETE'
            }),
            transformResponse: (response, meta, arg) => arg,
            invalidatesTags: (result, error, arg) => [{ type: 'Editorials', id: arg.id }]
        })
    }),
    overrideExisting: false,
})

export const { useGetEditorialsQuery, useCreateEditorialMutation, useDeleteEditorialMutation, useGetEditorialQuery, useUpdateEditorialMutation } = editorialsExtendedApi 
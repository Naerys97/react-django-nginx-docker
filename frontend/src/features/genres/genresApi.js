import { baseSplitApi } from "../api/apiSlice";

const BASE_URL = 'catalog/genres'


export const genresExtendedApi = baseSplitApi.injectEndpoints({
    endpoints: builder => ({
        getGenres: builder.query({
            query: () => BASE_URL,
            providesTags: (result) =>
                result
                    ? [
                        ...result.map(({ id }) => ({ type: 'Genres ', id })),
                        { type: 'Genres', id: 'LIST' },
                    ]
                    : [{ type: 'Genres', id: 'LIST' }],
        }),
        getGenre: builder.query({
            query: id => `${BASE_URL}/${id}`,
            providesTags: (result, error, arg) => [{ type: 'Genres', id: arg }]
        }),
        createGenre: builder.mutation({
            query: data => ({
                url: `${BASE_URL}/`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: [{ type: 'Genres', id: 'LIST' }]
        }),
        updateGenre: builder.mutation({
            query: ({ id, data }) => ({
                url: `${BASE_URL}/${id}/`,
                method: 'PUT',
                body: data
            }),
            async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
                const patchResult = dispatch(
                    genresExtendedApi.util.updateQueryData('getGenre', id, (draft) => {
                        Object.assign(draft, patch)
                    })
                )
                try {
                    await queryFulfilled
                } catch {
                    patchResult.undo()
                }
            },
            invalidatesTags: (result, error, arg) => [{ type: 'Genres', id: arg.id }]
        }),
        deleteGenre: builder.mutation({
            query: id => ({
                url: `${BASE_URL}/${id}`,
                method: 'DELETE'
            }),
            transformResponse: (response, meta, arg) => arg,
            invalidatesTags: (result, error, arg) => [{ type: 'Genres', id: arg.id }]
        })
    }),
    overrideExisting: false,
})

export const { useGetGenresQuery, useCreateGenreMutation, useDeleteGenreMutation, useGetGenreQuery, useUpdateGenreMutation } = genresExtendedApi 
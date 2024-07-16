import apiSlice from "../apiSlice";

const spareApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        postNewSpare: builder.mutation({
            query: (data) => ({
                url: "/spare",
                method: "POST",
                body: data
            }),
            invalidatesTags: ["spare"],
        }),
        postOwnSpare: builder.mutation({
            query: (data) => ({
                url: "/ownSpare",
                method: "POST",
                body: data
            }),
            invalidatesTags: ["spare"],
        }),

        postReturnSpare: builder.mutation({
            query: (data) => ({
                url: "/returnSpare",
                method: "POST",
                body: data
            }),
            invalidatesTags: ["spare"],
        }),

        replaceMentSpare:builder.mutation({
            query:(data)=>({
                url:"/spare",
                method:"PUT",
                body:data
            }),
            invalidatesTags: ["spare"],
        }),
        replaceMentOwnSpare:builder.mutation({
            query:(data)=>({
                url:"/ownSpare",
                method:"PUT",
                body:data
            }),
            invalidatesTags: ["spare"],
        }),
        getSpareList: builder.query({
            query: () => ({
                url: "/spare"
            }),
            providesTags: ["spare"]
        }),

        getOwnSpareList: builder.query({
            query: () => ({
                url: "/ownSpare"
            }),
            providesTags: ["spare"]
        }),
        getOwnSpareStock: builder.query({
            query: () => ({
                url: "/ownSpare/stock"
            }),
            providesTags: ["spare"]
        }),

        getNewSpareStock: builder.query({
            query: () => ({
                url: "/newSpare/stock"
            }),
            providesTags: ["spare"]
        }),

        getReturnSpare: builder.query({
            query: () => ({
                url: "/returnSpare"
            }),
            providesTags: ["spare"]
        }),

        getReturnSparePending: builder.query({
            query: () => ({
                url: "/returnSpare/pending"
            }),
            providesTags: ["spare"]
        }),

        getSingleReplacement:builder.query({
            query:(id)=>({
                url:`/replacement/${id}`
            }),
            providesTags: ["spare"]
        })
    })
})

export const { usePostNewSpareMutation, useGetSpareListQuery,
    useReplaceMentSpareMutation, useGetSingleReplacementQuery,
    usePostOwnSpareMutation,useGetOwnSpareListQuery,useGetOwnSpareStockQuery,
    usePostReturnSpareMutation,useGetReturnSpareQuery,useReplaceMentOwnSpareMutation,
    useGetNewSpareStockQuery,useGetReturnSparePendingQuery

 } = spareApi
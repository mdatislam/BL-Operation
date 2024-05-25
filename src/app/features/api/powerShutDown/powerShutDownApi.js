import apiSlice from "../apiSlice";

 const powerShutDownApi= apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        postData:builder.mutation({
            query:(data)=>({
                url:"/powerShutDown",
                method: "POST",
                body:data

            }),
            invalidatesTags:["powerShut"]
        }),

        getShutDownData:builder.query({
            query:()=>({
                url:"/powerShutDown"
            }),
            providesTags:["powerShut"]
        }),
        deleteShutDownData:builder.mutation({
            query:()=>({
                url:"/powerShutDown",
                method:"DELETE"
            }),
            invalidatesTags:["powerShut"]
        })
        
    })
})

export const {usePostDataMutation,
    useGetShutDownDataQuery,
    useDeleteShutDownDataMutation
}=powerShutDownApi
import apiSlice from "../apiSlice";

const spareApi= apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        postNewSpare:builder.mutation({
            query:(data)=>({
                url:"/spare",
                method:"POST",
                body:data
            })
        }),

        getSpareList:builder.query({
            query:()=>({
                url:"/spare"
            })
        })
    })
})

 export const {usePostNewSpareMutation,useGetSpareListQuery}=spareApi
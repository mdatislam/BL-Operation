import apiSlice from "../apiSlice";

const userApi= apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        getUserList:builder.query({
            query:()=>({
                url:"/userList/performance"
            }),
           providesTags:["performance"] 
        }),
        
    }),
    
})

export const {useGetUserListQuery}=userApi
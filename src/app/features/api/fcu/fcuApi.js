import apiSlice from "../apiSlice";

const fcuApi= apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        getFcuServiceUpdate:builder.query({
            query:()=>({
                url:"/fcuFilterChangeLatestRecord"
            })
        })
    })
})

export const {useGetFcuServiceUpdateQuery}=fcuApi
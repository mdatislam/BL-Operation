
import apiSlice from "../../apiSlice";

const pgRunApi = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        getApprovalPending:builder.query({
            query:()=>({
                url:"/chartPendingAllPgRun"
            })
        })
    })
})

export const {useGetApprovalPendingQuery}= pgRunApi
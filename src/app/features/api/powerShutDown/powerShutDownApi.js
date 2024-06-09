import apiSlice from "../apiSlice";

const powerShutDownApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        postData: builder.mutation({
            query: (data) => ({
                url: "/powerShutDown",
                method: "POST",
                body: data

            }),
            invalidatesTags: ["powerShut"]
        }),

        getShutDownData: builder.query({
            query: () => ({
                url: "/powerShutDown"
            }),
            providesTags: ["powerShut"]
        }),
        deleteShutDownData: builder.mutation({
            query: () => ({
                url: "/powerShutDown",
                method: "DELETE"
            }),
            invalidatesTags: ["powerShut"]
        }),
        getLockRequestData: builder.query({
            query: ({lowTime, highTime}) => ({
                url: `/lockRequest?lowTime=${lowTime}&highTime=${highTime}`,


            }),
            providesTags: ["powerShut"]
        }),
        getThanaWiseAlarm: builder.query({
            query: (delayTime) => ({
                url: `/thanaWisePowerAlarm/${delayTime}`
            })
        })

    })
})

export const { usePostDataMutation,
    useGetShutDownDataQuery,
    useDeleteShutDownDataMutation,
    useGetLockRequestDataQuery,
    useGetThanaWiseAlarmQuery
} = powerShutDownApi
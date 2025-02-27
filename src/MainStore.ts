import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const API = createApi({
    baseQuery:fetchBaseQuery({baseUrl:"http://localhost:3000/"}),
    tagTypes:["tasks"],
    endpoints:((builder)=>({
        getTasks:builder.query({
            query:()=> "/tasks",
            providesTags:['tasks']
        }),
    
        addTask:builder.mutation({
            query:(tasks)=>({
                url:"/tasks",
                method:"POST",
                body:tasks,
            }),
            invalidatesTags:['tasks']
        }),
        updateTask:builder.mutation({
            query:({id, ...updateTask})=>({
                url:`/tasks/${id}`,
                method:"PATCH",
                body:updateTask
            }),
            invalidatesTags:['tasks']
        }),
        deleteTask:builder.mutation({
            query:({id})=>({
                url:`/tasks/${id}`,
                method:"DELETE"
                
            }),
            invalidatesTags:['tasks']
        })
    }))

})

export const {useGetTasksQuery, useAddTaskMutation, useUpdateTaskMutation, useDeleteTaskMutation} = API

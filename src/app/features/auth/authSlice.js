import { createSlice } from "@reduxjs/toolkit";


const initialState= {
    userInfo:{ email:"",  role:""},
    isLoading:true,
    isError:false,
    error:""
}

const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{

    }

})

export default authSlice.reducer
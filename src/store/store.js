

import {configureStore, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const tableSlice = createSlice({
    name: "table",
    initialState : {
        data : [],
        loading: false,
        error: null
    },
    reducers: {
        fetchTableDataRequest: (state) => {
            state.loading = true;
            state.error = null
        },

        fetchTableDataSuccess: (state, action) => {
            state.data = action.payload;
            state.loading = false;
            state.error = null;
        },

        fetchTableDataFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
})

export const {
    fetchTableDataRequest,
    fetchTableDataSuccess,
    fetchTableDataFailure
} = tableSlice.actions;

export const fetchTableData = () => async (dispatch) => {
    try{
        dispatch(fetchTableDataRequest());
        const response = await axios.get("https://api.spacexdata.com/v3/launches");
        dispatch(fetchTableDataSuccess(response.data));
    } catch (error){
       dispatch(fetchTableDataFailure(error.message));
    }
}

const store = configureStore({
    reducer: {
        table: tableSlice.reducer,
    },
});

export default store;
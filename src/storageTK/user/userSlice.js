import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// асинхронная логика, вызов асинхронных функций с помощью createAsyncThunk
// -------------------
export const fetchUser = createAsyncThunk(
    "user/fetchUser",
    async function (
        dataOutside,
        { rejectWithValue, fulfillWithValue, getState, dispatch, extra: api }
    ) {
        try {

            const state = getState();
            console.log({ state })
            const data = await api.getUserInfo();
            return fulfillWithValue(data);
        } catch (error) {
            console.log({ error });
            return rejectWithValue(error);
        }
    }
);
// -------------------

// dispatch(fetchUser(data))

// начальное состояние
// -------------------
const initialState = {
    data: {},
    loading: false,
    error: null,
};
// -------------------

// создание слайса , то есть создание кусочка общего стейта
// -------------------
const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    // reducers: {}
    extraReducers: (builder) => {
        builder.addCase(fetchUser.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(fetchUser.fulfilled, (state, action) => {
            console.log({ action });
            // return {...state, dosmt: action.payload}
            state.data = action.payload;
            state.loading = false;
        });
        builder.addCase(fetchUser.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
        });
    },
});

export default userSlice.reducer;
// -------------------

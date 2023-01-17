import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

const initialState = {
    userAuth: {
        user: {},
        blocks: [],
        blockText: ""
    },
    items: {
        email: "",
        password: "",
        loginEmail: "",
        loginPassword: "",

    },

};

export const userAutoCheck = createAsyncThunk('loginRegister/loginRegister', async (value) => {

        return await fetch(`http://localhost:8080/blocks`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
                "Authorization": `Bearer ${value?.stsTokenManager?.accessToken}`
            }
        }).then(res => res.json().then(res => {
            return res;
        }));
    }
)
export const loginRegister = createSlice({
    name: 'loginRegister',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.userAuth.user = action.payload;
        },
        setBlockText: (state, action) => {
            // console.log(action.payload.map(el => el.children.map(e => e.text)))
            state.userAuth.blockText = action.payload
        },
        setEmail: (state, action) => {
            state.items.email = action.payload;
        },
        setPassword: (state, action) => {
            state.items.password = action.payload;
        },
        setLoginEmail: (state, action) => {
            state.items.loginEmail = action.payload;
        },
        setLoginPassword: (state, action) => {
            state.items.loginPassword = action.payload;
        },

    },
    extraReducers: (builder) => {
        builder.addCase(userAutoCheck.fulfilled, (state, {payload}) => {
            state.userAuth.blocks = payload;
        })
    },

});

export const {
    setUser,
    setBlockText,
    setEmail,
    setPassword,
    setLoginEmail,
    setLoginPassword,
    sendBlock
} = loginRegister.actions;

export const selectUserAuth = (state) => state.loginRegister.userAuth;
export const selectItem = (state) => state.loginRegister.items;

export default loginRegister.reducer;
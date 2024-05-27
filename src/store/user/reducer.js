import {createSlice} from "@reduxjs/toolkit";
import {getToken, setToken as _setToken,removeToken} from '@/utils/token'

const userSlice = createSlice({
    name:'user',
    initialState: {token:getToken() || '',isLogin:false,username:'',id:'',role:1},
    reducers:{
        setUser(state,action){
            const {username,id,token,role} = action.payload;
            state.username = username;
            state.id = id;
            state.role = role
            state.token = token;
            state.isLogin = true;
            _setToken(action.payload.token);
        },
        removeUser(state,action){
            state.username='';
            state.id='';
            state.token = '';
            state.isLogin = false;
            removeToken();
        }
    }
})

export const {reducer:userReducer} = userSlice;

export const {removeUser,setUser} = userSlice.actions;

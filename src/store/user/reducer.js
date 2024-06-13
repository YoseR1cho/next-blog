import {createSlice} from "@reduxjs/toolkit";
import {getToken, setToken as _setToken,removeToken} from '@/utils/token'

const userSlice = createSlice({
    name:'user',
    initialState: {token:getToken() || '',isLogin:false,username:'',id:'',role:1,avatar:''},
    reducers:{
        setUser(state,action){
            Object.keys(action.payload).forEach(key=>{
                state[key] = action.payload[key]
            })
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

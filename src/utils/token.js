import cookie from "react-cookies";
import {LOGINCOOKIE, LOGINREFRESHTOKEN} from "@/utils/config";
import {refreshToken as _refreshToken} from "@/utils/apis/user";

function setToken(token){
    cookie.save(LOGINCOOKIE,token,{path:'/',expires:new Date(new Date().getTime()+60*1000*60*24*3)})
}

function setRefreshToken(token){
    cookie.save(LOGINREFRESHTOKEN,token,{path:'/',expires:new Date(new Date().getTime()+60*1000*60*24*30)})
}

function getToken(){
    return cookie.load(LOGINCOOKIE);
}

function getRefreshToken(){
    return cookie.load(LOGINREFRESHTOKEN);
}

function removeToken() {
    cookie.remove(LOGINCOOKIE);
}

async function refreshToken(){
    const res = await _refreshToken()
    const {accessToken,refreshToken} = res.data

    setToken(accessToken)
    setRefreshToken(refreshToken)

    return new Promise(resolve=>resolve(accessToken));
}

export {
    setToken,
    getToken,
    removeToken,
    setRefreshToken,
    refreshToken,
    getRefreshToken
};

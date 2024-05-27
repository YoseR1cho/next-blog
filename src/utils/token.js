import cookie from "react-cookies";
import {LOGINCOOKIE} from "@/utils/config";

function setToken(token){
    cookie.save(LOGINCOOKIE,token,{path:'/',expires:new Date(new Date().getTime()+60*1000*60*24*3)})
}

function getToken(){
    return cookie.load(LOGINCOOKIE);
}

function removeToken() {
    cookie.remove(LOGINCOOKIE);
}

export {
    setToken,
    getToken,
    removeToken
};

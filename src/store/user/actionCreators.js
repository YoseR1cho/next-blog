import { userLogin, userRegister, tokenLogin } from "@/utils/apis/user";
import { setUser, removeUser } from "@/store/user/reducer";
import { getToken, removeToken,setToken,setRefreshToken } from "@/utils/token";
import { message } from "antd";

export const fetchLogin = values => {
    const { username, password } = values;
    return async dispatch => {
        try {
            const res = await userLogin({ username, password });
            const { id, token, role, avatar, refreshToken } = res.data;

            setToken(token)
            setRefreshToken(refreshToken)

            dispatch(
                setUser({
                    username,
                    id,
                    role,
                    avatar: avatar || "",
                })
            );
        } catch (err) {
            throw err;
        }
    };
};

export const fetchRegister = values => {
    return async dispatch => {
        try {
            const res = await userRegister(values);
        } catch (err) {
            throw err;
        }
    };
};

export const fetchToken = () => {
    return async dispatch => {
        // 通过后端校验token并返回用户数据
        try {
            const token = getToken();
            if (token) {
                const res = await tokenLogin();

                dispatch(
                    setUser({
                        ...res.data,
                        newToken: undefined,
                        token: res.data.newToken,
                    })
                );
            }
        } catch (e) {
            message.error("身份认证失败！");
            // removeToken();
        }
    };
};

export const fetchLogout = () => {
    return dispatch => {
        dispatch(removeUser());
    };
};

export const fetchInfo = values => {
    return dispatch => {};
};

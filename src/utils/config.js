import React from "react";

export const dbUri = "mongodb://localhost:27017"; // MongoDB连接URI
export const dbName = "Blog"; // 数据库名称

export const API_URL = "/api";

export const LOGINCOOKIE = "yoseR1cho_blog_tokens";

export const LOGINREFRESHTOKEN = 'yoseR1cho_blog_refreshTokens'

export const USERNAMEEXP = /^[\u4e00-\u9fa5a-zA-Z0-9]{5,15}$/; //用户名正则 5-15个字符

export const PASSWORDEXP = /^(?=.*[a-zA-Z])(?=.*\d).{6,20}$/; //密码正则 6到20个数字+字母

export const EMAILEXP = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+/; //电子邮箱正则

export const COLOR_LIST = [
    "magenta",
    "blue",
    "red",
    "volcano",
    "orange",
    "gold",
    "lime",
    "green",
    "cyan",
    "geekblue",
    "purple",
];

export const HOME_PAGESIZE = 10;

export const BACKGROUND_PAGESIZE = 7;

export const headings = {
    h2(props) {
        const { children } = props;
        return <h2 id={children}>{children}</h2>;
    },
    h3(props) {
        const { children } = props;
        return <h3 id={children}>{children}</h3>;
    },
    h4(props) {
        const { children } = props;
        return <h4 id={children}>{children}</h4>;
    },
    h5(props) {
        const { children } = props;
        return <h5 id={children}>{children}</h5>;
    },
    h6(props) {
        const { children } = props;
        return <h6 id={children}>{children}</h6>;
    },
};

export const protectedApi = ["/article/"];

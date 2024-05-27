import {notification} from "antd";
import {CheckCircleOutlined} from "@ant-design/icons";
import React from "react";

export const notificate = ()=>{
    const [api, contextHolder] = notification.useNotification();
    const openNotification = (msg,des) => {
        api.info({
            message: msg,
            description:
                des,
            placement:'topRight',
            icon:<CheckCircleOutlined style={{color:'#00EE00'}}/>
        });
    };

    return [contextHolder,openNotification];
}

import React, { useEffect, useState } from "react";
import styles from "@/app/(main)/(admin)/admin/page.module.scss";
import menuConfig from "@/utils/menuConfig";

import { usePathname } from "next/navigation";
import { getMenuItemInMenuListByProperty } from "@/utils";

const Index = () => {
    const pathname = usePathname();
    const [title, setTitle] = useState("首页");

    useEffect(() => {
        const label = pathname.split('/')[3] === 'update' ?'修改文章':getMenuItemInMenuListByProperty(
            menuConfig,
            "key",
            pathname
        ).label;
        setTitle(label);
    });
    return (
        <div
            style={{
                width: "100%",
                height: "57px",
                borderBottom: "1px solid #cccccc",
                margin: "0 -24px 14  px -24px",
                fontSize:'16px',
                fontWeight:'400',
                lineHeight:'57px',
                paddingLeft:'2rem'
            }}
        >{title}</div>
    );
};

export default Index;

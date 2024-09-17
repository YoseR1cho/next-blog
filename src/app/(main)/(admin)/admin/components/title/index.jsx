import React, { useEffect, useState } from "react";
import menuConfig from "@/utils/menuConfig";

import { usePathname } from "next/navigation";
import { getMenuItemInMenuListByProperty } from "@/utils";
import { Collapse } from "antd";

const styles = {
    width: "100%",
    border: "0",
    borderBottom: "1px solid #efefef",
    margin: "0 -24px 14  px -24px",
    fontSize: "18px",
    fontWeight: "800",
    lineHeight: "57px",
    paddingLeft: "2rem",
    borderRadius: "0",
    backgroundColor: "#ffffff",
};

const Index = ({ isCollapsed = false, extra = <></> }) => {
    const pathname = usePathname();
    const [title, setTitle] = useState("首页");

    useEffect(() => {
        const label =
            pathname.split("/")[3] === "update"
                ? "修改文章"
                : getMenuItemInMenuListByProperty(menuConfig, "key", pathname)
                      .label;
        setTitle(label);
    });

    const items = [
        {
            key: "1",
            label: title,
            children: extra,
        },
    ];

    return (
        <>
            {isCollapsed ? (
                <Collapse
                    style={styles}
                    defaultActiveKey={["1"]}
                    items={items}
                    ghost={true}
                />
            ) : (
                <div style={{ ...styles, height: "57px" }}>{title}</div>
            )}
        </>
    );
};

export default Index;

import React, { useEffect, useState } from "react";
import styles from "@/app/(main)/(admin)/admin/page.module.scss";
import menuConfig from "@/utils/menuConfig";
import { Menu } from "antd";
import { usePathname, useRouter } from "next/navigation";
import { getMenuItemInMenuListByProperty } from "@/utils";
import { addTag, emptyTagList } from "@/store/tagsView/actionCreators";
import { useDispatch } from "react-redux";

const Index = () => {
    const [openKey, setOpenKey] = useState("/admin");
    const router = useRouter();
    const pathname = usePathname();
    const dispatch = useDispatch();

    const menuClick = e => {
        // 点击跳转到对应路由    编程式导航
        router.push(e.key);
        handleMenuSelect(e.key);
    };

    const handleMenuSelect = (key = "/admin") => {
        if (key === "/home") {
            dispatch(emptyTagList());
            return;
        }

        const path =
            key.split("/")[3] === "update"
                ? "/admin/article/publish"
                : pathname;
        const menuItem = getMenuItemInMenuListByProperty(
            menuConfig,
            "key",
            path
        );

        dispatch(addTag(menuItem));
    };

    useEffect(() => {
        handleMenuSelect(pathname);
    });

    return (
        <Menu
            className={styles.menu}
            theme="dark"
            mode="inline"
            items={menuConfig}
            onClick={menuClick}
            selectedKeys={[pathname]}
        />
    );
};

export default Index;

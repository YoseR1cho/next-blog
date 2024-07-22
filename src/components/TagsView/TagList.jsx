import React, { useRef, useEffect, useState } from "react";
import styles from "./style.module.scss";

import {  useDispatch, useSelector } from "react-redux";
import {
    deleteTag,
    emptyTagList,
    closeOtherTags,
} from "@/store/tagsView/actionCreators";
import { Scrollbars } from "react-custom-scrollbars";
import { Tag } from "antd";
import { usePathname, useRouter } from "next/navigation";

const TagList = () => {
    const [position, setPosition] = useState({ left: 0, top: 0 });
    const [menuVisible, setMenuVisible] = useState(false);
    const [currentTag, setCurrentTag] = useState();

    const tagListContainer = useRef();
    const contextMenuContainer = useRef();
    const router = useRouter();
    const { tagList } = useSelector(store => store.tagsView);
    const currentPath = usePathname();
    const dispatch = useDispatch();

    const handleClose = tag => {
        const path = tag.key;
        const length = tagList.length;
        // 如果关闭的是当前页，跳转到最后一个tag
        if (path === currentPath) {
            router.push(tagList[length - 1].key);
        }
        // 如果关闭的是最后的tag ,且当前显示的也是最后的tag对应的页面，才做路由跳转
        if (
            path === tagList[length - 1].key &&
            currentPath === tagList[length - 1].key
        ) {
            // 因为cutTaglist在最后执行，所以跳转到上一个tags的对应的路由，应该-2
            if (length - 2 > 0) {
                router.push(tagList[length - 2].key);
            } else if (length === 2) {
                router.push(tagList[0].key);
            }
        }

        // 先跳转路由，再修改state树的taglist
        dispatch(deleteTag(tag));
    };

    const handleClick = path => {
        router.push(path);
    };
    const openContextMenu = (tag, event) => {
        console.log(tag);
        event.preventDefault();
        const menuMinWidth = 105;
        const clickX = event.clientX;
        const clickY = event.clientY; //事件发生时鼠标的Y坐标
        const clientWidth = tagListContainer.current?.clientWidth; // container width
        const maxLeft = clientWidth - menuMinWidth; // left boundary

        // 当鼠标点击位置大于左侧边界时，说明鼠标点击的位置偏右，将菜单放在左边
        if (clickX > maxLeft) {
            setPosition({ left: clickX - menuMinWidth + 15, top: clickY });
        } else {
            // 反之，当鼠标点击的位置偏左，将菜单放在右边
            setPosition({ left: clickX, top: clickY });
        }
        setMenuVisible(true);
        setCurrentTag(tag);
    };
    const handleClickOutside = event => {
        const isOutside = !(
            contextMenuContainer.current &&
            contextMenuContainer.current.contains(event.target)
        );

        if (isOutside && menuVisible) {
            closeContextMenu();
        }
    };
    const closeContextMenu = () => {
        setMenuVisible(false);
    };

    const handleCloseAllTags = () => {
        dispatch(emptyTagList());
        router.push("/admin");
        closeContextMenu();
    };
    const handleCloseOtherTags = () => {
        const { key } = currentTag;
        dispatch(closeOtherTags(currentTag));
        router.push(key);
        closeContextMenu();
    };

    useEffect(() => {
        document.body.addEventListener("click", handleClickOutside);

        return () =>
            document.body.removeEventListener("click", handleClickOutside);
    }, []);

    return (
        <>
            <Scrollbars
                autoHide
                autoHideTimeout={1000}
                autoHideDuration={200}
                hideTracksWhenNotNeeded={true}
                renderView={props => (
                    <div {...props} className={styles.scrollbar_container} />
                )}
                universal={true}
                renderTrackVertical={props => (
                    <div
                        {...props}
                        className={styles.scrollbar_track_vertical}
                    />
                )}
            >
                <ul className={styles.tags_wrap} ref={tagListContainer}>
                    {tagList?.map(tag => (
                        <li key={tag.key}>
                            <Tag
                                onClose={()=>handleClose(tag)}
                                closable={tag.key !== "/admin"}
                                color={
                                    currentPath === tag.key
                                        ? "geekblue"
                                        : "gold"
                                }
                                onClick={()=>handleClick(tag.key)}
                                onContextMenu={(e)=>openContextMenu(tag,e)}
                            >
                                {tag.label}
                            </Tag>
                        </li>
                    ))}
                </ul>
            </Scrollbars>
            {menuVisible ? (
                <ul
                    className={styles.contextmenu}
                    style={{ left: `${position.left}px`, top: `${position.top}px` }}
                    ref={contextMenuContainer}
                >
                    <li onClick={handleCloseOtherTags}>关闭其他</li>
                    <li onClick={handleCloseAllTags}>关闭所有</li>
                </ul>
            ) : null}
        </>
    );
};
export default TagList;

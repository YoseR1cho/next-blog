import React from 'react'
import { Anchor } from 'antd'
import {translateMarkdowntoHtml} from "@/utils";

// 根据 article 来生成锚点列表
function getAnchorList(str) {
    const pattern = /<(h[1-6])[\s\S]+?(?=<\/\1>)/g
    const list = []
    function pushItem(arr, item) {
        const len = arr.length
        const matchItem = arr[len - 1]
        if (matchItem && matchItem.tag !== item.tag) {
            pushItem(matchItem.children, item)
        } else {
            arr.push(item)
        }
    }
    str.replace(pattern, ($0, $1) => {
        const title = $0.replace(/.*?>/, '')
        const startIndex = $0.indexOf('"')
        const endIndex = $0.indexOf('">')

        const href = `#${$0.slice(startIndex + 1, endIndex)}`
        const currentItem = {
            tag: $1, // 标签类型
            title,
            href,
            children: []
        }
        pushItem(list, currentItem)
    })
    return list
}

const Navigation = ({ content }) => {
    const newContent = translateMarkdowntoHtml(content)
    const list = getAnchorList(newContent)

    function renderLink({ href, title, children }) {
        return {
            href,
            title,
            children,
            key:href
        }
    }

    let newList = list.map(renderLink)


    return <Anchor items={newList}></Anchor>
}

export default Navigation

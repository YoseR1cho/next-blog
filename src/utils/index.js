import {marked} from 'marked'
import xss from 'xss'
import {COLOR_LIST} from "@/utils/config";

export const randomIndex = arr => Math.floor(Math.random() * arr.length)

export const translateMarkdowntoHtml = plainContent=>{
    const isGuardXss = false;
    const renderer = {
        heading(text,level){
            const realLevel = level;
            return `<h${realLevel} id="${text}">${text}</h${realLevel}>`;
        }
    }

    marked.use({renderer:renderer});

    return marked.parse(isGuardXss?xss(plainContent):plainContent)
}

// 获取 url query 参数
export const decodeQuery = url => {
    const params = {}
    const paramsStr = url.replace(/\.*\?/, '') // a=1&b=2&c=&d=xxx&e
    paramsStr.split('&').forEach(v => {
        const d = v.split('=')
        if (d[1] && d[0]) params[d[0]] = d[1]
    })
    return params   // {params[a]=1,params[b]=2,params[d]=xxx}
}

// 生成 color
export function generateColor(list = [], colorList = COLOR_LIST) {
    const _list = [...list]
    _list.forEach((l, i) => {
        l.color = colorList[i] || colorList[randomIndex(colorList)]
    })
    return _list;
}

export function tagTranslate(obj,tags){
    let newTags = obj.tags.map(item=>{
        for(let i of tags){
            if(i.name===item)   return i.id;
        }
    })
    let newObj = {
        ...obj,
        tags:newTags
    }
    return newObj;
}

export function idTranslate2Tag(ids,tags){
    let newTags = ids.map(item=>{
        for(let i of tags){
            if(i.id===item)   return i.name;
        }
    })
    return newTags;
}

// 第一个参数是需要进行防抖处理的函数，第二个参数是延迟时间，默认为1秒钟
export function debounce(fn, delay = 1000) {
// 实现防抖函数的核心是使用setTimeout
    // time变量用于保存setTimeout返回的Id

    let time = null

    // 将回调接收的参数保存到args数组中
    function _debounce(...args) {
        // 如果time不为0，也就是说有定时器存在，将该定时器清除
        if (time !== null) {
            clearTimeout(time)
        }

        time = setTimeout(() => {
            // 使用apply改变fn的this，同时将参数传递给fn
            fn.apply(this, args)
        }, delay)
    }

    // 防抖函数会返回另一个函数，该函数才是真正被调用的函数
    return _debounce
}

// interval 间隔时间，也就是cd的长短
export function throttle(fn, interval=1000) {
    //该变量用于记录上一次函数的执行事件
    let lastTime = 0

    const _throttle = function(...args) {
        // 获取当前时间
        const nowTime = new Date().getTime()

        // cd剩余时间
        const remainTime = nowTime - lastTime
        // 如果剩余时间大于间隔时间，也就是说可以再次执行函数
        if (remainTime - interval >= 0) {
            fn.apply(this, args)
            // 将上一次函数执行的时间设置为nowTime，这样下次才能重新进入cd
            lastTime = nowTime
        }
    }
    // 返回_throttle函数
    return _throttle
}

export function runMiddleware(req, fn) {
    return new Promise((resolve, reject) => {
        fn(req, (result) => {
            if (result instanceof Error) {
                return reject(result)
            }

            return resolve(result)
        })
    })
}

export const normFile = (e=>{
    if(Array.isArray(e)){
        return e
    }
    return e && e.fileList;
})

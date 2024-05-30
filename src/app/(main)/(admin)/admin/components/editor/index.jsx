import '@toast-ui/editor/dist/toastui-editor.css';
import React, {useState} from 'react';
import 'prismjs/themes/prism.css';
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
import '@toast-ui/editor/dist/i18n/zh-cn'
import { Editor } from '@toast-ui/react-editor';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight-all.js';
import {message} from "antd";
import {uploadImg} from "@/utils/api";
import Spin from "@/components/spin";

const MyEditor =({onchange,editorRef}) => {
    const [loading,setLoading] = useState(false)

    const uploadImage = async(e,cb)=>{
        setLoading(true)
        try {
            // 将图片上传到服务器
            const form = new FormData()
            form.append('file',e)
            const res = await uploadImg(form)

            // 获取图片在服务器的url并执行回调回显到editor中
            const {url,filename} = res.data
            await cb(url,filename)
            setLoading(false)
        }catch (e){
            message.error('上传图片失败!')
            setLoading(false)
        }
    }

    return (
        <div>
            <Editor
                previewStyle="vertical"
                height="520px"
                placeholder='在此编辑您的文章'
                useCommandShortcut={true}
                plugins={[codeSyntaxHighlight]}
                ref={editorRef}
                onChange={onchange}
                hooks={{addImageBlobHook:uploadImage}}
                language={'zh-CN'}
            />
            <Spin loading={loading}/>
        </div>
    )
}

export default MyEditor;

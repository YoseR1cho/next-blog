import '@toast-ui/editor/dist/toastui-editor.css';
import React, {useEffect} from 'react';
import 'prismjs/themes/prism.css';
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
import { Editor } from '@toast-ui/react-editor';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight-all.js';

const MyComponent = ({editorRef,onchange}) => {

    return (
        <div>
            <Editor
                previewStyle="vertical"
                height="520px"
                placeholder='请编写您的文章'
                useCommandShortcut={true}
                plugins={[codeSyntaxHighlight]}
                ref={editorRef}
                onChange={onchange}
            />
        </div>
    )
}

export default MyComponent;

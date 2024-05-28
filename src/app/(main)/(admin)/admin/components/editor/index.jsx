import '@toast-ui/editor/dist/toastui-editor.css';
import React, {forwardRef} from 'react';
import 'prismjs/themes/prism.css';
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
import { Editor } from '@toast-ui/react-editor';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight-all.js';

const MyComponent = forwardRef(function MyComponent({onchange},ref)  {

    return (
        <div>
            <Editor
                previewStyle="vertical"
                height="520px"
                placeholder='请编写您的文章'
                useCommandShortcut={true}
                plugins={[codeSyntaxHighlight]}
                ref={ref}
                onChange={onchange}
            />
        </div>
    )
})

export default MyComponent;

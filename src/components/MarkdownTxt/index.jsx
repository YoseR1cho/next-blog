import React from 'react';
import Markdown from "react-markdown";
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import {oneLight} from "react-syntax-highlighter/dist/cjs/styles/prism";
import {headings} from "@/utils/config";
import Image from "next/image";

const Index = ({markdown}) => {
    return (
            <Markdown
                components={{
                    code(props) {
                        const {children, className, node, ...rest} = props
                        const match = /language-(\w+)/.exec(className || '')
                        return match ? (
                            <SyntaxHighlighter
                                {...rest}
                                PreTag="div"
                                language={match[1]}
                                style={oneLight}
                            >{String(children).replace(/\n$/, '')}</SyntaxHighlighter>
                        ) : (
                            <code {...rest} className={className}>
                                {children}
                            </code>
                        )
                    },
                    ...headings
                }}
            >{markdown}
            </Markdown>
    );
};

export default Index;

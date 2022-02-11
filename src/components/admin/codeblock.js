import styled from "styled-components"
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atelierLakesideDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const CodeBlockDiv = styled.div`
    border-radius: 4px;
    background-color: var(--grey9) !important;
    padding: 12px;
    margin-top: 8px;
    box-sizing: border-box;

    pre {
        background-color: var(--grey9) !important;
        border-radius: 4px;
        font-size: 14px;
    }
`

const CodeBlockTitleDiv = styled.div`
    box-sizing: border-box;
    width: 100%;
    color: #ffffff;
    display: flex;
    gap: 8px;
`

const CodeBlockTitle = styled.div`
    background-color: var(--grey8);
    padding: 8px 16px;
    border: 0;
    width: 100%;
    color: #ffffff;
    font-size: 14px;
`

export default function CodeBlock (props) {
    return (
        <CodeBlockDiv>
            <CodeBlockTitleDiv>
                <CodeBlockTitle>{props.title || 'title'}</CodeBlockTitle>
            </CodeBlockTitleDiv>
            <SyntaxHighlighter language="json" style={atelierLakesideDark}>
                {props.children || ""}
            </SyntaxHighlighter>
        </CodeBlockDiv>
    )
}
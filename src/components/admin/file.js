import styled from 'styled-components';
import { useState } from 'react'

const Div = styled.div`
    display: flex;
    width: 100%;
    box-sizing: border-box;
    flex-direction: column;
    background-color: var(--grey1);
    border-radius: 8px;
    text-decoration: none;
    transition: 200ms;
`

const Info = styled.div`
    display: flex;
    width: 100%;
    box-sizing: border-box;
    align-items: center;
    justify-content: space-between;
    transition: 200ms;
    padding: 8px 16px;
    border-radius: 8px 8px 0px 0px;
    user-select: none;

    & > div {
        gap: 8px;
        display: flex;
        align-items: center;
    }
`

const Id = styled.span`
    color: var(--grey5);
    font-size: 12px;
`

const Name = styled.span`
    font-size: 14px;
`

const Btn = styled.span`
    color: ${props => props.active ? 'var(--blue7)' : 'var(--teal5)'};
    font-size: 14px;
    text-decoration: underline;
    cursor: pointer;
`

const A = styled.a`
    color: var(--teal5);
    font-size: 14px;
`

function humanFileSize(size) {
    var i = Math.floor( Math.log(size) / Math.log(1024) );
    return ( size / Math.pow(1024, i) ).toFixed(2) * 1 + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i];
};

export default function NotionMapItem(props) {
    const [ isCopied, setCopied ] = useState(false)

    const copyLink = () => {
        setCopied(true)
        setTimeout(() => {
            setCopied(false)
        }, 1000)
        navigator.clipboard.writeText(`${process.env.REACT_APP_STATIC_SERVER}/${props.Key}`);
    }

    return (
        <Div>
            <Info>
                <div>
                    <Name>{props.Key}</Name>
                    <Id>{humanFileSize(props.Size)} | {new Date(props.LastModified).toLocaleString()}</Id>
                </div>
                <div>
                    <Btn onClick={copyLink} active={isCopied}>복사</Btn>
                    <Btn onClick={() => props.onClick()}>선택</Btn>
                    <A href={`${process.env.REACT_APP_STATIC_SERVER}/${props.Key}`} target={'_blank'}>열기</A>
                </div>
            </Info>
        </Div>
    )
}
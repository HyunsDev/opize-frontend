import styled from 'styled-components';

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
    cursor: pointer;
    border-radius: 8px 8px 0px 0px;
    user-select: none;

    &:hover {
        background-color: var(--grey2);
    }

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

const Email = styled.span`
    color: var(--teal5);
    font-size: 14px;
`

export default function NotionMapItem(props) {
    return (
        <Div>
            <Info onClick={() => props.onClick()}>
                <div>
                    <Name>{props.newUrl}</Name>
                    <Id>{props.count}</Id>
                </div>
                <div>
                    <Email>{props.notionId}</Email>
                </div>
            </Info>
        </Div>
    )
}
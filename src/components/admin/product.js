import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';


const ProjectDiv = styled.div`
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
    justify-content: center;
    display: flex;
    flex-direction: column;
`

const InfoDesc =styled.div`
    color: var(--grey6);
    font-size: 14px;
`

const Name = styled.div`
    color: var(--grey9);
    font-size: 20px;
    font-weight: 800;
    display: flex;
    align-items: center;

    span {
        margin-left: 4px;
        color: var(--teal5);
        font-size: 14px;
    }
`

const Desc = styled.div`
    background-color: var(--grey9);
    color: var(--grey4);
    font-size: 14px;
    flex-direction: column;
    gap: 4px;
    display: flex;
    border-radius: 0 0 8px 8px;
    
    overflow-y: hidden;
    visibility : ${props => props.isFold ? 'hidden' : 'visible'};
    max-height: ${props => props.isFold ? '0px' : '400px'};
    padding: ${props => props.isFold ? '0 20px' : '20px'};
    opacity: ${props => props.isFold ? 0 : 1};
    transition: 200ms;

    p {
        word-break: break-all;
        span {
            color: var(--teal5);
        }
    }
`

const IconDiv = styled.div`
    width: 52px;
    height: 52px;
    box-sizing: border-box;
    border-radius: 40px;
    background-color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
        height: 36px;
        width: 36px
    }
`
const ProjectInfo = styled.div`
    display: flex;
    width: 100%;
    box-sizing: border-box;
    gap: 16px;
    transition: 200ms;
    padding: 20px;
    cursor: pointer;
    user-select: none;
    border-radius: 8px 8px 0px 0px;
    &:hover {
        background-color: var(--grey2);
    }
`

const A = styled(Link)`
    color: var(--teal5);
    
`

const Options = styled.div`
    justify-content: end;
    display: flex;
    gap: 8px;
`

export default function Project(props) {
    const [ isFold, setFold ] = useState(true)

    return (
        <ProjectDiv>
            <ProjectInfo onClick={() => setFold(!isFold)}>
                <IconDiv>
                    <img src={props.icon} alt={props.name} />
                </IconDiv>
                <Info>
                    <Name>{props.name}<span>{props.code}</span></Name>
                    <InfoDesc>{props.desc}</InfoDesc>
                </Info>
            </ProjectInfo>
            <Desc isFold={isFold}>
                {
                    Object.keys(props).map((e, i) => (<p key={i}><span>{e}</span>: {JSON.stringify(props[e])}</p>))
                }
                <Options key='option'>
                    <A to={`/admin/project/product/edit?projectCode=${props.projectCode}&productCode=${props.code}`}>편집</A>
                </Options>
            </Desc>
        </ProjectDiv>
    )
}
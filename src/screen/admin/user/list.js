import { useContext, useState, useEffect } from 'react';
import { UserContext } from "../../../context/user";
import styled from 'styled-components';
import instance from '../../../src/instance';

import Search from '../../../components/inputs/search';

const Services = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-top: 8px;
`

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
    border-radius: 8px 8px 0px 0px;
    &:hover {
        background-color: var(--grey2);
    }
`

const Project = (props) => {
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
                    Object.keys(props).map(e => (<p><span>{e}</span>: {props[e]}</p>))
                }
            </Desc>
        </ProjectDiv>
    )
}

export default function List(props) {
    const [ searchText, setSearchText ] = useState('')
    const [ projects, setProjects ] = useState({});

    useEffect(() => {
        (async () => {
            try {
                const res = await instance.get('/project')
                console.log(res.data)
                setProjects(res.data)
            } catch (err) {
                console.error(err)
            }
        })()
    }, [setProjects])

    const searchInput = (e) => {
        setSearchText(e.target.value)
    }

    return (
        <>
            <Search value={searchText} onChange={searchInput} />
            <Services>
                {
                    Object.values(projects).filter(e => {
                        if (searchText === "") return true
                        console.log(e)
                        if (e.name.toUpperCase().includes(searchText.toUpperCase())) return true
                        if (e.desc.toUpperCase().includes(searchText.toUpperCase())) return true
                        return false
                    }).map(e => (
                        <Project {...e} key={e.name} />
                    ))
                }
            </Services>
        </>
    )
}


import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import instance from '../../src/instance';


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

const Detail = styled.div`
    background-color: var(--grey9);
    color: var(--grey4);
    font-size: 14px;
    flex-direction: column;
    gap: 4px;
    display: flex;
    border-radius: 0 0 8px 8px;
    
    overflow-y: hidden;
    visibility : ${props => props.isFold ? 'hidden' : 'visible'};
    max-height: ${props => props.isFold ? '0px' : 'auto'};
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

const A = styled(Link)`
    color: var(--teal5);
    text-align: right;
`

export function User(props) {
    const [ isFold, setFold ] = useState(true)
    const [ user, setUser ] = useState({})

    const getUser = async () => {
        if (isFold) {
            try {
                const res = await instance.get(`/admin/user/${props.id}`)
                setUser(res.data)
                setFold(false)
            } catch (err) {
                toast.error(err)
                if (err.response) {
                    console.error(err.response)
                } else {
                    console.error(err)
                }
            }
        } else {
            setUser({})
            setFold(true)
        }
    }

    return (
        <Div>
            <Info onClick={() => getUser()}>
                <div>
                    <Name>{props.name}</Name>
                    <Id>{props.id}</Id>
                </div>
                <div>
                    <Email>{props.email}</Email>
                </div>
            </Info>
            <Detail isFold={isFold}>
                {
                    Object.keys(user).map((e, i) => (<p key={i}><span>{e}</span>: {JSON.stringify(user[e])}</p>))
                }
                <A key='edit' to={`/admin/user/edit?userId=${props.id}`}>편집</A>
            </Detail>
        </Div>
    )
}
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import instance from '../../../src/instance';
import { useForm, Controller } from "react-hook-form";
import { toast } from 'react-toastify';

import { User } from '../../../components/admin/user';
import CodeBlock from '../../../components/admin/codeblock'
import { useNavigate, useSearchParams } from 'react-router-dom';

const Divver = styled.div`
    margin-top: 16px;
`

const Header = styled.div`
    margin-top: 16px;
    padding-bottom: 4px;
    font-size: 16px;
    border-bottom: solid 1px var(--grey1);
`

export default function Create(props) {
    const [searchParams] = useSearchParams();
    const [ userId, setUserId ] = useState(searchParams.get('userId'))
    const [ originalData, setOriginalData ] = useState({})
    const navigate = useNavigate()

    useEffect(() => {
        setUserId(searchParams.get('userId'))
    }, [searchParams, setUserId])

    useEffect(() => {
        (async () => {
            if (userId) {
                try {
                    const res = await instance.get(`/admin/user/${userId}/detail`)
                    setOriginalData(res.data)
                    console.log(res.data)
                } catch (err) {
                    console.error(err)
                }
            } else {
                navigate('/admin/user')
                toast.info('리스트에서 조회할 유저를 선택하세요.')
            }
        })()
    }, [userId, navigate])

    return (
        <Divver>
            <User id={userId} {...originalData.user} />
            <Header>user (유저)</Header>
            <CodeBlock title={`Payment ${originalData?.user?._id}`}>{JSON.stringify(originalData?.user, null, 2)}</CodeBlock>
            <Header>Payment (결제 수단)</Header>
            {
                originalData?.payment?.map((e, i) => (<CodeBlock title={`Payment ${e._id}`} key={i}>{JSON.stringify(e, null, 2)}</CodeBlock>))
            }
            <Header>paymentLog (결제 로그)</Header>
            {
                originalData?.paymentLog?.map((e, i) => (<CodeBlock title={`paymentLog ${e._id}`} key={i}>{JSON.stringify(e, null, 2)}</CodeBlock>))
            }
            <Header>subscribe (구독)</Header>
            {
                originalData?.subscribe?.map((e, i) => (<CodeBlock title={`subscribe ${e._id}`} key={i}>{JSON.stringify(e, null, 2)}</CodeBlock>))
            }
        </Divver>
    )
}
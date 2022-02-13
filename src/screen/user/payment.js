import { useContext, useState, useEffect } from 'react';
import { UserContext } from "../../context/user";
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { useForm, Controller } from "react-hook-form";

import RowMenu from '../../components/row/rowMenu';
import { H2 } from '../../components/title/title';
import { Card } from '../../components/card';
import { loadTossPayments } from '@tosspayments/payment-sdk'
import instance from '../../src/instance';
import Subscribe from '../../components/block/subscribe';

const RowMenus = styled.div`
    display: flex;
    gap: 30px;
    margin-top: 32px;
    width: 100%;
    flex-direction: column;
`

const Items = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
    align-items: flex-end;
`

export default function User(props) {
    const { t } = useTranslation('translation')
    const { user, updateUser } = useContext(UserContext)
    const [ tossPayments, setTossPayments ] = useState() 
    const [ searchParams ] = useSearchParams()
    const [ card, setCard ] = useState({});
    const navigate = useNavigate()

    useEffect(() => {
       setCard(user.payments?.[0])
    }, [user])

    // 토스 페이먼트 가져오기
    useEffect(() => {
        (async () => {
            setTossPayments(await loadTossPayments(process.env.REACT_APP_TOSS_CLIENT_KEY))
        })()
    }, [])

    // 토스 카드 등록 후 처리
    useEffect(() => {
        const authKey = searchParams.get('authKey')
        const customerKey = searchParams.get('customerKey')
        if (authKey && customerKey && user.email === customerKey) {
            // 등록 성공
            ;(async () => {
                try {
                    navigate('/user/payment')
                    await instance.post(`/billing`, {
                        customerKey,
                        authKey
                    })
                    updateUser()
                } catch (err) {
                    if (err.response) {
                        if (err.response.data.code === "user_not_found") {
                            toast.error(t('err_user_not_found'))
                        } else if (err.response.data.code === "token_expired") {
                            navigate("/login")
                        } else if (err.response.data.code === "invalid_token") {
                            toast.error(t('err_invalid_token'))
                        } else {
                            console.error(err)
                            toast.error(err.message)
                        }
                    } else {
                        console.error(err)
                        toast.error(err.message)
                    }
                }
            })()
        } else if (searchParams.get('code') && searchParams.get('message')) {
            // 등록 실패
            toast.warn(searchParams.get('message'))
        }
    }, [card, navigate, searchParams, t, user.email, updateUser])

    // 카드 등록
    const addCard = () => {
        if (tossPayments) {
            tossPayments.requestBillingAuth('카드', {
                customerKey: user.email,
                successUrl: `${process.env.REACT_APP_HOST}/user/payment`,
                failUrl: `${process.env.REACT_APP_HOST}/user/payment`,
                customerEmail: user.email
            })
        }
    }

    return (
        <>
            <RowMenus>
                <RowMenu name={t('user_payment_card')}>
                    <div />
                    <Items>
                        <Card {...card} onClick={addCard} cardInfo={user.email}/>
                    </Items>
                </RowMenu>
                <div>
                    <H2>{t('user_payment_subscribe')}</H2>
                    <Items>
                        {
                            user?.subscribes?.map((e, i) => <Subscribe projectCode={e.product.code} key={i} {...e} />)
                        }
                    </Items>
                </div>
            </RowMenus>
        </>
    )
}
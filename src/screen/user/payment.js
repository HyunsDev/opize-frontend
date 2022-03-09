import { useContext, useState, useEffect } from 'react';
import { UserContext } from "../../context/user";
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import dayjs from "dayjs";
import { loadTossPayments } from '@tosspayments/payment-sdk'
import instance from '../../src/instance';
import { useNavigate, useSearchParams } from 'react-router-dom';
import OpizeLogo from '../../assets/opize.png'

import { Card, HorizonLayout, VerticalLayout, SubscribeBlock } from 'opize-components'
import { Pause, Play } from 'phosphor-react';


const HorizonLayouts = styled.div`
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

function Subscribe(props) {
    const { t } = useTranslation('translation')
    const { user, updateUser } = useContext(UserContext)
    const navigate = useNavigate()

    const unsubscribe = async () => {
        try {
            await instance.post(`/subscribe/${props.subscribeId}/unsubscribe`, {})
            toast.info(t('user_payment_subscribe_unsubscribe_toast', {date: dayjs(props.nextPaymentDate).format('YYYY.MM.DD')}))
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
    }

    const resubscribe = async () => {
        try {
            await instance.post(`/subscribe`, {
                projectCode: props.project.code,
                productCode: props.product.code,
            })
            updateUser()
            toast.info(t('user_payment_subscribe_resubscribe_toast'))
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
    }

    return (
        <SubscribeBlock {...props}
            onClick={props.status !== "unsubscribed" ? unsubscribe : resubscribe} 
            btnIcon={props.status !== "unsubscribed" ? <Pause size={32} color="var(--teal5)" /> : <Play size={32} color="var(--red5)" />}
            desc1={props.status !== "unsubscribed"
                ? <>{props.product.prices[user.currency]}{user.currency}</>
                : <></>
            }
            desc2={props.status !== "unsubscribed"
                ? <>{t('user_payment_subscribe_next_payment')} {dayjs(props.nextPaymentDate).format('YYYY.MM.DD')}</>
                : <>{t('user_payment_subscribe_unsubscribe_date')} {dayjs(props.nextPaymentDate).format('YYYY.MM.DD')}</>
            }
        />
    )
}

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
            <HorizonLayouts>
                <HorizonLayout label={t('user_payment_card')}>
                    <div />
                    <Items>
                        <Card {...card} cardLogo={OpizeLogo} onClick={addCard} cardInfo={user.email}/>
                    </Items>
                </HorizonLayout>
                <VerticalLayout label={t('user_payment_subscribe')}>
                    <Items>
                        {
                            user?.subscribes?.map((e, i) => <Subscribe projectCode={e.product.code} key={i} {...e} />)
                        }
                    </Items>
                </VerticalLayout>
            </HorizonLayouts>
        </>
    )
}
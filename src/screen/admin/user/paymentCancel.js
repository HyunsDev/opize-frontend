import { useState, useEffect } from 'react';
import styled from 'styled-components';
import instance from '../../../src/instance';
import { toast } from 'react-toastify';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Receipt } from 'phosphor-react';

import { CodeBlock, SubscribeBlock, Button, TextField } from 'opize-components'


const Divver = styled.div`
    margin-top: 16px;
    display: flex;
    flex-direction: column;
    gap: 8px;
`

const Btns = styled.div`
    display: flex;
    justify-content: space-between;

    p {
        color: var(--red5);
        font-size: 14px;
    }
`

export default function PaymentCancel(props) {
    const [searchParams] = useSearchParams();
    const [ id, setId ] = useState(searchParams.get('paymentLogId'))
    const [ originalData, setOriginalData ] = useState({})
    const [ cancelReason, setCancelReason ] = useState("")
    const navigate = useNavigate()

    useEffect(() => {
        setId(searchParams.get('paymentLogId'))
    }, [searchParams, setId])

    useEffect(() => {
        (async () => {
            if (id) {
                try {
                    const res = await instance.get(`/admin/payment/${id}`)
                    setOriginalData(res.data)
                } catch (err) {
                    console.error(err)
                }
            } else {
                navigate('/admin/user')
                toast.info('리스트에서 조회할 유저를 선택하세요.')
            }
        })()
    }, [id, navigate])

    const refund = async () => {
        try {
            await instance.post(`/admin/payment/${id}/cancel`, {
                cancelReason
            })
            toast.info('결제 취소 성공')
        } catch (err) {
            toast.error(err.message)
            toast.error(err.response.data.code)
            console.error(err)
        }
    }

    return (
        <Divver>
            <SubscribeBlock {...originalData.paymentLog}
                product={originalData?.product || {icon: 'https://static.opize.me/opize.png', name: '존재하지 않는 상품입니다.'}}
                project={originalData?.project || {icon: 'https://static.opize.me/opize.png', name: '존재하지 않는 프로젝트입니다.'}}
                btnIcon={<Receipt size={32} color="var(--teal5)" />}
                onClick={() => window.open(originalData.paymentLog?.receiptUrl)}
                desc1={<>{originalData.paymentLog?.totalAmount}{originalData.paymentLog?.currency}</>}
                desc2={new Date(originalData.paymentLog?.approvedAt).toLocaleString()}
            />

            <CodeBlock
                size='mini'
                title={'paymentLog'}
                subtitle={`${originalData.paymentLog?.status} | ${originalData.paymentLog?.totalAmount}${originalData.paymentLog?.currency}`}
                desc={originalData?.paymentLog?._id}
                links={[
                    {text: '환불', to: `/admin/user/paymentCancel?paymentLogId=${originalData?.paymentLog?._id}`}
                ]}
            >
                {JSON.stringify(originalData, null, 4)}
            </CodeBlock>
            {originalData.paymentLog?.status === "DONE" ? <>
                <TextField value={cancelReason} onChange={e => setCancelReason(e.target.value)} placeholder="결제 취소 사유" />
                    <Btns>
                    <p>주의! 결제 취소는 결제한 금액만 취소할 뿐, 환불을 의미하지 않습니다.</p>
                    <Button color='teal' label="결제 취소" onClick={refund} />
                    </Btns>
                </> : <Btns><div /><p>결제 완료된 거래가 아닙니다. ({originalData.paymentLog?.status})</p></Btns>
            }
        </Divver>
    )
}
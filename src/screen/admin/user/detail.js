import { useState, useEffect } from 'react';
import styled from 'styled-components';
import instance from '../../../src/instance';
import { toast } from 'react-toastify';
import { useNavigate, useSearchParams } from 'react-router-dom';
import OpizeLogo from '../../../assets/opize.png'

import { CodeBlock, MiniCodeBlock, VerticalLayout } from 'opize-components'

const Divver = styled.div`
    margin-top: 16px;
`

const Blocks = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
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
            <CodeBlock
                title={originalData?.user?.name}
                icon={originalData?.user?.profileImage || OpizeLogo}
                subtitle={originalData?.user?.email}
                desc={originalData?.user?._id}
                links={[
                    { text: '자세한 정보', to: `/admin/user/detail?userId=${originalData?.user?._id}` },
                    { text: '편집', to: `/admin/user/edit?userId=${originalData?.user?._id}` },
                ]}>
                {JSON.stringify(originalData?.user, null, 4)}
            </CodeBlock>

            <VerticalLayout label="Payment (결제 수단)">
                <Blocks>
                    { originalData?.payment?.map((e, i) => (<MiniCodeBlock title={'payment'} subtitle={e.cardNumber} info={e._id} key={i}>{JSON.stringify(e, null, 4)}</MiniCodeBlock>)) }
                </Blocks>
            </VerticalLayout>

            <VerticalLayout label="subscribe (구독)">
                <Blocks>
                    { originalData?.subscribe?.map((e, i) => (<MiniCodeBlock title={'subscribe'} subtitle={e.productId} info={e._id} key={i}>{JSON.stringify(e, null, 4)}</MiniCodeBlock>)) }
                </Blocks>
            </VerticalLayout>

            <VerticalLayout label="paymentLog (결제 로그)">
                <Blocks>
                    { 
                        originalData?.paymentLog?.map((e, i) => (<MiniCodeBlock
                            title={'paymentLog'}
                            subtitle={`${e.status} | ${e.approvedAt}`}
                            info={e._id}
                            key={i}
                            links={[
                                {text: '환불', to: `/admin/user/paymentCancel?paymentLogId=${e._id}`}
                            ]}
                            >
                        {JSON.stringify(e, null, 4)}</MiniCodeBlock>))
                    }
                </Blocks>
            </VerticalLayout>
        </Divver>
    )
}
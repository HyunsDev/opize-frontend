import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import instance from '../../../src/instance';
import { toast } from 'react-toastify';

import { HorizontalLayout, ColorBtn, Input } from 'opize-components'

const Divver = styled.div`
    margin-top: 16px;
`

const TestCard = (props) => {
    const [isLoading, setLoading] = useState(false);
    const [ value, setValue ] = useState("")
    const { t } = useTranslation('translation')

    const onSubmit = async (data) => {
        if (!isLoading) {
            try {
                setLoading(true)
                await instance.post(`/admin/billing/test`, {
                    userId: value,
                });
                setLoading(false)
                setValue('')
                toast.info('테스트 카드를 추가했습니다.')
            } catch (err) {
                setLoading(false)
                if (err.response) {
                    if (err.response.data.code === "user_not_found") {
                        toast.error(t('err_user_not_found'))
                    } else if (err.response.data.code === "token_expired") {
                        toast.error(t('err_token_expired'))
                    } else if (err.response.data.code === "invalid_token") {
                        toast.error(t('err_invalid_token'))
                    } else if (err.response.data.code === "wrong_password") {
                        toast.error(t('err_wrong_password'))
                    } else {
                        toast.error(err.message)
                        console.error(err.response)
                    }
                } else {
                    toast.error(err.message)
                    console.error(err)
                }
                
            }
        }
    };

    return (
        <HorizontalLayout label={'테스트 카드'} marginTop={16}>
            <Input value={value || ""} onChange={e => setValue(e.target.value)} placeholder='유저 아이디' />
            <ColorBtn isLoading={isLoading} label='추가' onClick={onSubmit} />
        </HorizontalLayout>
    )
}

export default function Create(props) {

    return (
        <Divver>
            <TestCard />
        </Divver>
    )
}
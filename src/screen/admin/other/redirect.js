import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import instance from '../../../src/instance';
import { toast } from 'react-toastify';

import { HorizontalLayout, Btn, ColorBtn, Input, MiniClickableBlock, Search } from 'opize-components'

const Divver = styled.div`
    margin-top: 16px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-top: 8px;
`

const CreateLink = (props) => {
    const [isLoading, setLoading] = useState(false);
    const { t } = useTranslation('translation')

    const onSubmit = async (data) => {
        if (!isLoading) {
            try {
                setLoading(true)
                await instance.post(`/redirect`, {
                    newUrl: props.newUrl,
                    originalUrl: props.originalUrl,
                });
                setLoading(false)
                props.setOriginalUrl('')
                props.setNewUrl('')
                toast.info('링크를 생성/업데이트 했습니다.')
                props.updateUrl()
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

    const deleteRedirect = async (data) => {
        if (!isLoading) {
            try {
                setLoading(true)
                await instance.delete(`/redirect/${props.newUrl}`);
                setLoading(false)
                props.setOriginalUrl('')
                props.setNewUrl('')
                toast.info('링크를 삭제 했습니다.')
                props.updateUrl()
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
        <HorizontalLayout label={'리다이렉트'}>
            <Input value={props.originalUrl || ""} onChange={e => props.setOriginalUrl(e.target.value)} placeholder='원본 링크' />
            <Input value={props.newUrl || ""} onChange={e => props.setNewUrl(e.target.value)} placeholder='단축 링크' />
            <ColorBtn isLoading={isLoading} label='추가' onClick={onSubmit} />
            <Btn isLoading={isLoading} label='삭제' onClick={deleteRedirect} backgroundColor="var(--red1)" backgroundColorHover="var(--red2)" color="var(--red9)" />
        </HorizontalLayout>
    )
}


export default function Create(props) {
    const [ originalUrl, setOriginalUrl ] = useState("")
    const [ newUrl, setNewUrl ] = useState("")
    const [ urls, setUrls ] = useState([])
    const [ searchText, setSearchText ] = useState('')

    const { t } = useTranslation('translation')

    const updateUrl = useCallback(async () => {
        try {
            const res = await instance.get('/redirect')
            setUrls(res.data.urls)
        } catch (err) {
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
    }, [t])

    useEffect(() => {
        (async () => {
            await updateUrl()
        })()
    }, [updateUrl])

    return (
        <Divver>
            <CreateLink newUrl={newUrl} setNewUrl={setNewUrl} updateUrl={updateUrl} originalUrl={originalUrl} setOriginalUrl={setOriginalUrl} />
            <Search value={searchText} onChange={(e) => setSearchText(e.target.value)} />
            {
                urls.filter(e => {
                    if (searchText === "") return true
                    if (e.newUrl.toUpperCase().includes(searchText.toUpperCase())) return true
                    if (e.originalUrl.toUpperCase().includes(searchText.toUpperCase())) return true
                    return false
                }).map((e, i) => <MiniClickableBlock key={i}
                    title={e.newUrl}
                    subtitle={e.count}
                    info={e.originalUrl}
                    onClick={() => {
                        setNewUrl(e.newUrl)
                        setOriginalUrl(e.originalUrl)
                    }} 
                />)
            }
        </Divver>
    )
}
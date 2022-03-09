import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import instance from '../../../src/instance';
import { toast } from 'react-toastify';

import { MiniClickableBlock } from '../../../components/miniClickableBlock';
import { HorizonLayout, Button, TextField, Search } from 'opize-components'

const Divver = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`

const CreateLink = (props) => {
    const [isLoading, setLoading] = useState(false);
    const { t } = useTranslation('translation')

    const onSubmit = async (data) => {
        if (!isLoading) {
            try {
                setLoading(true)
                await instance.post(`/admin/banner`, {
                    code: props.code,
                    bannerUrl: props.bannerUrl,
                    to: props.to,
                });
                setLoading(false)
                props.setCode('')
                props.setTo('')
                props.setBannerUrl('')
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
                await instance.delete(`/admin/banner/${props.code}`);
                setLoading(false)
                props.setCode('')
                props.setTo('')
                props.setBannerUrl('')
                toast.info('배너를 삭제 했습니다.')
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
        <HorizonLayout label={'배너'} marginTop={16}>
            <TextField value={props.code || ""} onChange={e => props.setCode(e.target.value)} placeholder='코드' />
            <TextField value={props.to || ""} onChange={e => props.setTo(e.target.value)} placeholder='이동할 링크' />
            <TextField value={props.bannerUrl || ""} onChange={e => props.setBannerUrl(e.target.value)} placeholder='이미지 주소' />
            <Button isLoading={isLoading} label='추가' onClick={onSubmit} />
            <Button color='error' isLoading={isLoading} label='삭제' onClick={deleteRedirect} />
        </HorizonLayout>
    )
}

const BannerWrapper = styled.div`
    img {
        border: solid 1px var(--grey5);
        border-radius: 8px;
    }
`

export default function Create(props) {
    const [ code, setCode ] = useState("")
    const [ to, setTo ] = useState("")
    const [ bannerUrl, setBannerUrl ] = useState("")
    const [ urls, setUrls ] = useState([])
    const [ searchText, setSearchText ] = useState('')

    const { t } = useTranslation('translation')

    const updateUrl = useCallback(async () => {
        try {
            const res = await instance.get('/admin/banner')
            setUrls(res.data.banners)
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
            <CreateLink code={code} setCode={setCode} bannerUrl={bannerUrl} setBannerUrl={setBannerUrl} updateUrl={updateUrl} to={to} setTo={setTo} />
            <Search value={searchText} onChange={(e) => setSearchText(e.target.value)} />
            {
                urls.filter(e => {
                    if (searchText === "") return true
                    if (e.bannerUrl.toUpperCase().includes(searchText.toUpperCase())) return true
                    if (e.to.toUpperCase().includes(searchText.toUpperCase())) return true
                    return false
                }).map((e, i) => <MiniClickableBlock 
                    key={i}
                    title={e.code}
                    subtitle={e.to}
                    onClick={() => {
                        setCode(e.code)
                        setBannerUrl(e.bannerUrl)
                        setTo(e.to)
                    }}
                    ><BannerWrapper><a href={e.to}><img src={e.bannerUrl} alt="" /></a></BannerWrapper></MiniClickableBlock>)
            }
        </Divver>
    )
}
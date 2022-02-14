import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import instance from '../../../src/instance';
import { toast } from 'react-toastify';

import RowMenu from '../../../components/row/rowMenu';
import { Btn, ColorBtn } from '../../../components/btns/btns';
import Input from '../../../components/inputs/input';
import NotionMapItem from '../../../components/admin/notionMap';
import Search from '../../../components/inputs/search';

const Divver = styled.div`
    margin-top: 16px;
`

const CreateLink = (props) => {
    const [isLoading, setLoading] = useState(false);
    const { t } = useTranslation('translation')

    const onSubmit = async (data) => {
        if (!isLoading) {
            try {
                setLoading(true)
                await instance.post(`/notion/info`, {
                    newUrl: props.newUrl,
                    notionId: props.notionId,
                });
                setLoading(false)
                props.setNotionId('')
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
                await instance.delete(`/notion/info/${props.newUrl}`);
                setLoading(false)
                props.setNotionId('')
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

    const getNotionId = (e) => {
        return e.split('/')[e.split('/').length - 1].split('-')[e.split('/')[e.split('/').length - 1].split('-').length - 1].split("?")[0]
    }

    const notionIdChange = (e) => {
        if (e.target.value.includes('http')) {
            props.setNotionId(getNotionId(e.target.value))
        } else {
            props.setNotionId(e.target.value)
        }
    }

    return (
        <RowMenu name={'노션 맵'} marginTop={16}>
            <Input value={props.notionId || ""} onChange={notionIdChange} placeholder='노션 링크' />
            <Input value={props.newUrl || ""} onChange={e => props.setNewUrl(e.target.value)} placeholder='새 링크' />
            <ColorBtn isLoading={isLoading} text='추가' onClick={onSubmit} />
            <Btn isLoading={isLoading} text='삭제' onClick={deleteRedirect} background="var(--red1)" backgroundHover="var(--red2)" color="var(--red9)" />
        </RowMenu>
    )
}

const UrlsDiv = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-top: 8px;
`

export default function Create(props) {
    const [ notionId, setNotionId ] = useState("")
    const [ newUrl, setNewUrl ] = useState("")
    const [ urls, setUrls ] = useState([])
    const [ searchText, setSearchText ] = useState('')

    const { t } = useTranslation('translation')

    const updateUrl = useCallback(async () => {
        try {
            const res = await instance.get('/notion/info')
            setUrls(res.data.maps)
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
            <CreateLink newUrl={newUrl} setNewUrl={setNewUrl} updateUrl={updateUrl} notionId={notionId} setNotionId={setNotionId} />
            <Search value={searchText} onChange={(e) => setSearchText(e.target.value)} />
            <UrlsDiv>
                {
                    urls.filter(e => {
                        if (searchText === "") return true
                        if (e.newUrl.toUpperCase().includes(searchText.toUpperCase())) return true
                        if (e.notionId.toUpperCase().includes(searchText.toUpperCase())) return true
                        return false
                    }).map((e, i) => <NotionMapItem key={i} {...e} onClick={() => {
                        setNewUrl(e.newUrl)
                        setNotionId(e.notionId)
                    }} />)
                }
            </UrlsDiv>
        </Divver>
    )
}
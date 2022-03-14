import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import instance from '../../../src/instance';
import { toast } from 'react-toastify';

import { VerticalLayout, Table, Search } from 'opize-components'

const Divver = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-top: 8px;
`

export default function Create(props) {
    const [ urls, setUrls ] = useState([])
    const [ searchText, setSearchText ] = useState('')

    const { t } = useTranslation('translation')

    const removeCache = async (notionId) => {
        try {
            await instance.delete(`/notion/cache/${notionId}`);
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
        
    };

    const updateUrl = useCallback(async () => {
        try {
            const res = await instance.get('/notion/cache')
            setUrls(res.data.caches)
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
            <VerticalLayout label='노션 캐시'>
                <Search value={searchText} onChange={(e) => setSearchText(e.target.value)} />
                <Table 
                    column={['notionId', 'cachedAt', 'select']}
                    items={urls.filter(e => {
                        if (searchText === "") return true
                        if (e.notionId.toUpperCase().includes(searchText.toUpperCase())) return true
                        return false
                    }).map((e, i) => ({
                        notionId: e.notionId,
                        cachedAt: new Date(e.cachedAt).toLocaleString(),
                        select: {
                            type: 'button',
                            label: '삭제',
                            onClick: () => {
                                removeCache(e.notionId)
                                updateUrl()
                            }
                        }
                    }))}
                />
            </VerticalLayout>
        </Divver>
    )
}

// <MiniClickableBlock 
//     key={i}
//     title={e.notionId}
//     info={new Date(e.cachedAt).toLocaleString()}
//     onClick={() => {
//         setNotionId(e.notionId)
//     }}
// />
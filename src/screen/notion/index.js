import axios from "axios";
import { useEffect, useState } from "react";
import { NotionRenderer } from 'react-notion-x'
import { useTranslation } from 'react-i18next';
import styled from 'styled-components'
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

import {HeaderWrapper} from "../../components/HeaderWrapper";
import localforage from "localforage";
import dayjs from "dayjs";

const Div = styled.div`
    position: relative;
`

const NotionRendererDiv = styled.div`
`

const Notion = function (props) {
    const [page, setPage] = useState()
    const location = useLocation()
    const { t, i18n } = useTranslation('translation')

    useEffect(() => {
        (async () => {
            try {
                const pageId = props.id || location.pathname
        
                // localforage 이용
                const cacheResponse = await localforage.getItem(pageId)
                if (cacheResponse && dayjs(cacheResponse?.cachedAt) > dayjs().add(-1, 'minute')) {
                    // 캐시된 버전 사용
                    const responsePageId = cacheResponse.cache.pageId
                    const uuid = `${responsePageId.substr(0,8)}-${responsePageId.substr(8,4)}-${responsePageId.substr(12,4)}-${responsePageId.substr(16,4)}-${responsePageId.substr(20,12)}`
                    document.title = `${cacheResponse.cache?.block[uuid]?.value.properties.title[0][0] || ""} - Opize`
                    setPage(cacheResponse.cache)
                } else {
                    // 새로 캐시
                    const res = await axios.get(`${process.env.REACT_APP_API_SERVER}/notion?id=${pageId}`)
                    const responsePageId = res.data.pageId
                    const uuid = `${responsePageId.substr(0,8)}-${responsePageId.substr(8,4)}-${responsePageId.substr(12,4)}-${responsePageId.substr(16,4)}-${responsePageId.substr(20,12)}`
                    document.title = `${res.data?.block[uuid]?.value.properties.title[0][0] || ""} - Opize`
                    setPage(res.data)

                    // 기존 캐시가 10MB를 넘으면, 캐시 초기화
                    if ((await navigator.storage.estimate()).usageDetails.indexedDB > 30*1000*1000) {
                        console.log('캐시 한도 초과')
                        localforage.clear()
                    }

                    localforage.setItem(pageId, {
                        cachedAt: new Date().toISOString(),
                        cache: res.data
                    })
                }
            } catch (err) {
                if (err.response) {
                    console.error(err.response)
                    toast.error(err.message)
                } else {
                    console.error(err)
                    toast.error(err.message)
                }
            }
        })()

        return () => {
            setPage()
        }
    },[location, props.id, i18n.language])

    return (
        <>
            <Div>
                <HeaderWrapper />
                <NotionRendererDiv>
                    {page && <NotionRenderer recordMap={page} fullPage darkMode={false} disableHeader/>}
                </NotionRendererDiv>
            </Div>
        </>
    )
}

export default Notion
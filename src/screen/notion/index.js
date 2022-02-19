/* eslint-disable no-eval */
import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Collection, CollectionRow, NotionRenderer, Code } from 'react-notion-x'
import { getPageTitle } from 'notion-utils'
import { useTranslation } from 'react-i18next';
import styled from 'styled-components'
import { useLocation, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Spinner } from 'opize-components'

import {HeaderWrapper} from "../../components/HeaderWrapper";
import localforage from "localforage";
import dayjs from "dayjs";

const Div = styled.div`
    position: relative;

    .notion .notion-header {
        position: fixed;
        top: 4px;
        left: 100px;
        transition: 200ms;
        width: fit-content;
        background: transparent;

        .breadcrumb:hover {
            background: var(--greyPlaceholder)
        }
    }

    .notion .nav-header {
        position: relative;
        width: fit-content;
    }
`

const NotionRendererDiv = styled.div`
`

const CodeX = function(props) {
    switch (props.language) {
        case 'HTML':
            if (props.code.startsWith('<!-- opize -->')) {
                return <div dangerouslySetInnerHTML={{__html: props.code.replaceAll('\\x3', '<')}}></div>
            } else {
                return <Code {...props} />
            }
        case 'JavaScript':
            if (props.code.startsWith('// opize')) {
                const code = props.code.replaceAll('\\n', '\n');
                eval(code)
                return <></>
            } else {
                return <Code {...props} />
            }
        default:
            return <Code {...props} />
    }
}

const StyledLink = styled(Link)`
    text-decoration: none;
`

const LoadingDiv = styled.div`
    display: flex;
    position: fixed;
    opacity: ${props => props.isLoading ? 1 : 0};
    transition: 200ms;
    left: 30px;
    top: 76px;
    z-index: 999;
    width: 30px;
    height: 30px;
`

const LoadingBox = (props) => {
    return (
        <LoadingDiv isLoading={props.isLoading}>
            <Spinner color={'var(--grey9)'} size={32}/>
        </LoadingDiv>
    )
}

const Notion = function (props) {
    const [page, setPage] = useState()
    const location = useLocation()
    const [ isLoading, setLoading ] = useState(false)
    const { i18n } = useTranslation('translation')
    const [isTop, setIsTop] = useState(true)

    const onScroll = () => {
        setIsTop(window.scrollY === 0)
    }

    useEffect(() => {
        window.addEventListener('scroll', onScroll)
        return () => {
            window.removeEventListener('scroll', onScroll)
        }
    }, [])

    useEffect(() => {
        (async () => {
            try {
                const pageId = props.id || location.pathname
        
                // localforage 이용
                const cacheResponse = await localforage.getItem(pageId)
                if (cacheResponse && dayjs(cacheResponse?.cachedAt) > dayjs().add(-10, 'minute')) {
                    // 캐시된 버전 사용
                    setPage(cacheResponse.cache)
                    setLoading(false)
                } else {
                    // 새로 캐시
                    setLoading(true)
                    const res = await axios.get(`${process.env.REACT_APP_API_SERVER}/notion?id=${pageId}`)
                    setPage(res.data)
                    setLoading(false)

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
                setLoading(false)
                if (err.response) {
                    console.error(err.response)
                    toast.error(err.message)
                } else {
                    console.error(err)
                    toast.error(err.message)
                }
            }
        })()
    },[location, props.id, i18n.language, setPage])

    useEffect(() => {
        document.title = `${page ? `${getPageTitle(page)} - Opize` : 'Opize'}`
    }, [page])

    return (
        <>
            <Div isTop={isTop}>
                <HeaderWrapper />
                <LoadingBox isLoading={isLoading} />
                <NotionRendererDiv>
                    {page && <NotionRenderer
                        recordMap={page}
                        fullPage
                        darkMode={false}
                        // header={HeaderX}
                        // disableHeader
                        components={{
                            collection: Collection,
                            collectionRow: CollectionRow,
                            code: CodeX,
                            pageLink: ({
                                href,
                                as,
                                passHref,
                                prefetch,
                                replace,
                                scroll,
                                shallow,
                                locale,
                                ...props
                              }) => (
                                <StyledLink to={href} {...props} />
                              ),
                        }}
                    />}
                </NotionRendererDiv>
            </Div>
        </>
    )
}

export default Notion
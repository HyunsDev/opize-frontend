import axios from "axios";
import { useEffect, useState } from "react";
import { NotionRenderer } from 'react-notion-x'
import pageMap from '../../data/pageMap.json'
import { useTranslation } from 'react-i18next';
import styled from 'styled-components'
import { useLocation } from "react-router-dom";

import LandingHeader from "../../components/header/landingHeader";

const Div = styled.div`
    position: relative;
`

const NotionRendererDiv = styled.div`
`

const Notion = function (props) {
    const [page, setPage] = useState()
    const location = useLocation()
    const { i18n } = useTranslation('translation')

    
    useEffect(() => {
        (async () => {
            try {
                const pageId = props.id || pageMap[i18n.language][location.pathname] || location.pathname
                const res = await axios.get(`${process.env.REACT_APP_API_SERVER}/notion?id=${pageId}`)
                const uuid = `${pageId.substr(0,8)}-${pageId.substr(8,4)}-${pageId.substr(12,4)}-${pageId.substr(16,4)}-${pageId.substr(20,12)}`
                document.title = `${res.data?.block[uuid]?.value.properties.title[0][0] || ""} | Opize`
                setPage(res.data)
            } catch (err) {
                console.error(err)
            }
        })()
    },[location, props.id, i18n.language])

    return (
        <>
            <Div>
                <LandingHeader />
                <NotionRendererDiv>
                    {page && <NotionRenderer recordMap={page} fullPage darkMode={false} disableHeader/>}
                </NotionRendererDiv>
            </Div>
        </>
    )
}

export default Notion
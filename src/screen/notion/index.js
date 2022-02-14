import axios from "axios";
import { useEffect, useState } from "react";
import { NotionRenderer } from 'react-notion-x'
import { useTranslation } from 'react-i18next';
import styled from 'styled-components'
import { useLocation } from "react-router-dom";

import Header from "../../components/header/header";

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
                const pageId = props.id || location.pathname
                const res = await axios.get(`${process.env.REACT_APP_API_SERVER}/notion?id=${pageId}`)
                const responsePageId = res.data.pageId
                const uuid = `${responsePageId.substr(0,8)}-${responsePageId.substr(8,4)}-${responsePageId.substr(12,4)}-${responsePageId.substr(16,4)}-${responsePageId.substr(20,12)}`
                document.title = `${res.data?.block[uuid]?.value.properties.title[0][0] || ""} | Opize`
                setPage(res.data)
            } catch (err) {
                console.error(err)
            }
        })()

        return () => {
            setPage()
        }
    },[location, props.id, i18n.language])

    return (
        <>
            <Div>
                <Header />
                <NotionRendererDiv>
                    {page && <NotionRenderer recordMap={page} fullPage darkMode={false} disableHeader/>}
                </NotionRendererDiv>
            </Div>
        </>
    )
}

export default Notion
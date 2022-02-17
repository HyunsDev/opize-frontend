import { useState, useEffect } from 'react';
import styled from 'styled-components';
import instance from '../../../src/instance';

import { Search, CodeBlock } from 'opize-components'

const Divver = styled.div`
    margin-top: 8px;
`

const Services = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-top: 8px;
`

export default function List(props) {
    const [ searchText, setSearchText ] = useState('')
    const [ projects, setProjects ] = useState({});

    useEffect(() => {
        (async () => {
            try {
                const res = await instance.get('/project')
                setProjects(res.data)
            } catch (err) {
                console.error(err)
            }
        })()
    }, [setProjects])

    const searchInput = (e) => {
        setSearchText(e.target.value)
    }

    return (
        <Divver>
            <Search value={searchText} onChange={searchInput} />
            <Services>
                {
                    Object.values(projects).filter(e => {
                        if (searchText === "") return true
                        if (e.name.toUpperCase().includes(searchText.toUpperCase())) return true
                        if (e.code.toUpperCase().includes(searchText.toUpperCase())) return true
                        if (e.desc.toUpperCase().includes(searchText.toUpperCase())) return true
                        return false
                    }).map(e => (
                        <CodeBlock key={e.name}
                            icon={e.icon}
                            title={e.name}
                            subtitle={e.code}
                            desc={e.desc}
                            links={[
                                { text: '새로운 상품', to: `/admin/project/product/new?projectCode=${e.code}` },
                                { text: '상품', to: `/admin/project/product?projectCode=${e.code}` },
                                { text: '편집', to: `/admin/project/edit?projectCode=${e.code}` },
                            ]}
                        >{JSON.stringify(e, null, 4)}</CodeBlock>
                    ))
                }
            </Services>
        </Divver>
    )
}


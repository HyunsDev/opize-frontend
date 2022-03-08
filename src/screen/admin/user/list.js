import { useState, useEffect } from 'react';
import styled from 'styled-components';
import instance from '../../../src/instance';

import { CodeBlock, Search } from 'opize-components'

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
    const [ users, setUsers ] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const res = await instance.get('/admin/user')
                setUsers(res.data.users)
            } catch (err) {
                console.error(err)
            }
        })()
    }, [setUsers])

    const searchInput = (e) => {
        setSearchText(e.target.value)
    }

    return (
        <Divver>
            <Search value={searchText} onChange={searchInput} />
            <Services>
                {
                    users.filter(e => {
                        if (searchText === "") return true
                        if (e.name.toUpperCase().includes(searchText.toUpperCase())) return true
                        if (e.id.toUpperCase().includes(searchText.toUpperCase())) return true
                        if (e.email.toUpperCase().includes(searchText.toUpperCase())) return true
                        return false
                    }).map(e => (
                        <CodeBlock
                            size='mini'
                            icon={e.profileImage}
                            key={e.id}
                            title={e.name}
                            subtitle={e.id}
                            desc={e.email}
                            links={[
                                { text: '자세한 정보', to: `/admin/user/detail?userId=${e.id}` },
                                { text: '편집', to: `/admin/user/edit?userId=${e.id}` },
                            ]}
                        >{JSON.stringify(e, null, 4)}</CodeBlock>
                    ))
                }
            </Services>
        </Divver>
    )
}


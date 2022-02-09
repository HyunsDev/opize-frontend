import { useContext, useState, useEffect } from 'react';
import { UserContext } from "../../../context/user";
import styled from 'styled-components';
import instance from '../../../src/instance';

import { User } from '../../../components/admin/user';
import Search from '../../../components/inputs/search';

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
        <>
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
                        <User {...e} key={e.id} />
                    ))
                }
            </Services>
        </>
    )
}


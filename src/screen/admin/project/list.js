import { useState, useEffect } from 'react';
import styled from 'styled-components';
import instance from '../../../src/instance';

import Search from '../../../components/inputs/search';
import Project from '../../../components/admin/project'

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
        <>
            <Search value={searchText} onChange={searchInput} />
            <Services>
                {
                    Object.values(projects).filter(e => {
                        if (searchText === "") return true
                        console.log(e)
                        if (e.name.toUpperCase().includes(searchText.toUpperCase())) return true
                        if (e.code.toUpperCase().includes(searchText.toUpperCase())) return true
                        if (e.desc.toUpperCase().includes(searchText.toUpperCase())) return true
                        return false
                    }).map(e => (
                        <Project {...e} key={e.name} />
                    ))
                }
            </Services>
        </>
    )
}


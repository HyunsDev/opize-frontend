import { useState, useEffect } from 'react';
import styled from 'styled-components';
import instance from '../../../src/instance';
import { toast } from 'react-toastify';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { Search, CodeBlock, VerticalLayout } from 'opize-components'

const Divver = styled.div`
    margin-top: 16px;
`

const Products = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`

export default function Create(props) {
    const [searchParams] = useSearchParams();
    const [ projectCode, setProjectCode ] = useState(searchParams.get('projectCode'))
    const [ products, setProjects ] = useState({})
    const [ originalProject, setOriginalProject ] = useState({})
    const [ searchText, setSearchText ] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        setProjectCode(searchParams.get('projectCode'))
    }, [searchParams, setProjectCode])

    useEffect(() => {
        (async () => {
            if (projectCode) {
                try {
                    const res = await instance.get(`/project/${projectCode}`)
                    setOriginalProject(res.data)
                } catch (err) {
                    console.error(err)
                }
            } else {
                navigate('/admin/project')
                toast.info('리스트에서 편집할 프로젝트를 선택하세요.')
            }
        })()
    }, [projectCode, navigate])

    useEffect(() => {
        (async () => {
            try {
                const res = await instance.get(`/project/${projectCode}/product`)
                setProjects(res.data)
            } catch (err) {
                toast.error(err.message)
                console.error(err)
            }
        })()
    }, [projectCode, setProjects])

    return (
        <Divver>
            <CodeBlock key={originalProject.name}
                icon={originalProject.icon}
                title={originalProject.name}
                subtitle={originalProject.code}
                desc={originalProject.desc}
                links={[
                    { text: '새로운 상품', to: `/admin/project/product/new?projectCode=${originalProject.code}` },
                    { text: '상품', to: `/admin/project/product?projectCode=${originalProject.code}` },
                    { text: '편집', to: `/admin/project/edit?projectCode=${originalProject.code}` },
                ]}
            >{JSON.stringify(originalProject, null, 4)}</CodeBlock>

            <VerticalLayout label='product'>
                <Search value={searchText} onChange={e => setSearchText(e.target.value)} />
                <Products>
                    { Object.values(products).filter(e => {
                        if (searchText === "") return true
                        if (e.name.toUpperCase().includes(searchText.toUpperCase())) return true
                        if (e.code.toUpperCase().includes(searchText.toUpperCase())) return true
                        if (e.desc.toUpperCase().includes(searchText.toUpperCase())) return true
                        return false
                    }).map((product) => <CodeBlock key={product.code}
                        icon={product.icon}
                        title={product.name}
                        subtitle={product.code}
                        desc={product.desc}
                        links={[
                            {
                                text: product.paymentKind === 'billing' ? "구독" : '결제',
                                to: `/${product.paymentKind === 'billing' ? 'subscribe' : 'payment'}?projectCode=${originalProject.code}&productCode=${product.code}`
                            },
                            { text: '편집', to: `/admin/project/product/edit?projectCode=${originalProject.code}&productCode=${product.code}` }
                        ]}
                    >{JSON.stringify(product, null, 4)}</CodeBlock>)}
                </Products>
            </VerticalLayout>
        </Divver>
    )
}
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import instance from '../../../src/instance';
import { useForm, Controller } from "react-hook-form";
import { toast } from 'react-toastify';

import Project from '../../../components/admin/project';
import Product from '../../../components/admin/product';
import RowMenu from '../../../components/row/rowMenu';
import { ColorBtnSubmit } from '../../../components/btns/btns';
import LoginInput from '../../../components/inputs/loginInput'
import { useNavigate, useSearchParams } from 'react-router-dom';

const Divver = styled.div`
    margin-top: 16px;
`

const Header = styled.div`
    margin-top: 16px;
    margin-bottom: 8px;
    padding-bottom: 4px;
    font-size: 16px;
    border-bottom: solid 1px var(--grey1);
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
    const navigate = useNavigate()

    useEffect(() => {
        setProjectCode(searchParams.get('projectCode'))
    }, [searchParams, setProjectCode])

    useEffect(() => {
        (async () => {
            console.log(projectCode)
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
                console.log(res.data)
            } catch (err) {
                toast.error(err.message)
                console.error(err)
            }
        })()
    }, [projectCode, setProjects])

    return (
        <Divver>
            <Project {...originalProject} />

            <Header>product</Header>
            <Products>
                { Object.values(products).map((product) => <Product projectCode={projectCode} key={product.code} {...product} />) }
            </Products>
        </Divver>
    )
}
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import instance from '../../src/instance';

import Search from '../../components/inputs/search';
import PaymentLog from '../../components/block/paymentLog';

const Menus = styled.div`
    display: flex;
    gap: 8px;
    margin-top: 8px;
    width: 100%;
    flex-direction: column;
`

export default function User() {
    const { t } = useTranslation('translation')
    const [ searchText, setSearchText ] = useState('')
    const [ paymentLogs, setPaymentLogs ] = useState([])
    const [ products, setProducts ] = useState({})
    const [ projects, setProjects ] = useState({})
    const navigate = useNavigate()

    useEffect(() => {
        (async () => {
            try {
                const res = await instance.get(`/payment`);
                setProducts(res.data.products)
                setProjects(res.data.projects)
                setPaymentLogs(res.data.paymentLogs)
            } catch (err) {
                if (err.response) {
                    if (err.response.data.code === "user_not_found") {
                        toast.error(t('err_user_not_found'))
                    } else if (err.response.data.code === "token_expired") {
                        navigate("/login")
                    } else if (err.response.data.code === "invalid_token") {
                        toast.error(t('err_invalid_token'))
                    } else {
                        console.error(err)
                        toast.error(err.message)
                    }
                } else {
                    console.error(err)
                    toast.error(err.message)
                }
            }
        })()
    }, [navigate, setPaymentLogs, setProducts, t])

    return (
        <>
            <Menus>
                <Search value={searchText} onChange={e => setSearchText(e.target.value)} />
                {
                    paymentLogs.filter(e => {
                        if (searchText === "") return true
                        if (e.name.toUpperCase().includes(searchText.toUpperCase())) return true
                        if (e.desc.toUpperCase().includes(searchText.toUpperCase())) return true
                        if (e.to.toUpperCase().includes(searchText.toUpperCase())) return true
                        return false
                    }).map(e => <PaymentLog {...e} key={e.id} product={products[e.productId]} project={projects[e.projectId]} />)
                }
            </Menus>
        </>
    )
}
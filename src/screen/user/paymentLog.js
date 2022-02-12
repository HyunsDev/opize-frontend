import { useContext, useState, useEffect } from 'react';
import { UserContext } from "../../context/user";
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { useForm, Controller } from "react-hook-form";

import RowMenu from '../../components/row/rowMenu';
import { H2 } from '../../components/title/title';
import { Card } from '../../components/card';
import { loadTossPayments } from '@tosspayments/payment-sdk'
import instance from '../../src/instance';
import Subscribe from '../../components/block/subscribe';

import Search from '../../components/inputs/search';

const Menus = styled.div`
    display: flex;
    gap: 30px;
    margin-top: 32px;
    width: 100%;
    flex-direction: column;
`

export default function User(props) {
    const { t } = useTranslation('translation')
    const { user } = useContext(UserContext)
    const navigate = useNavigate()

    const { paymentLog, setPaymentLog } = useState([])

    return (
        <>
            <Menus>

            </Menus>
        </>
    )
}
import { useEffect } from 'react'
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { HorizonLNB, Page, H1 } from 'opize-components'
import { HeaderWrapper } from '../../components';

import User from './user';
import Payment from './payment'
import PaymentLog from './paymentLog'

export default function Router() {
    const { t } = useTranslation('translation')
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        document.title = `${t("user_title")} | Opize`
    }, [t])

  return (
    <>
        <HeaderWrapper app="user" />
        <Page width={720}>
            <H1>{t('user_title')}</H1>
            <HorizonLNB selected={location.pathname} menu={[
                {id: "/user", label: t('user_user_title'), onClick: () => navigate("/user")},
                {id: "/user/payment", label: t('user_payment_title'), onClick: () => navigate("/user/payment")},
                {id: "/user/paymentLog", label: t('user_paymentLog_title'), onClick: () => navigate("/user/paymentLog")},
            ]} />

            <Routes>
                <Route path="/" element={<User />} />
                <Route path="/payment" element={<Payment />} />
                <Route path="/paymentLog" element={<PaymentLog />} />
            </Routes>
        </Page>
    
    </>
  );
};

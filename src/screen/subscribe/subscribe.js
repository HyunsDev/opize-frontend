import { useContext, useEffect, useState } from 'react'
import {  useNavigate, useSearchParams } from 'react-router-dom';
import {HeaderWrapper} from "../../components";
import { useTranslation } from 'react-i18next';
import instance from '../../src/instance';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { UserContext } from '../../context/user';
import { DashboardContext } from '../../context/dashboard';

import { Page, H1, SubscribeBlock, ColorBtn } from 'opize-components'

const Items = styled.div`
  margin-top: 8px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
`

export default function Index() {
  const [searchParams] = useSearchParams()
  const { user } = useContext(UserContext)
  const { dashboard } = useContext(DashboardContext)
  const { t } = useTranslation('translation')
  const [projectCode, setProjectCode] = useState(searchParams.get('projectCode'))
  const [productCode, setProductCode] = useState(searchParams.get('productCode'))
  const [redirect, setRedirect] = useState(searchParams.get('redirect'))
  const [product, setProduct] = useState({})

  const navigate = useNavigate()

  useEffect(() => {
    setProjectCode(searchParams.get('projectCode'))
    setProductCode(searchParams.get('productCode'))
    setRedirect(searchParams.get('redirect'))
  }, [searchParams, setProjectCode])

  useEffect(() => {
    document.title = `${t("subscribe_title")} - Opize`
  }, [t])

  useEffect(() => {
    (async () => {
      if (projectCode && productCode) {
        try {
          const res = await instance.get(`/project/${projectCode}/product/${productCode}`)
          setProduct(res.data)
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
      } else {
        navigate('/')
      }
    })()
  }, [navigate, productCode, projectCode, t])

  const onSubmit = async () => {
    (async () => {
      if (projectCode && productCode) {
        try {
          const res = await instance.post(`/subscribe`, {
            projectCode,
            productCode
          })
          toast.info('플랜을 구독했어요!')
          setTimeout(() => {
            window.location.href = `${redirect}?paymentLogId=${res.data.paymentLogId}` || `/user/payment?paymentLogId=${res.data.paymentLogId}`
          }, 3000)
        } catch (err) {
          if (err.response) {
            if (err.response.data.code === "user_not_found") {
              toast.error(t('err_user_not_found'))
            } else if (err.response.data.code === "token_expired") {
              navigate("/login")
            } else if (err.response.data.code === "invalid_token") {
              toast.error(t('err_invalid_token'))
            } else if (err.response.data.code === "project_not_found") {
              toast.error(t('err_project_not_found'))
            } else if (err.response.data.code === "product_not_found") {
              toast.error(t('err_product_not_found'))
            } else if (err.response.data.code === "already_subscribed") {
              toast.info(t('err_already_subscribed'))
              setTimeout(() => {
                window.location.href = redirect || "/user/payment"
              }, 3000)
            } else if (err.response.data.code === "need_payment") {
              navigate("/user/payment")
              toast.warn(t('err_need_payment'))
            } else {
              console.error(err)
              toast.error(err.message)
            }
          } else {
            console.error(err)
            toast.error(err.message)
          }
        }
      } else {
        navigate('/')
      }
    })()
  }

  return (
    <>
      <HeaderWrapper app={projectCode} />
      <Page width={720}>
        <H1>{t('subscribe_title')}</H1>
        <Items>
          <SubscribeBlock 
            icon={product.icon}
            project={dashboard?.projects?.[projectCode]}
            product={product}
            user={user}
            desc={`${product?.prices?.[user.currency]} ${user?.currency} / ${product?.billingInterval?.replace('y', t('year')).replace('M', t('month')).replace('d', t('day'))} `}
          />
          <ColorBtn label={t('subscribe_btn')} onClick={onSubmit} />
        </Items>
      </Page>
    </>
  );
};

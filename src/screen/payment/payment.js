import { useEffect, useState } from 'react'
import {  useNavigate, useSearchParams } from 'react-router-dom';
import Header from "../../components/header/header";
import { useTranslation } from 'react-i18next';
import instance from '../../src/instance';

import Page from "../../components/page/default";
import { H1 } from "../../components/title/title";
import NewSubscribe from '../../components/block/newSubscribe';
import { toast } from 'react-toastify';
import { ColorBtn } from '../../components/btns/btns';
import styled from 'styled-components';

const Items = styled.div`
  margin-top: 8px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
`

export default function Index() {
  const [searchParams] = useSearchParams()
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
    document.title = `${t("payment_title")} | Opize`
  }, [t])

  useEffect(() => {
    (async () => {
      if (projectCode && productCode) {
        try {
          const res = await instance.get(`/project/${projectCode}/product/${productCode}`)
          setProduct(res.data)
        } catch (err) {
          if (err.response) {
            console.log(err.response.data.code)
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
          await instance.post(`/payment`, {
            projectCode,
            productCode
          })
          toast.info('결제를 완료했어요!')
          setTimeout(() => {
            window.location.href = redirect || "/user/payment"
          }, 3000)
        } catch (err) {
          if (err.response) {
            console.log(err.response.data.code)
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
                console.log(123)
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
      <Header app={projectCode} />
      <Page width={720}>
        <H1>{t('payment_title')}</H1>
        <Items>
          <NewSubscribe projectCode={projectCode} key={product.code} {...product} />
          <ColorBtn text={t('payment_btn')} onClick={onSubmit} />
        </Items>
      </Page>
    </>
  );
};

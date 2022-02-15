import { useContext, useState, useEffect, useMemo } from 'react';
import { UserContext } from "../../context/user";
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { DashboardContext } from '../../context/dashboard';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from "swiper";
import 'swiper/css';
import 'swiper/css/pagination';

import Page from "../../components/page/default";
import { H1, H2 } from "../../components/title/title";
import Search from '../../components/inputs/search';
import Service from '../../components/block/service';

import defaultApp from '../../data/opizeApp.json'
import { Link } from 'react-router-dom';


const Divver = styled.div`
    margin-top: 8px;
`

const BannerImg = styled.img`
    width: 600px;
    height: 90px;
    border-radius: 8px;
`

const BannerDivver = styled.div`
    /* display: flex;
    max-width: 600px; */

    .swiper {
        width: 100%;
        height: 100%;
    }

    .swiper-slide {
        text-align: center;
        font-size: 18px;
        background: #fff;

        /* Center slide text vertically */
        display: flex;
        justify-content: center;
        align-items: center;
        }

        .swiper-slide img {
            display: block;
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
`

const Banner = (props) => {
    const { dashboard } = useContext(DashboardContext)

    return (
        <>
            <Swiper
                slidesPerView={1}
                spaceBetween={8}
                pagination={{
                    clickable: true,
                }}
                loop={true}
                modules={[Pagination, Autoplay]}
                autoplay={{ delay: 5000 }}
            >
                {
                    dashboard?.banners?.map((e, i) => {
                            if (e.to.includes('http')) {
                                return (
                                    <SwiperSlide key={i}>
                                        <a href={e.to || "/"} target={'_blank'} rel="noreferrer">
                                            <BannerImg src={e.bannerUrl} alt=""/>
                                        </a>
                                    </SwiperSlide>
                                )
                            } else {
                                return (
                                    <SwiperSlide key={i}>
                                        <Link to={e.to || "/"}>
                                            <BannerImg src={e.bannerUrl} alt=""/>
                                        </Link>
                                    </SwiperSlide>
                                )
                            }
                        }
                    )
                }
            </Swiper>
        </>
    )
}

const ServicesDiv = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`

const Services = (props) => {
    const { dashboard } = useContext(DashboardContext)
    const [ searchText, setSearchText ] = useState('')
    const { t, i18n } = useTranslation('translation')

    const searchInput = (e) => {
        setSearchText(e.target.value)
    }

    const services = useMemo(() => {
        let temp = defaultApp[i18n.language]
        Object.values(dashboard?.projects || {})?.forEach(e => {
            temp[e.code] = {
                name: e.name,
                img: e.icon,
                desc: e.desc,
                show: true,
                showDashboard: true,
                to: e.url,
            }
        })
        return temp
    }, [i18n, dashboard])

    return (
        <>
            <H2>{t("dashboard_subtitle")}</H2>
            <ServicesDiv>
                <Search key="search" value={searchText} onChange={searchInput} />
                {
                    Object.values(services).filter(e => {
                        if (!e.showDashboard) return false
                        if (searchText === "") return true
                        if (e.name.toUpperCase().includes(searchText.toUpperCase())) return true
                        if (e.desc.toUpperCase().includes(searchText.toUpperCase())) return true
                        if (e.to.toUpperCase().includes(searchText.toUpperCase())) return true
                        return false
                    }).map(e => <Service {...e} key={e.name} />)
                }
            </ServicesDiv>
        </>
    )
}

export default function Dashboard(props) {
    const { user } = useContext(UserContext)
    const { dashboard } = useContext(DashboardContext)
    const [ searchText, setSearchText ] = useState('')
    const { t, i18n } = useTranslation('translation')

    useEffect(() => {
        document.title = `${t("dashboard")} | Opize`
    }, [t])

    return (
        <Page>
            <H1>{t("greet", {name: user.name})}</H1>
            <Divver>
                <Banner />
                <Services />
            </Divver>
        </Page>
    )
}
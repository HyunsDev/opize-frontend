import type { NextPage } from 'next';
import Link from 'next/link';
import { Button, cv, PageLayout } from 'opize-design-system';
import { useGoogleOneTapLogin } from '@react-oauth/google';
import { IndexHeader } from '../components/page/index/header';
import { IndexMainBlock } from '../components/page/index/mainBlock';
import Head from 'next/head';
import { IndexBottomText } from '../components/page/index/bottomText';
import { IndexFooter } from '../components/page/index/footer';

function Home() {
    return (
        <>
            <Head>
                <title>Opize | 더욱 편리한 생산성 라이프 프로젝트</title>
            </Head>
            <IndexHeader />
            <IndexMainBlock />
            <IndexBottomText>
                일상 속 숨겨진 작은 불편함
                <br />
                오피즈가 찾아내서
                <br />
                해결해드릴게요
                <br />
                😎
            </IndexBottomText>
            <IndexFooter />
        </>
    );
}

export default Home;

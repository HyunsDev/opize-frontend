import type { NextPage } from 'next';
import Link from 'next/link';
import { Button, cv } from 'opize-design-system';
import { useGoogleOneTapLogin } from '@react-oauth/google';

function Home() {
    return (
        <Link href={'/asdf'} passHref>
            <Button as="a">Button</Button>
        </Link>
    );
}

export default Home;

import { useRouter } from 'next/router';
import { IndexHeader } from '../components/page/index/header';
import { NotionPage } from '../components/page/notion/notionPage';
import { OpizeFooter } from '../components/share/footer';

export default function App() {
    const router = useRouter();
    const { pageId } = router.query;

    return (
        <>
            <IndexHeader now="main" />
            <NotionPage pageId={(pageId as string) || ''} />
            <OpizeFooter />
        </>
    );
}

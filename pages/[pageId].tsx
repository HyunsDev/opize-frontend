import { useRouter } from 'next/router';
import { IndexFooter } from '../components/page/index/footer';
import { IndexHeader } from '../components/page/index/header';
import { NotionPage } from '../components/page/notion/notionPage';

export default function App() {
    const router = useRouter();
    const { pageId } = router.query;

    return (
        <>
            <IndexHeader now="main" />
            <NotionPage pageId={(pageId as string) || ''} />
            <IndexFooter />
        </>
    );
}

import Link from 'next/link';
import { PaneList, PaneListItem } from 'opize-design-system';

type Now = 'index' | 'account' | 'project' | 'billing' | 'subscribe';
export function SettingSidebar({ now }: { now: Now }) {
    return (
        <PaneList>
            <Link passHref href="/dashboard/settings">
                <PaneList.Item selected={now === 'index'}>프로필</PaneList.Item>
            </Link>
            <Link passHref href="/dashboard/settings/account">
                <PaneList.Item selected={now === 'account'}>계정</PaneList.Item>
            </Link>
            <Link passHref href="/dashboard/settings/project">
                <PaneList.Item selected={now === 'project'}>프로젝트</PaneList.Item>
            </Link>

            {/* <Link passHref href="/dashboard/settings/subscribe">
                <ActionList.Item selected={now === 'subscribe'}>구독</ActionList.Item>
            </Link>

            <Link passHref href="/dashboard/settings/billing">
                <ActionList.Item selected={now === 'billing'}>결제</ActionList.Item>
            </Link> */}
        </PaneList>
    );
}

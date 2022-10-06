import Link from 'next/link';
import { ActionList } from 'opize-design-system';

type Now = 'index' | 'account' | 'project' | 'billing' | 'subscribe';
export function SettingSidebar({ now }: { now: Now }) {
    return (
        <ActionList isSticky>
            <Link passHref href="/dashboard/settings">
                <ActionList.Item selected={now === 'index'}>프로필</ActionList.Item>
            </Link>
            <Link passHref href="/dashboard/settings/account">
                <ActionList.Item selected={now === 'account'}>계정</ActionList.Item>
            </Link>
            <Link passHref href="/dashboard/settings/project">
                <ActionList.Item selected={now === 'project'}>프로젝트</ActionList.Item>
            </Link>

            <Link passHref href="/dashboard/settings/subscribe">
                <ActionList.Item selected={now === 'subscribe'}>구독</ActionList.Item>
            </Link>

            <Link passHref href="/dashboard/settings/billing">
                <ActionList.Item selected={now === 'billing'}>결제</ActionList.Item>
            </Link>
        </ActionList>
    );
}

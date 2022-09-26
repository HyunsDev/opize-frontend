import { cv, PageHead, PageLayout, Button, useModal, useCodeModal } from 'opize-design-system';
import { DashboardItem, DashboardItems } from '../../../components/dashboard/items';

import { client } from '../../../utils/opizeClient';
import { useQueries, useQuery } from 'react-query';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { AdminHeader } from '../../../components/page/admin/AdminHeader';
import Link from 'next/link';
import { Code } from 'phosphor-react';
import { AdminFooter } from '../../../components/page/admin/adminFooter';

export default function App() {
    const { isLoading: userLoading, data: user } = useQuery(['user'], () => client.user.get({ userId: 'me' }), {});
    const { isLoading: projectsLoading, data: projects } = useQuery(
        ['projects'],
        async () => (await client.project.list()).projects,
        {}
    );

    const codeModal = useCodeModal();
    const router = useRouter();

    if (!userLoading && !user?.roles?.includes('admin')) {
        toast.warn('접근 권한이 없어요.');
        router.push('/dashboard');
        return;
    }

    return (
        <>
            <AdminHeader menu="project" />
            <PageHead title="프로젝트">
                <Link href={'/admin/project/new'} passHref>
                    <Button variant="contained" size="large" as={'a'}>
                        새 프로젝트
                    </Button>
                </Link>
            </PageHead>
            <PageLayout backgroundColor={cv.bg_page1}>
                <DashboardItems>
                    {projectsLoading
                        ? '로딩'
                        : projects?.map((project) => (
                              <Link
                                  href={`/admin/project/[projectCode]`}
                                  as={`/admin/project/${project.code}`}
                                  passHref
                                  key={project.code}
                              >
                                  <DashboardItem
                                      backgroundImage={project.bannerUrl}
                                      icon={project.iconUrl}
                                      subTitle={project.desc}
                                      tags={[]}
                                      title={project.name}
                                      actions={[
                                          [
                                              {
                                                  label: 'raw 보기',
                                                  icon: <Code />,
                                                  onClick: () => {
                                                      codeModal(`${project.code}`, project, 800);
                                                  },
                                              },
                                          ],
                                      ]}
                                  />
                              </Link>
                          ))}
                </DashboardItems>
            </PageLayout>
            <AdminFooter />
        </>
    );
}

import { useRouter } from 'next/router';
import { APIResponseError } from 'opize-client';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';
import { client } from '../../utils/opizeClient';

export function useUser({ allowNonLogin = false }: { allowNonLogin?: boolean } = {}) {
    const { data: user, error } = useQuery(['user', 'self'], () => client.user.get({ userId: 'me' }), {});
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('opizeToken');
        if (!token && !allowNonLogin) {
            toast.warn('로그인이 필요해요');
            router.push('/auth/login');
            return;
        }
    }, [allowNonLogin, router]);

    if (error && error instanceof APIResponseError) {
        return {
            user: null,
            isError: true,
            error: error,
        };
    }

    return {
        user,
        isError: false,
        error: undefined,
    };
}

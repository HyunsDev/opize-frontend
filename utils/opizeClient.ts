import { Client } from 'opize-client';

export const client = new Client({
    baseUrl: process.env.NEXT_PUBLIC_API_SERVER,
    auth: typeof window !== 'undefined' ? (localStorage.getItem('opizeToken') as string) : undefined,
});

if (typeof window !== 'undefined') {
    client.updateAuth(localStorage.getItem('opizeToken') as string);
}

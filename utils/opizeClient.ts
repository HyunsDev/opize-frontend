import { Client } from 'opize-client';

export const client = new Client({
    baseUrl: process.env.NEXT_PUBLIC_API_SERVER,
});

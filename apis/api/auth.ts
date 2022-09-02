import { AxiosError, AxiosPromise } from 'axios';
import { toast } from 'react-toastify';
import { OpizeHTTPError } from '../error';
import { instance } from '../utils/instance';

interface LoginBody {
    token: string;
}

interface LoginResponse {
    token: string;
}

const googleLogin = async (data: LoginBody) => {
    try {
        const response = await instance.post<LoginResponse>('/auth/oauth/google', data);
        return response;
    } catch (err) {
        if (err instanceof AxiosError) {
            throw new OpizeHTTPError(err.response?.status, err.response?.data.code, err.response?.statusText);
        } else {
            throw err;
        }
    }
};

export const auth = {
    googleLogin,
};

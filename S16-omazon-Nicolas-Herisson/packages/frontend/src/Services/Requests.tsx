import type { ICategory, IProduct, IUser } from 'src/@types';
import axios from 'axios';
import { useErrorsContext } from '@contexts/requestsAndServerError';

export const httpRequester = axios.create({
  baseURL: 'http://localhost:3000/api',
  withCredentials: true,
});

export function useSignupUser() {
  async function signupUser(userInformations: {
    [k: string]: FormDataEntryValue;
  }) {
    try {
      const { data } = await httpRequester.post(
        '/auth/register',
        userInformations,
      );
      console.log(data);
      return data.message;

      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    } catch (error: any) {
      console.error('Signup failed', error);
      return error.response.data.message;
    }
  }

  return signupUser;
}

export async function login(email: string, password: string) {
  try {
    const data = await httpRequester.post('/auth/login', {
      email,
      password,
    });
    console.log(data);
    return data;
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  } catch (error: any) {
    console.log(error.message);
    return error.status;
  }
}

export async function getCurrentUser() {
  try {
    const { data } = await httpRequester.get<AuthMeResponse>('/auth/me');

    return data;
  } catch (error) {
    console.error('Failed to get current user', error);
    return null;
  }
}
type AuthMeResponse =
  | { isAuthenticated: false; user: null }
  | { isAuthenticated: true; user: IUser };

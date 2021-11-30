import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { AppThunk } from "src/config/store";
import { serializeAxiosError } from "./utils";
import { Storage } from "src/helpers/storage";
import { AUTH_TOKEN_KEY } from "src/config/constants";
import { getApiKey } from "./api-key.reducer";

export const initialState = {
    loading: false,
    isAuthenticated: false,
    loginSuccess: false,
    loginError: false, // Errors returned from server side
    account: {} as any,
    errorMessage: null as unknown as string, // Errors returned from server side
    redirectMessage: null as unknown as string,
    sessionHasBeenFetched: false,
    logoutUrl: null as unknown as string,
};

export type AuthenticationState = Readonly<typeof initialState>;

// Actions

export const getSession = (): AppThunk => async (dispatch, getState) => {
    await dispatch(getAccount());
    await dispatch(getApiKey());
};

export const getAccount = createAsyncThunk('authentication/get_account', async () => axios.get<any>('users/me'), {
    serializeError: serializeAxiosError,
});

interface IAuthParams {
    username: string;
    password: string;
}

export const authenticate = createAsyncThunk(
    'authentication/login',
    async (auth: IAuthParams) => {
        const formData = new FormData();
        formData.append('username', auth.username);
        formData.append('password', auth.password);
        return await axios.post<any>('/auth/login', formData, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
        })
    },
    {
        serializeError: serializeAxiosError,
    }
);

export const login: (username: string, password: string) => AppThunk =
    (username, password) =>
        async dispatch => {
            const result = await dispatch(authenticate({ username, password }));
            const response = result.payload as AxiosResponse;
            const data = response?.data;
            if (data && data["token_type"] === 'bearer') {
                const jwt = data["access_token"];
                Storage.session.set(AUTH_TOKEN_KEY, jwt);
                dispatch(getSession());
            }
        };

export const clearAuthToken = () => {
    Storage.session.remove(AUTH_TOKEN_KEY);
};

export const logout: () => AppThunk = () => dispatch => {
    clearAuthToken();
    dispatch(logoutSession());
};

export const clearAuthentication = messageKey => dispatch => {
    clearAuthToken();
    dispatch(authError(messageKey));
    dispatch(clearAuth());
};

export const AuthenticationSlice = createSlice({
    name: "authentication",
    initialState: initialState as AuthenticationState,
    reducers: {
        logoutSession(state) {
            return {
                ...initialState,
                sessionHasBeenFetched: state.sessionHasBeenFetched,
                showModalLogin: true,
            };
        },
        authError(state, action) {
            return {
                ...state,
                showModalLogin: true,
                redirectMessage: action.payload,
            };
        },
        clearAuth(state) {
            return {
                ...state,
                loading: false,
                showModalLogin: true,
                isAuthenticated: false,
            };
        },
    },
    extraReducers(builder) {
        builder.addCase(authenticate.rejected, (state, action) => ({
            ...initialState,
            errorMessage: action.error.message!,
            showModalLogin: true,
            loginError: true,
        }))
            .addCase(authenticate.fulfilled, (state, action) => ({
                ...state,
                loading: false,
                loginError: false,
                loginSuccess: true,
            }))
            .addCase(getAccount.rejected, (state, action) => ({
                ...state,
                loading: false,
                isAuthenticated: false,
                sessionHasBeenFetched: true,
                errorMessage: action.error.message!,
            }))
            .addCase(getAccount.fulfilled, (state, action) => {
                const isAuthenticated = action.payload && action.payload.data
                return {
                    ...state,
                    isAuthenticated,
                    loading: false,
                    sessionHasBeenFetched: true,
                    account: action.payload.data,
                };
            })
            .addCase(authenticate.pending, state => {
                state.loading = true;
            })
            .addCase(getAccount.pending, state => {
                state.loading = true;
            });
    }
});

export const { logoutSession, authError, clearAuth } = AuthenticationSlice.actions;

// Reducer
export default AuthenticationSlice.reducer;
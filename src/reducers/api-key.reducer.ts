import axios from 'axios';

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { serializeAxiosError } from "./utils";

const initialState = {
    key: null as unknown as string,
    scopes: [] as unknown as string[],
    loading: false as boolean,
    successMessage: null as unknown as string,
    errorMessage: null as unknown as string
};

export type ApplicationProfileState = Readonly<typeof initialState>;

export const getApiKey = createAsyncThunk('apiKey/get_api_key', async () => axios.get<any>('biometrics/keys'), {
    serializeError: serializeAxiosError,
});

export const renewApiKey = createAsyncThunk(
    'apiKey/renew_api_key',
    async () => axios.put<any>('biometrics/keys/renew'),
    {
        serializeError: serializeAxiosError,
    }
);

export const ApplicationProfileSlice = createSlice({
    name: 'ApiKey',
    initialState: initialState as ApplicationProfileState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(renewApiKey.rejected, (state, action) => ({
                ...initialState,
                loading: false,
                errorMessage: action.error.message!,
            }))
            .addCase(renewApiKey.fulfilled, (state, action) => {
                const { data } = action.payload;
                state.key = data["api_key"];
                state.scopes = data["scopes"];
                state.loading = false;
                state.successMessage = "Api key succesfully renewed";
            })
            .addCase(renewApiKey.pending, state => {
                state.loading = true;
                state.successMessage = null!;
                state.errorMessage = null!; // sigh, javascript!
            })
            .addCase(getApiKey.rejected, (state, action) => ({
                ...initialState,
                loading: false,
                errorMessage: action.error.message!,
            }))
            .addCase(getApiKey.fulfilled, (state, action) => {
                const { data } = action.payload;
                state.key = data["api_key"];
                state.scopes = data["scopes"];
                state.loading = false;
            })
            .addCase(getApiKey.pending, state => {
                state.loading = true;
                state.errorMessage = null!; // sigh, javascript!
            });
    },
});

// Reducer
export default ApplicationProfileSlice.reducer;

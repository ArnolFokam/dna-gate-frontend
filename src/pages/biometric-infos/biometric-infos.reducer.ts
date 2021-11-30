import axios from 'axios';
import { createAsyncThunk, createSlice, isFulfilled, isPending, isRejected } from '@reduxjs/toolkit';
import { defaultValue, IBiometricInfo } from 'src/models/biometric-info.model';
import { serializeAxiosError } from 'src/reducers/utils';

const initialState = {
    loading: false,
    errorMessage: null as unknown as string, // Errors returned from server side
    infos: [] as ReadonlyArray<IBiometricInfo>,
    info: defaultValue,
    updating: false,
    updateSuccess: false,
    totalItems: 0,
};

const apiUrl = 'biometrics/info';

// Async Actions

export const getInfos = createAsyncThunk('biometricInfoManagement/fetch_all_info', async (apiKey: string) => {
    const requestUrl = `${apiUrl}`;
    return axios.get<IBiometricInfo[]>(requestUrl, {
        headers: {
            "Api-Key": apiKey,
        }
    });
});

export const getInfo = createAsyncThunk(
    'biometricInfoManagement/fetch_info',
    async ({
        id,
        apiKey
    }: any) => {
        const requestUrl = `${apiUrl}/${id}`;
        return axios.get<IBiometricInfo>(requestUrl, {
            "headers": {
                "Api-Key": apiKey,
            }
        });
    },
    { serializeError: serializeAxiosError }
);

export const createInfo = createAsyncThunk(
    'biometricInfoManagement/create_info',
    async (info: IBiometricInfo) => {
        const result = await axios.post<IBiometricInfo>(apiUrl, info);
        return result;
    },
    { serializeError: serializeAxiosError }
);

export const updateInfo = createAsyncThunk(
    'biometricInfoManagement/update_info',
    async (info: IBiometricInfo) => {
        const requestUrl = `${apiUrl}/${info.id}`;
        const result = await axios.put<IBiometricInfo>(requestUrl, info);
        return result;
    },
    { serializeError: serializeAxiosError }
);

export const deleteInfo = createAsyncThunk(
    'biometricInfoManagement/delete_info',
    async ({
        id, 
        apiKey
    }: any) => {
        const requestUrl = `${apiUrl}/${id}`;
        const result = await axios.delete<IBiometricInfo>(requestUrl, {
            "headers": {
                "Api-Key": apiKey,
            }
        });
        return result;
    },
    { serializeError: serializeAxiosError }
);

export type biometricInfoManagementState = Readonly<typeof initialState>;

export const biometricInfoManagementSlice = createSlice({
    name: 'biometricInfoManagement',
    initialState: initialState as biometricInfoManagementState,
    reducers: {
        reset() {
            return initialState;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(getInfo.fulfilled, (state, action) => {
                state.loading = false;
                state.info = action.payload.data;
            })
            .addCase(deleteInfo.fulfilled, state => {
                state.updating = false;
                state.updateSuccess = true;
                state.info = defaultValue;
            })
            .addMatcher(isFulfilled(getInfos), (state, action) => {
                state.loading = false;
                state.infos = action.payload.data;
                state.totalItems = action.payload.data!.length;
            })
            .addMatcher(isFulfilled(createInfo, updateInfo), (state, action) => {
                state.updating = false;
                state.loading = false;
                state.updateSuccess = true;
                state.info = action.payload.data;
            })
            .addMatcher(isPending(getInfos, getInfo), state => {
                state.errorMessage = null!;
                state.updateSuccess = false;
                state.loading = true;
            })
            .addMatcher(isPending(createInfo, updateInfo, deleteInfo), state => {
                state.errorMessage = null!;
                state.updateSuccess = false;
                state.updating = true;
            })
            .addMatcher(isRejected(getInfos, getInfo, createInfo, updateInfo, deleteInfo), (state, action) => {
                state.loading = false;
                state.updating = false;
                state.updateSuccess = false;
                state.errorMessage = action.error.message!;
            });
    },
});

export const { reset } = biometricInfoManagementSlice.actions;

// Reducer
export default biometricInfoManagementSlice.reducer;

import { createAsyncThunk, createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import axios from "axios";
import { AppThunk } from "src/config/store";
import { serializeAxiosError } from "./utils";

const initialState = {
    loading: false,
    errorMessage: null as unknown as string,
    usageHistory: [] as any,
    totalUsage: {} as any,
    infosRatio: {} as any
};

export type MetricsState = Readonly<typeof initialState>;

// Actions

export const getAllMetrics = (): AppThunk => (dispatch, getState) => {
    const key = getState().apikey.key;
    dispatch(getUsageHistory(key));
    dispatch(getTotalUsage(key));
    dispatch(getInfosRatio(key));

}

export const getUsageHistory = createAsyncThunk('metrics/fetch_usageHistory', async (key: string) => axios.get<any>('/biometrics/metrics/usage-history', {
    headers: {
        "Api-Key": key
    },
}), {
    serializeError: serializeAxiosError,
});

export const getTotalUsage = createAsyncThunk('metrics/fetch_totalUsage', async (key: string) => axios.get<any>('/biometrics/metrics/total-usage', {
    headers: {
        "Api-Key": key
    },
}), {
    serializeError: serializeAxiosError,
});

export const getInfosRatio = createAsyncThunk('metrics/fetch_infosRatio', async (key: string) => axios.get<any>('/biometrics/metrics/infos-ratio', {
    headers: {
        "Api-Key": key
    },
}), {
    serializeError: serializeAxiosError,
});

export const MetricsSlice = createSlice({
    name: 'metrics',
    initialState: initialState as MetricsState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(getUsageHistory.fulfilled, (state, action) => {
                state.loading = false;
                state.usageHistory = action.payload.data;
            })
            .addCase(getTotalUsage.fulfilled, (state, action) => {
                state.loading = false;
                state.totalUsage = action.payload.data;
            })
            .addCase(getInfosRatio.fulfilled, (state, action) => {
                state.loading = false;
                state.infosRatio = action.payload.data;
            })
            .addMatcher(isPending(getUsageHistory, getTotalUsage, getInfosRatio), state => {
                state.errorMessage = null!;
                state.loading = true;
              })
              .addMatcher(
                isRejected(getUsageHistory, getTotalUsage, getInfosRatio),
                (state, action) => {
                  state.errorMessage = action.error.message!;
                  state.loading = false;
                }
              );
    }
})

// Reducer
export default MetricsSlice.reducer;
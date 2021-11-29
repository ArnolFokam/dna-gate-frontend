import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { serializeAxiosError } from 'src/reducers/utils';


const initialState = {
    loading: false,
    registrationSuccess: false,
    registrationFailure: false,
    errorMessage: null as unknown as string,
    successMessage: null as unknown as string,
};

export type RegisterState = Readonly<typeof initialState>;

// Actions

export const handleRegister = createAsyncThunk(
    'register/create_account',
    async (data: {
        first_name: string;
        last_name: string;
        email: string;
        password: string;
    }) => await axios.post<any>('/auth/register', data),
    { serializeError: serializeAxiosError }
);

export const RegisterSlice = createSlice({
    name: 'register',
    initialState: initialState,
    reducers: {
        reset() {
            return initialState;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(handleRegister.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(handleRegister.rejected, (state, action) => ({
                ...initialState,
                registrationFailure: true,
                errorMessage: action.error.message!,
            }))
            .addCase(handleRegister.fulfilled, (state, action) => ({
                ...initialState,
                registrationSuccess: true,
                successMessage: 'Successful registration!',
            }));
    },
});

export const { reset } = RegisterSlice.actions;

// Reducer
export default RegisterSlice.reducer;

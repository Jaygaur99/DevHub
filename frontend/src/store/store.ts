import { configureStore } from '@reduxjs/toolkit';

import {
    activateReducer,
    authReducer,
    roomsReducer,
    codeReducer,
} from 'features';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        activate: activateReducer,
        rooms: roomsReducer,
        codebox: codeReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

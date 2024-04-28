import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { combineReducers } from '@reduxjs/toolkit';
import {
    persistReducer,
    persistStore,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER
} from "redux-persist";
import UserReducer from "./User/UserSlice";
import MiscReducer from "./Misc/MiscSlice";

/* UNIFY REDUCERS */
const rootReducer = combineReducers({ UserReducer, MiscReducer })

/* CREATE PERSIST REDUX CONFIG */
const persistConfig = {
    key: "root",
    version: 1,
    storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer);


/* CREATE REDUX STATE */
const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    })
})

const persistor = persistStore(store);

export { store, persistor };
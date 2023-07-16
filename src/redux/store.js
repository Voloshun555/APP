// import { configureStore } from '@reduxjs/toolkit';
// import {
//   persistReducer,
//   persistStore,
//   FLUSH,
//   REHYDRATE,
//   PAUSE,
//   PERSIST,
//   PURGE,
//   REGISTER,
// } from 'redux-persist';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// import  authSlice  from './auth/userSlice';

// const persistConfig = {
//   key: 'root',
//   storage: AsyncStorage,
// };

// const reducer = persistReducer(persistConfig,authSlice);

// const store = configureStore({
//   reducer,
//   middleware: getDefaultMiddleware =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//       },
//     }),
// });

// const persistor = persistStore(store);

// export default { store, persistor };
import { configureStore, combineReducers } from "@reduxjs/toolkit";

import authSlice from "./auth/userSlice";

const rootReducer = combineReducers({
  auth: authSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});

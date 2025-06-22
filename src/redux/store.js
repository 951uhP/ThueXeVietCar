import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducer/rootReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';

// Cấu hình redux-persist
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user'], // Chỉ lưu trữ state của reducer user
};

// Tạo persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Tạo store với middleware và Redux DevTools
const store = createStore(
    persistedReducer,
    composeWithDevTools(applyMiddleware(thunk))
);

// Tạo persistor để lưu và khôi phục Redux state
const persistor = persistStore(store);

export { store, persistor };

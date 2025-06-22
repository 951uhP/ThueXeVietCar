import { FETCH_USER_LOGIN_SUCCESS, LOGOUT_USER, UPDATE_USER } from '../action/userAction';

const INITIAL_STATE = {
    account: {
        access_token: '',
        email: '',
        name: '',
        role: {} // role là object mặc định rỗng
    },
    isAuthenticated: false
};

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_USER_LOGIN_SUCCESS: {
            const { user, access_token } = action.payload; // Tách user và access_token từ payload
            return {
                ...state,
                account: { ...user, access_token }, // Cập nhật account với thông tin mới
                isAuthenticated: true
            };
        }
        case LOGOUT_USER:
            return INITIAL_STATE; // Reset state về trạng thái ban đầu
        case UPDATE_USER: {
            const { name, email } = action.payload;
            return {
                ...state,
                account: {
                    ...state.account,
                    name,
                    email
                }
            };
        }
        default:
            return state;
    }
};

export default userReducer;

import axios from 'axios';

// Action Types
export const FETCH_USER_LOGIN_SUCCESS = 'FETCH_USER_LOGIN_SUCCESS';
export const LOGOUT_USER = 'LOGOUT_USER';
export const UPDATE_USER = 'UPDATE_USER';

// Action Creators
export const loginUser = (data) => (dispatch) => {
    try {
        const { user, access_token } = data; // Tách dữ liệu user và access_token

        // Lưu thông tin vào localStorage
        localStorage.setItem('access_token', access_token);
        localStorage.setItem('user', JSON.stringify(user));

        // Dispatch action để cập nhật Redux Store
        dispatch({
            type: FETCH_USER_LOGIN_SUCCESS,
            payload: { user, access_token },
        });
    } catch (error) {
        console.error('Failed to handle login data:', error);
    }
};


export const logoutUser = () => (dispatch) => {
    try {
        // Xóa thông tin từ localStorage
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token')
        localStorage.removeItem('user');

        // Dispatch action để reset Redux Store
        dispatch({
            type: LOGOUT_USER,
        });
    } catch (error) {
        console.error('Failed to handle logout:', error);
    }
};

export const updateUser = (data) => (dispatch) => {
    try {
        const { user, access_token } = data; // Tách dữ liệu user và access_token

        // Lưu thông tin vào localStorage
        localStorage.setItem('access_token', access_token);
        localStorage.setItem('user', JSON.stringify(user));

        // Dispatch action để cập nhật Redux Store
        dispatch({
            type: FETCH_USER_LOGIN_SUCCESS,
            payload: { user, access_token },
        });
    } catch (error) {
        console.error('Failed to handle login data:', error);
    }
}

export default loginUser
import axios from '../../utils/axiosCustomize'

const apiClient = axios.create({
    baseURL: '/api',
    withCredentials: true, // Để gửi refresh_token (nếu lưu bằng cookie)
});

// Hàm fetch thông tin tài khoản
const fetchAccount = async () => {
    try {
        const response = await apiClient.get('/account', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access_token')}`, // Lấy access_token từ localStorage
            },
        });
        return response.data;
    } catch (error) {
        if (error.response?.status === 401) {
            // Access token đã hết hạn
            console.warn('Access token expired, attempting to refresh...');
            const isTokenRefreshed = await refreshAccessToken();
            if (isTokenRefreshed) {
                return fetchAccount(); // Gọi lại fetchAccount sau khi refresh token
            } else {
                throw new Error('Session expired. Please log in again.');
            }
        }
        throw error;
    }
};

// Hàm làm mới access token
const refreshAccessToken = async () => {
    try {
        const response = await apiClient.post('/refresh-token'); // Gửi request làm mới token
        const { access_token } = response.data;

        // Lưu access_token mới vào localStorage
        localStorage.setItem('access_token', access_token);
        return true;
    } catch (error) {
        console.error('Failed to refresh access token:', error);
        return false; // Refresh token hết hạn hoặc không hợp lệ
    }
};

export default fetchAccount;

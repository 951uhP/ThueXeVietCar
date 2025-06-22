const initialState = {
    bookingInfo: null,  // Thông tin đặt chỗ
    paymentStatus: null, // Trạng thái thanh toán: "pending", "success", "failure"
    isLoading: false,    // Xử lý trạng thái đang tải
    error: null,         // Lỗi nếu có
};

const bookingReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_BOOKING_INFO":
            return { ...state, bookingInfo: action.payload };

        case "SET_PAYMENT_STATUS":
            return { ...state, paymentStatus: action.payload };

        case "SET_LOADING":
            return { ...state, isLoading: action.payload };

        case "SET_ERROR":
            return { ...state, error: action.payload };

        default:
            return state;
    }
};

export default bookingReducer;

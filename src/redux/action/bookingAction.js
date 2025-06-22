export const setBookingInfo = (bookingInfo) => ({
    type: "SET_BOOKING_INFO",
    payload: bookingInfo,
});

export const setPaymentStatus = (status) => ({
    type: "SET_PAYMENT_STATUS",
    payload: status,
});

export const setLoading = (isLoading) => ({
    type: "SET_LOADING",
    payload: isLoading,
});

export const setError = (error) => ({
    type: "SET_ERROR",
    payload: error,
});

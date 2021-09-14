const UPDATE_USER = 'UPDATE_USER_ASYNC';

const inititalState = {
    login: false,
    userData: {},
    Num_of_Booking: 0
};

const reducer = (state = inititalState, action) => {
    console.log("ACTION-payload", action.payload);
    switch (action.type) {
        case UPDATE_USER:
            return {
                login: action.payload[0],
                userData: action.payload[1],
                Num_of_Booking: action.payload[2]
            };

        default:
            return state;
    }
};
export default reducer;

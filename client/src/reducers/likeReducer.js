export const initlikereducer = (state = {}, action) => {
    switch (action.type) {
        case "INIT_LIKE_REQUEST":
            return { loading: true };
        case "INIT_LIKE_SUCCESS":
            return { loading: false, success: true, like: action.payload };
        case "INIT_LIKE_FAIL":
            return { loading: false, success: false };
        case "INIT_LIKE_ADD": {
            return {};
        }
        default:
            return state;
    }
};


export const getlikereducer = (state = {}, action) => {
    switch (action.type) {
        case "GET_LIKE_REQUEST":
            return { loading: true };
        case "GET_LIKE_SUCCESS":
            return { loading: false, like: action.payload };
        case "GET_LIKE_FAIL":
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};


export const editlikereducer = (state = {}, action) => {
    switch (action.type) {
        case "EDIT_LIKE_REQUEST":
            return { loading: true };
        case "EDIT_LIKE_SUCCESS":
            return { loading: false, success: true };
        case "EDIT_LIKE_FAIL":
            return { loading: false, success: false };
        case "CLEAR_LIKE_EDIT":
            return {};
        default:
            return state;
    }
};


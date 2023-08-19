export const addcommentreducer = (state = {}, action) => {
    switch (action.type) {
        case "ADD_COMMENT_REQUEST":
            return { loading: true };
        case "ADD_COMMENT_SUCCESS":
            return { loading: false, success: true };
        case "ADD_COMMENT_FAIL":
            return { loading: false, success: false };
        case "CLEAR_COMMENT_ADD": {
            return {};
        }
        default:
            return state;
    }
};


export const listallcommentreducer = (state = {}, action) => {
    switch (action.type) {
        case "LIST_ALL_COMMENT_REQUEST":
            return { loading: true };
        case "LIST_ALL_COMMENT_SUCCESS":
            return { loading: false, comments: action.payload };
        case "LIST_ALL_COMMENT_FAIL":
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};


export const editcommentreducer = (state = {}, action) => {
    switch (action.type) {
        case "EDIT_COMMENT_REQUEST":
            return { loading: true };
        case "EDIT_COMMENT_SUCCESS":
            return { loading: false, success: true };
        case "EDIT_COMMENT_FAIL":
            return { loading: false, success: false };
        case "CLEAR_COMMENT_EDIT":
            return {};
        default:
            return state;
    }
};


export const deletecommentreducer = (state = {}, action) => {
    switch (action.type) {
        case "DELETE_COMMENT_REQUEST":
            return { loading: true };
        case "DELETE_COMMENT_SUCCESS":
            return { loading: false, success: true };
        case "DELETE_COMMENT_FAIL":
            return { loading: false, success: false };
        case "CLEAR_COMMENT_DELETE":
            return {};
        default:
            return state;
    }
};
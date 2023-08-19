import axios from "axios";


export const initlike =
    (blogId) => (dispatch) => {
        dispatch({ type: "INIT_LIKE_REQUEST" });
        const config = {
            header: {
                "Content-type": "application/json",
            },
        };
        axios({
            method: "POST",
            params: {
                blogId: blogId,
            },
            config,
            withCredentials: true,
            url: "/like/init-like",
        })
            .then((result) => {
                dispatch({ type: "INIT_LIKE_SUCCESS", payload: [result.data] });
            })
            .catch((error) => {
                dispatch({
                    type: "INIT_LIKE_FAIL",
                    payload:
                        error.response && error.response.data.message
                            ? error.response.data.message
                            : error.message,
                });
            });
    };


export const getLikeByBlogId = (blogId) => (dispatch) => {
    dispatch({ type: "GET_LIKE_REQUEST" });
    axios({
        method: "GET",
        params: {
            blogId: blogId,
        },
        withCredentials: true,
        url: "/like/get-like",
    })
        .then((result) => {
            dispatch({ type: "GET_LIKE_SUCCESS", payload: result.data });
        })
        .catch((error) => {
            dispatch({
                type: "GET_LIKE_FAIL",
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            });
        });
};


export const editLike = (blogId, number, userId) => (dispatch) => {
    dispatch({ type: "EDIT_LIKE_REQUEST" });
    const config = {
        header: {
            "Content-type": "application/json",
        },
    };
    axios({
        method: "PUT",
        data: {
            blogId: blogId,
            number: number,
            userId: userId,
        },
        config,
        withCredentials: true,
        url: "/like/edit-like",
    })
        .then((result) => {
            dispatch({ type: "EDIT_LIKE_SUCCESS", payload: result });
        })
        .catch((error) => {
            dispatch({
                type: "EDIT_LIKE_FAIL",
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            });
        });
};
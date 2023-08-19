import axios from "axios";

export const addcomment =
    (blogId, body, username, userId, parentId) => (dispatch) => {
        dispatch({ type: "ADD_COMMENT_REQUEST" });
        const config = {
            header: {
                "Content-type": "application/json",
            },
        };
        axios({
            method: "POST",
            data: {
                blogId: blogId,
                body: body,
                username: username,
                userId: userId,
                parentId: parentId ? parentId : null,
            },
            config,
            withCredentials: true,
            url: "/comment/createcomment",
        })
            .then((result) => {
                dispatch({ type: "ADD_COMMENT_SUCCESS", payload: result });
            })
            .catch((error) => {
                dispatch({
                    type: "ADD_COMMENT_FAIL",
                    payload:
                        error.response && error.response.data.message
                            ? error.response.data.message
                            : error.message,
                });
            });
    };

export const listAllCommentsByBlogId = (blogId) => (dispatch) => {
    dispatch({ type: "LIST_ALL_COMMENT_REQUEST" });
    axios({
        method: "GET",
        params: {
            blogId: blogId,
        },
        withCredentials: true,
        url: "/comment/getallcomments",
    })
        .then((result) => {
            dispatch({ type: "LIST_ALL_COMMENT_SUCCESS", payload: result.data });
        })
        .catch((error) => {
            dispatch({
                type: "LIST_ALL_COMMENT_FAIL",
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            });
        });
};

export const editcomment = (id, blogId, body, username, userId, parentId) => (dispatch) => {
    dispatch({ type: "EDIT_COMMENT_REQUEST" });
    const config = {
        header: {
            "Content-type": "application/json",
        },
    };
    axios({
        method: "POST",
        data: {
            id: id,
            blogId: blogId,
            body: body,
            username: username,
            userId: userId,
            parentId: parentId ? parentId : null,
        },
        config,
        withCredentials: true,
        url: "/comment/editcomment",
    })
        .then((result) => {
            dispatch({ type: "EDIT_COMMENT_SUCCESS", payload: result });
        })
        .catch((error) => {
            dispatch({
                type: "EDIT_COMMENT_FAIL",
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            });
        });
};

export const deletecomment = (id) => (dispatch) => {
    dispatch({ type: "DELETE_COMMENT_REQUEST" });
    const config = {
        header: {
            "Content-type": "application/json",
        },
    };
    axios({
        method: "POST",
        data: {
            id: id,
        },
        config,
        withCredentials: true,
        url: "/comment/deletecomment",
    })
        .then((res) => {
            dispatch({ type: "DELETE_COMMENT_SUCCESS", payload: res });
        })
        .catch((error) => {
            dispatch({
                type: "DELETE_COMMENT_FAIL",
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            });
        });
};
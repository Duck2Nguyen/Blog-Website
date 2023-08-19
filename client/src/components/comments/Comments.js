import { useState, useEffect } from "react";
import CommentForm from "./CommentForm";
import Comment from "./Comment";
import axios from "axios";
import {
  getComments as getCommentsApi,
  createComment as createCommentApi,
  updateComment as updateCommentApi,
  deleteComment as deleteCommentApi,
} from "../api";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


import { io } from "socket.io-client";

const socketIO = io();

const Comments = ({ blogId, commentsUrl, currentUserId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const comments = useSelector((state) => state.commentAll.comments);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [backendComments, setBackendComments] = useState([]);
  const [activeComment, setActiveComment] = useState(null);
  const rootComments = backendComments?.filter(
    (backendComment) => backendComment.parentId === null
  );

  const handleGetTagUser = (text) => {
    const string = text.slice(text.indexOf('@') + 1);
    if (string.indexOf(" ") === -1) {
      const username = string.substring(0);
      return username
    }
    const username = string.substring(0, string.indexOf(" "));
    return username
  }

  const getReplies = (commentId) =>
    backendComments
      .filter((backendComment) => backendComment.parentId === commentId)
      .sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );

  const addComment = (text, parentId) => {
    console.log(userInfo)
    if (!userInfo) {
      if (window.confirm("You must login to comment!!!")) {
        navigate("/login");
        return
      }
    }
    createCommentApi(blogId, text, userInfo.username, userInfo._id, parentId, dispatch).then(async () => {
      getCommentsApi(blogId, dispatch).then(() => {
        setBackendComments(comments);
      })
      setActiveComment(null);

      let usernameTag = handleGetTagUser(text);
      let userId;
      if (usernameTag) {
        console.log("usernameTag", usernameTag)

        await axios({
          method: "GET",
          params: {
            username: usernameTag,
          },
          withCredentials: true,
          url: "/user/getUserByUsername",
        })
          .then((result) => {
            userId = result.data;
            return result.data
          })
          .catch((error) => {
            console.log(error)
          });

        console.log("userId", userId)

        socketIO.emit('sendToUserId', {
          userId: userId._id,
          data: JSON.stringify({
            urlId: blogId,
            message: `${userInfo.username} đã nhắc đến bạn trong một bình luận`
          })
        });
      }

    });
    getCommentsApi(blogId, dispatch).then(() => {
      setBackendComments(comments);
    })
  };

  const updateComment = (text, commentId, parentId) => {
    updateCommentApi(commentId, blogId, text, userInfo.username, userInfo._id, parentId, dispatch).then(() => {
      getCommentsApi(blogId, dispatch).then(() => {
        setBackendComments(comments);
      })
      setActiveComment(null);
    });
    getCommentsApi(blogId, dispatch).then(() => {
      setBackendComments(comments);
    })
  }

  const deleteComment = (commentId) => {
    if (window.confirm("Are you sure you want to remove comment?")) {
      deleteCommentApi(commentId, dispatch).then(() => {
        getCommentsApi(blogId, dispatch).then(() => {
          setBackendComments(comments);
        })
        setActiveComment(null);
      })
    }
    getCommentsApi(blogId, dispatch).then(() => {
      setBackendComments(comments);
    })
  };

  useEffect(() => {
    getCommentsApi(blogId, dispatch).then(() => {
      setBackendComments(comments);
    })
  }, []);

  useEffect(() => {
    setBackendComments(comments);
  }, [comments]);


  return (
    <div className="comments">
      <h3 className="comments-title">Comments</h3>
      <div className="comment-form-title">Write comment</div>
      <CommentForm submitLabel="Write" handleSubmit={addComment} />
      <div className="comments-container">
        {rootComments?.map((rootComment) => (
          <Comment
            key={rootComment._id}
            comment={rootComment}
            replies={getReplies(rootComment._id)}
            activeComment={activeComment}
            setActiveComment={setActiveComment}
            addComment={addComment}
            deleteComment={deleteComment}
            updateComment={updateComment}
            currentUserId={currentUserId}
          />
        ))}
      </div>
    </div>
  );
};

export default Comments;

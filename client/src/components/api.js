import { listAllCommentsByBlogId, addcomment, deletecomment, editcomment } from "../actions/commentaction";

export const getComments = async (blogId, dispatch) => {

  dispatch(listAllCommentsByBlogId(blogId))
  // return [
  //   {
  //     id: "1",
  //     body: "First comment",
  //     username: "Jack",
  //     userId: "1",
  //     parentId: null,
  //     createdAt: "2021-08-16T23:00:33.010+02:00",
  //   },
  //   {
  //     id: "2",
  //     body: "Second comment",
  //     username: "John",
  //     userId: "2",
  //     parentId: null,
  //     createdAt: "2021-08-16T23:00:33.010+02:00",
  //   },
  //   {
  //     id: "3",
  //     body: "First comment first child",
  //     username: "John",
  //     userId: "2",
  //     parentId: "1",
  //     createdAt: "2021-08-16T23:00:33.010+02:00",
  //   },
  //   {
  //     id: "4",
  //     body: "Second comment second child",
  //     username: "John",
  //     userId: "2",
  //     parentId: "2",
  //     createdAt: "2021-08-16T23:00:33.010+02:00",
  //   },
  // ];

  return []
};

export const createComment = async (blogId, text, username, userId, parentId, dispatch) => {
  await dispatch(addcomment(blogId, text, username, userId, parentId))
  return;
};

export const updateComment = async (id, blogId, text, username, userId, parentId, dispatch) => {
  dispatch(editcomment(id, blogId, text, username, userId, parentId))
  return;
};

export const deleteComment = async (id, dispatch) => {
  dispatch(deletecomment(id))
  return;
};

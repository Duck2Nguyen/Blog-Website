import { useEffect, useState } from "react";
import { Badge, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import ErrorMessage from "../../components/ErrorMessage";
import Loading from "../../components/Loading";
import { deleteblog, singleblog } from "../../actions/blogaction";
import { listAllCommentsByBlogId } from "../../actions/commentaction";
import { initlike, getLikeByBlogId, editLike } from "../../actions/likeaction";
import { Link, useNavigate } from "react-router-dom";

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { toast } from "react-toastify";
import Comments from "../../components/comments/Comments";

import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';


import { io } from "socket.io-client";

const socketIO = io();

const Blogpage = () => {
  const id1 = window.location.href.split("/");
  const id = id1[id1.length - 1];
  const blogsingle = useSelector((state) => state.blogsingle);
  const { blog, error, loading } = blogsingle;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const blogdelete = useSelector((state) => state.blogdelete);
  const { success } = blogdelete;
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [countLike, setCountLike] = useState(0);
  const likeAll = useSelector((state) => state.likeAll);
  const likeInit = useSelector((state) => state.likeInit);

  const [hidden, setHidden] = useState(false);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    fontFamily: "IBM Plex Sans",
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    color: "rgb(26, 32, 39)",
    pt: 2,
    px: 4,
    pb: 3,
  };

  useEffect(() => {
    dispatch(singleblog(id));
    dispatch(getLikeByBlogId(id));
    setCountLike(0)
  }, [dispatch, id]);

  useEffect(async () => {
    if (likeInit.length === undefined && likeAll.like?.length === 0) {
      dispatch(initlike(id))
    }
    if (likeAll.like && likeAll.like.length > 0) {
      setCountLike(likeAll.like[0].count)
      handleListUserId()
      console.log(likeAll.like[0].count)
    }
  }, [likeAll])


  useEffect(() => {
    if (likeInit.like && likeInit.like.length !== 0) {
      dispatch(getLikeByBlogId(id));
    }
  }, [likeInit])

  const deleteHandler = () => {
    dispatch(deleteblog(id));
  };

  const handleIncreate = () => {
    if (!userInfo) {
      if (window.confirm("You must login to comment!!!")) {
        navigate("/login");
        return
      }
      return
    }
    setCountLike(prev => prev + 1)
    dispatch(editLike(id, 1, userInfo._id))
    setHidden(true)
    socketIO.emit('sendToUserId', {
      userId: blog.user_id,
      data: JSON.stringify({
        urlId: id,
        message: `${userInfo.username} đã tương tác với bài viết của bạn`
      })
    });
  }

  const handleDecreate = () => {
    if (!userInfo) {
      if (window.confirm("You must login to comment!!!")) {
        navigate("/login");
        return
      }
      return
    }
    setCountLike(prev => prev - 1)
    dispatch(editLike(id, -1, userInfo._id))
    setHidden(true)
    socketIO.emit('sendToUserId', {
      userId: blog.user_id,
      data: JSON.stringify({
        urlId: id,
        message: `${userInfo.username} đã tương tác với bài viết của bạn`
      })
    });
  }

  const handleListUserId = () => {
    if (likeAll.like[0].listUserId.includes(userInfo._id)) {
      setHidden(true)
    } else {
      setHidden(false)
    }

  }

  useEffect(() => {
    if (success === true) {
      toast.success("Delete blog successfully")
      navigate("/" + userInfo._id + "/myblogs");
      dispatch({ type: "CLEAR_BLOG_DELETE" });
    }
  }, [success]);


  return (
    <Container>
      {loading && <Loading />}
      {error && <ErrorMessage varient="danger">{error}</ErrorMessage>}
      {blog &&
        <Box sx={{
          display: "flex",
          flexDirection: "column",
          maxWidth: "682px",
          marginLeft: "auto",
          marginRight: "auto",
          marginBottom: "24px",
          fontFamily: "Palatino",
          paddingTop: "50px"
        }}>
          <Typography sx={{
            fontSize: "40px",
            fontWeight: "700",
            lineHeight: "48px",
            fontFamily: "Cabin Sketch"
          }}>
            {blog.title}
          </Typography>
          <Typography
            sx={{
              fontSize: "18px",
              fontFamily: "Roboto",
              fontWeight: "400",
              lineHeight: "1.5"
            }}
          >
            <em>by <span style={{ fontWeight: "400", color: "rgb(25, 118, 210)" }}>{blog.username}</span></em>

          </Typography>
          <span
            style={{
              color: "rgba(0,0,0,.9)",
              cursor: "pointer",
              border: "solid 1px #eee",
              display: "inline-block",
              fontWeight: "400",
              marginRight: "3px",
              padding: "4px 4px",
              marginTop: "5px",
              marginBottom: "8px",
              borderRadius: "3px",
              backgroundColor: "#eee",
              width: "fit-content",
              fontFamily: "GreekFallbacks"
            }}
          >
            {blog.category}
          </span>

          {
            !hidden ?
              <Box sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                width: "fit-content",
                marginLeft: "-130px"
              }}>
                <ArrowDropUpIcon sx={{
                  cursor: "pointer",
                  fontSize: "80px",
                  color: "black",
                  marginBottom: "-15px"
                }
                }
                  onClick={() => handleIncreate()}
                />
                <span style={{
                  fontSize: '24px',
                  color: "black",
                }}>{countLike > 0 ? " + " : ""}{countLike}</span>
                <ArrowDropDownIcon sx={{
                  cursor: "pointer",
                  fontSize: "80px",
                  color: "black",
                  marginTop: "-15px"
                }}
                  onClick={() => handleDecreate()}
                />
              </Box>
              :
              <Box sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                width: "fit-content",
                marginLeft: "-130px"
              }}>
                <ArrowDropUpIcon sx={{
                  cursor: "auto",
                  fontSize: "80px",
                  color: "rgb(155, 155, 155)",
                  marginBottom: "-15px"
                }
                }
                // onClick={() => handleIncreate()}
                />
                <span style={{
                  fontSize: '24px',
                  color: "rgb(155, 155, 155)",
                }}>{countLike > 0 ? " + " : ""}{countLike}</span>
                <ArrowDropDownIcon sx={{
                  cursor: "auto",
                  fontSize: "80px",
                  color: "rgb(155, 155, 155)",
                  marginTop: "-15px"
                }}
                // onClick={() => handleDecreate()}
                />
              </Box>
          }


          <Typography
            sx={{
              marginTop: "-100px",
              fontFamily: "Palatino",
              fontSize: "18px",
              fontWeight: "400",
              lineHeight: "32px"
            }}
          >
            {
              blog.contentHTML ?
                <div dangerouslySetInnerHTML={{ __html: blog.contentHTML }}></div>
                :
                <div>
                  {blog.content}
                </div>
            }
          </Typography>

          {userInfo && userInfo._id === blog.user_id && (
            <div style={{ marginTop: "40px" }}>
              <Link
                to={"/" + userInfo._id + "/myblog/" + blog._id + "/editblog"}
              >
                <Button color="success" variant="contained" sx={{ marginRight: "10px" }}>
                  Edit
                </Button>
              </Link>
              <Button color="error" variant="contained" onClick={handleShow}>
                Delete
              </Button>
            </div>
          )}

          <Comments
            blogId={id}
            commentsUrl="http://localhost:3004/comments"
            currentUserId={userInfo?._id}
          />
        </Box >
      }
      <Modal
        open={show}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <h2 id="parent-modal-title" style={{
            fontFamily: "IBM Plex Sans"
          }}>Delete Blog</h2>
          <p id="parent-modal-description" style={{
            color: "rgb(26, 32, 39)",
          }}>
            Are you sure do you want to delete the blog?
          </p>
          <Button color="error" variant="contained" onClick={deleteHandler} sx={{ marginRight: "10px" }}>
            Yes
          </Button>
          <Button color="success" variant="contained" onClick={handleClose}>
            No
          </Button>
          {/* <ChildModal /> */}
        </Box>
      </Modal>


    </Container>

  );
};

export default Blogpage;

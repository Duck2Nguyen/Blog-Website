import MDEditor from "@uiw/react-md-editor";
import { useEffect, useState } from "react";
import { Card, Form, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { editblog, singleblog } from "../../actions/blogaction";
import ErrorMessage from "../../components/ErrorMessage";
import Loading from "../../components/Loading";
import MainScreen from "../../components/MainScreen";
import UploadImage from "../../components/firebase/UploadImage";
import Box from "@mui/material/Box";
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import { toast } from "react-toastify";
import MdEditor from 'react-markdown-editor-lite';
import MarkdownIt from 'markdown-it';

const mdParser = new MarkdownIt(/* Markdown-it options */);

const Editblog = () => {
  const id1 = window.location.href.split("/");
  const id = id1[id1.length - 2];
  const [err, setErr] = useState("");
  const blogsingle = useSelector((state) => state.blogsingle);
  const { blog, error, loading } = blogsingle;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const blogedit = useSelector((state) => state.blogedit);
  const { success } = blogedit;
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [imageUrlFirebase, setImageUrlFirebase] = useState("");
  const [contentMarkdown, setContentMarkdown] = useState("");
  const [contentHTML, setContentHTML] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo) navigate("/");
    dispatch(singleblog(id));
    setTitle(blog.title);
    setCategory(blog.category);
    setContent(blog.content);
    setContentMarkdown(blog.contentMarkdown);
    setContentHTML(blog.contentHTML)
  }, [dispatch, id, navigate, userInfo]);

  const editHandler = (e) => {
    e.preventDefault();
    dispatch(editblog(id, title, category, content));
    if (success) {
      navigate("/" + userInfo._id + "/myblogs/" + id);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let title = data.get("title");
    let category = data.get("category");
    console.log({ imageUrlFirebase })
    dispatch(editblog(id, title, category, content, (imageUrlFirebase ? imageUrlFirebase : blog.imageUrl), contentMarkdown, contentHTML));
  };

  const handleEditorChange = ({ html, text }) => {
    setContentMarkdown(text);
    setContentHTML(html)
  }

  useEffect(() => {
    if (success) {
      toast.success("Edit blog successfully")
      navigate("/" + userInfo._id + "/myblogs/" + id);
      dispatch({ type: "CLEAR_BLOG_EDIT" });
    }
  }, [success])

  return (
    <MainScreen title="Edit Blog">
      {loading && <Loading />}
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {err && <ErrorMessage variant="danger">{err}</ErrorMessage>}
      {/* {blog && (
        <Form>
          <Form.Group className="mb-3" controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              aria-required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="category">
            <Form.Label>Category</Form.Label>
            <Form.Control
              type="text"
              aria-required
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="content">
            <Form.Label>Content</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              aria-required
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </Form.Group>
          {content && (
            <Card className="bg-light" style={{ marginBottom: "20px" }}>
              <Card.Header>Blog Preview</Card.Header>
              <Card.Body>
                <MDEditor.Markdown source={content} />
              </Card.Body>
            </Card>
          )}
          <Button
            variant="primary"
            style={{ marginBottom: "10px" }}
            onClick={handleShow}
          >
            Edit
          </Button>
        </Form>
      )} */}
      {blog && (
        <Box
          sx={{
            marginTop: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: "60%" }}>
            <label>Title</label>
            <TextField
              margin="normal"
              required
              fullWidth
              id="title"
              label="Enter the title of the blog"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              autoComplete="title"
              autoFocus
            />
            <label>Category</label>
            <TextField
              margin="normal"
              required
              fullWidth
              name="category"
              label="Enter the category of the blog"
              type="category"
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              autoComplete="category"
            />

            <label style={{ marginBottom: "10px" }}>Upload Image</label>
            <UploadImage
              setUrl={setImageUrlFirebase}
            />

            <label style={{ marginBottom: "10px" }}>Description</label>
            <textarea id="w3review" name="w3review" rows="2" cols="50"
              value={content}
              placeholder="Start your blog...."
              style={{
                width: "100%",
                padding: "15px",
                fontFamily: "Roboto",
                marginBottom: "20px"
              }}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>

            <label style={{ marginBottom: "10px" }}>Content</label>
            <div className='manage-doctor-editor'>
              <MdEditor
                style={{ height: '300px' }}
                renderHTML={text => mdParser.render(text)}
                onChange={handleEditorChange}
                value={contentMarkdown}
              />
            </div>
            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
            </Button>
          </Box>
        </Box>
      )}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit blog</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure do you want to edit the blog?</Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={editHandler}>
            Yes
          </Button>
          <Button variant="danger" onClick={handleClose}>
            No
          </Button>
        </Modal.Footer>
      </Modal>
    </MainScreen>
  );
};

export default Editblog;

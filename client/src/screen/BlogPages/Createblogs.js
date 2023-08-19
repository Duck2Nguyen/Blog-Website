import { useEffect, useState } from "react";
import { Card, Container, Form } from "react-bootstrap";
import MainScreen from "../../components/MainScreen";
import MDEditor from "@uiw/react-md-editor";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import { useNavigate } from "react-router-dom";
import { addblog, uploadImage } from "../../actions/blogaction";

import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { toast } from "react-toastify";
import MdEditor from 'react-markdown-editor-lite';
import MarkdownIt from 'markdown-it';
import 'react-markdown-editor-lite/lib/index.css';
import CommonUtils from "../../components/CommonUtils";
import { Buffer } from "buffer";

import UploadImage from "../../components/firebase/UploadImage";

const mdParser = new MarkdownIt(/* Markdown-it options */);

const Createblog = () => {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [imageBase64, setImageBase64] = useState("");

  const [imageUrlFirebase, setImageUrlFirebase] = useState("");
  const blogAdd = useSelector((state) => state.blogAdd);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const { loading, success } = blogAdd;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [contentMarkdown, setContentMarkdown] = useState("");
  const [contentHTML, setContentHTML] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let title = data.get("title");
    let category = data.get("category");
    console.log("content", content)
    console.log({ imageUrlFirebase })

    console.log({ contentMarkdown, contentHTML })
    dispatch(
      addblog(userInfo._id, userInfo.username, title, category, content, imageUrlFirebase, contentMarkdown, contentHTML)
    );
  };

  useEffect(() => {
    if (success) {
      toast.success("Blog added successfully")
      navigate("/" + userInfo._id + "/myblogs");
      dispatch({ type: "CLEAR_BLOG_ADD" });
    }
  }, [userInfo, success, navigate]);

  const handleEditorChange = ({ html, text }) => {
    setContentMarkdown(text);
    setContentHTML(html)
  }

  return (
    <MainScreen title="Create Blog">

      <Container>
        {loading && <Loading />}
        {success === false && (
          <ErrorMessage variant="danger">
            Blog not added! Try again!
          </ErrorMessage>
        )}
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
              autoComplete="category"
              sx={{ mb: 3 }}
            />

            <label style={{ marginBottom: "10px" }}>Upload Image</label>
            <UploadImage
              setUrl={setImageUrlFirebase}
            />
            <label style={{ marginBottom: "10px" }}>Description</label>
            <textarea id="w3review" name="w3review" rows="2" cols="50"
              placeholder="Write description about your blog...."
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

            {/* <div dangerouslySetInnerHTML={{ __html: contentHTML }}></div> */}

            {/* {content && (
              <Card className="bg-light" style={{ marginBottom: "20px", marginTop: "20px" }}>
                <Card.Header>Blog Preview</Card.Header>
                <Card.Body>
                  <MDEditor.Markdown source={content} />
                </Card.Body>
              </Card>
            )} */}
            <Button
              type="submit"
              variant="contained"
              sx={{
                mt: 3, mb: 2,
                borderTopLeftRadius: "1px",
                borderTopRightRadius: "1px",
                borderBottomRightRadius: "1px",
                borderBottomLeftRadius: "1px",
              }}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Container>
    </MainScreen>
  );
};

export default Createblog;

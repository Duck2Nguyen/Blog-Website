import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { listallblog } from "../../actions/blogaction";
import ErrorMessage from "../../components/ErrorMessage";
import Loading from "../../components/Loading";
import MainScreen from "../../components/MainScreen";

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';


import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

// import { io } from "socket.io-client";

// const socketIO = io();


const Allblogs = () => {
    // get blogs
    const blogAll = useSelector((state) => state.blogAll);
    const { blog, error, loading } = blogAll;
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(listallblog());
    }, [dispatch]);

    const [inputType, setInputType] = useState("title");
    const [inputValue, setInputValue] = useState('');
    const [arraySearchBlogs, setArraySearchBlogs] = useState('');

    //handle search
    const handleChangeType = (event) => {
        setInputType(event.target.value);
    };

    const handleOnChangeInput = (e) => {
        if (!e.target.value) {
            setArraySearchBlogs()
        }
        setInputValue(e.target.value)
    }

    const handleSearch = () => {
        handleSearchValue(inputType, inputValue)
    }
    const handleKeyPress = (e) => {
        if (e.charCode === 13) {
            e.preventDefault(); // Ensure it is only this code that runs
            handleSearch()
        }
    }
    const handleSearchValue = (type, value) => {
        let arrayBlogs = [];
        if (type === "author") {
            blog.forEach((b) => {
                if (b.username.includes(value)) {
                    arrayBlogs.push(b)
                }
            })
        }
        else if (type === "title") {
            blog.forEach((b) => {
                if (b.title.includes(value)) {
                    arrayBlogs.push(b)
                }
            })
        }
        else if (type === "category") {
            blog.forEach((b) => {
                if (b.category.includes(value)) {
                    arrayBlogs.push(b)
                }
            })
        }
        else if (type === "content") {
            blog.forEach((b) => {
                if (b.content.includes(value)) {
                    arrayBlogs.push(b)
                }
            })
        }
        if (arrayBlogs.length === 0) {
            setArraySearchBlogs("empty")
        }
        setArraySearchBlogs([...arrayBlogs])
    }

    // //handle socket io
    // useEffect(() => {
    //     console.log("socketIO", socketIO);

    //     socketIO.on('messageFromUserId', (message) => {
    //         console.log(`⚡: ${message} nè`);
    //     })
    //     userInfo?._id && socketIO.emit('registerUser', {
    //         userId: userInfo._id,
    //         message: "notification"
    //     });
    // }, [])

    return (
        <MainScreen>
            {loading && <Loading />}
            {error && <ErrorMessage varient="danger">{error}</ErrorMessage>}
            <Box fullWidth sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                mb: "50px"
            }}>
                <Paper
                    component="form"
                    sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 600 }}
                >
                    <FormControl sx={{
                        minWidth: 120,
                        width: "10%",
                        border: "none",
                        outline: "none",
                    }}>
                        <InputLabel id="demo-simple-select-label">Bộ lọc</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={inputType}
                            label="Bộ lọc"
                            onChange={handleChangeType}
                            sx={{
                                border: "none",
                                height: "50px",
                                border: "none",
                                outline: "none",
                            }}
                        >
                            <MenuItem value="author">Tác giả</MenuItem>
                            <MenuItem value="title">Tiêu đề</MenuItem>
                            <MenuItem value="category">Thể loại</MenuItem>
                            <MenuItem value="content">Nội dung</MenuItem>
                        </Select>
                    </FormControl>
                    <InputBase
                        sx={{
                            ml: 1, flex: 1
                        }}
                        placeholder="Nhập vào từ khóa tìm kiếm"
                        inputProps={{ 'aria-label': 'search google maps' }}
                        onChange={handleOnChangeInput}
                        onKeyPress={(e) => handleKeyPress(e)}
                    />
                    <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={handleSearch}>
                        <SearchIcon />
                    </IconButton>
                    <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                </Paper>
            </Box>

            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                }}
            >
                {blog && arraySearchBlogs !== "empty" && !arraySearchBlogs ? (
                    blog.map((b, index) => (
                        <Card sx={{
                            width: "20vw",
                            mr: 2,
                            mb: 3
                        }} key={index}>
                            <CardMedia
                                sx={{ height: 140 }}
                                image={`${b.imageUrl ? b.imageUrl : "https://png.pngtree.com/background/20230519/original/pngtree-iguanas-are-green-and-have-very-distinctive-coloring-picture-image_2660372.jpg"}`}
                                title="green iguana"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div"
                                    sx={{
                                        whiteSpace: "nowrap",
                                        width: "calc(100vw-20)",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                    }}
                                >
                                    {b.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary"
                                    sx={{
                                        whiteSpace: "wrap",
                                        height: "80px",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                    }}
                                >
                                    {b.content}
                                </Typography>
                            </CardContent>
                            <CardActions sx={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between"
                            }}>
                                <Typography
                                    sx={{
                                        fontSize: "15px",
                                        marginRight: "10px",
                                        color: "rgba(0, 0, 0, 0.6)",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                    }}
                                >
                                    Created by {b.username}
                                </Typography>
                                <Button size="small">
                                    <Link
                                        to={"/allblogs/" + b._id}
                                        style={{
                                            textDecoration: "none",
                                            fontWeight: "500",
                                            color: "rgb(25, 118, 210)"
                                        }}
                                        key={b._id}
                                    >
                                        Learn more
                                    </Link>
                                </Button>
                            </CardActions>
                        </Card>
                    ))
                ) :
                    (
                        arraySearchBlogs ? (
                            arraySearchBlogs.map((b, index) => (
                                <Card sx={{
                                    width: "20vw",
                                    mr: 2,
                                    mb: 3
                                }} key={index}>
                                    <CardMedia
                                        sx={{ height: 140 }}
                                        image={`${b.imageUrl ? b.imageUrl : "https://png.pngtree.com/background/20230519/original/pngtree-iguanas-are-green-and-have-very-distinctive-coloring-picture-image_2660372.jpg"}`}
                                        title="green iguana"
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div"
                                            sx={{
                                                whiteSpace: "nowrap",
                                                width: "calc(100vw-20)",
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                            }}
                                        >
                                            {b.title}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary"
                                            sx={{
                                                whiteSpace: "wrap",
                                                height: "80px",
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                            }}
                                        >
                                            {b.content}
                                        </Typography>
                                    </CardContent>
                                    <CardActions sx={{
                                        display: "flex",
                                        flexDirection: "row",
                                        justifyContent: "space-between"
                                    }}>
                                        <Typography
                                            sx={{
                                                fontSize: "15px",
                                                marginRight: "10px",
                                                color: "rgba(0, 0, 0, 0.6)",
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                            }}
                                        >
                                            Created by {b.username}
                                        </Typography>
                                        <Button size="small">
                                            <Link
                                                to={"/allblogs/" + b._id}
                                                style={{
                                                    textDecoration: "none",
                                                    fontWeight: "500",
                                                    color: "rgb(25, 118, 210)"
                                                }}
                                                key={b._id}
                                            >
                                                Learn more
                                            </Link>
                                        </Button>
                                    </CardActions>
                                </Card>
                            ))
                        ) :
                            (
                                <p>No blogs to display!!</p>
                            )
                    )}
            </Box>
        </MainScreen >
    );
};

export default Allblogs;

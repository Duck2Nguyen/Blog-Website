import { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/useraction";

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Logo from "../screen/img/logo.png";

import Badge from '@mui/material/Badge';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

import { io } from "socket.io-client";

const socketIO = io();

const Header = () => {
    const [showNoti, setShowNoti] = useState(false);
    const arrayMessages = useRef([]);
    const [numNoti, setNumNoti] = useState(0);
    const userLogin = useSelector((state) => state.userLogin);
    const [anchorEl, setAnchorEl] = useState(false);
    const { userInfo } = userLogin;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        setAnchorEl(null);
    }, [userInfo]);

    const logoutHandler = () => {
        dispatch(logout());
        navigate("/");
    };


    //handle socket io
    useEffect(() => {
        console.log("socketIO", socketIO);
        userInfo?._id && socketIO.emit('registerUser', {
            userId: userInfo._id,
            message: "notification"
        });
    }, [])

    useEffect(() => {
        socketIO.on('messageFromUserId', (message) => {
            console.log(JSON.parse(message));
            let array = [...arrayMessages.current]
            array.push(JSON.parse(message))
            arrayMessages.current = [...array]
            setNumNoti(prev => prev + 1)
        })
    }, [])

    const handleViewAll = () => {
        arrayMessages.current = [];
        setShowNoti(prev => false)
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h5" component="div"
                        sx={{ flexGrow: 1 }}
                    >
                        <Link to="/"
                            style={{
                                textDecoration: "none",
                                color: "white"
                            }}
                        > <img src={Logo} style={{
                            height: "50px"
                        }}></img></Link>
                    </Typography>
                    <Button color="inherit"
                        sx={{
                            my: 2, color: 'white', display: 'block',
                            textTransform: "None !important",
                            fontSize: "16px"
                        }}
                    >
                        <Link to="/allblogs"
                            style={{
                                textDecoration: "none",
                                color: "white"
                            }}
                        >All Blogs</Link>
                    </Button>


                    {userInfo ? (
                        <>
                            <Button color="inherit"
                                sx={{
                                    my: 2, color: 'white', display: 'block',
                                    textTransform: "None !important",
                                    fontSize: "16px"
                                }}
                            >
                                <Link
                                    to={"/" + userInfo._id + "/myblogs"}
                                    style={{
                                        textDecoration: "none",
                                        color: "white"
                                    }}
                                >
                                    My Blogs
                                </Link>
                            </Button>
                            <Box sx={{ color: 'white', mx: 1, cursor: "pointer" }} onClick={() => setShowNoti(true)} onMouseEnter={() => setShowNoti(false)}>
                                <Badge color="secondary" badgeContent={arrayMessages.current.length}>
                                    <NotificationsActiveIcon />
                                </Badge>
                            </Box>
                        </>

                    ) : (
                        <>
                            <Button color="inherit"
                                sx={{ textTransform: "None !important" }}
                            >
                                <Link to="/login"
                                    style={{
                                        textDecoration: "none",
                                        color: "white",
                                        fontSize: "16px"
                                    }}
                                >Sign in</Link>
                            </Button>
                            <Button color="inherit"
                                sx={{ textTransform: "None !important" }}
                            >
                                <Link to="/register"
                                    style={{
                                        textDecoration: "none",
                                        color: "white",
                                        fontSize: "16px"
                                    }}
                                >Sign up</Link>
                            </Button>
                        </>

                    )}

                    {userInfo && (
                        <div>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                                sx={{ fontSize: "16px" }}
                            >
                                <AccountCircle sx={{ fontSize: "28px" }} />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleClose}
                                >
                                    <Link to={"/" + userInfo._id}
                                        style={{ textDecoration: "none" }}
                                    >Profile</Link>
                                </MenuItem>
                                <MenuItem onClick={logoutHandler}>Logout</MenuItem>
                            </Menu>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
            <div className={`thongbao ${showNoti ? "" : "hidden"}`} onMouseLeave={() => setShowNoti(false)}>
                <div className="titlethongbao">
                    <span className="titlecustom">Thông báo mới nhận</span>
                </div>
                {arrayMessages.current && arrayMessages.current.length > 0
                    &&
                    arrayMessages.current.map((item, index) => {
                        return (
                            <a href={`/allblogs/${item.urlId}`} className="sanpham chocaivientrendau" key={index}>
                                <span className="chucuaanh">
                                    <p className="dong1chuanh">{item.message}</p>
                                </span>
                            </a>
                        )
                    })
                }

                {arrayMessages.current && arrayMessages.current.length === 0
                    &&
                    <div className="sanpham chocaivientrendau empty-box">
                        <div className="empty">
                            Không có thông báo mới
                        </div>
                    </div>
                }

                {arrayMessages.current && arrayMessages.current.length > 0
                    &&
                    <div class="xemtatca">
                        <span class="xemtatcachu" onClick={handleViewAll}>Xem tất cả</span>
                    </div>
                }

            </div>
        </Box >
    );
};

export default Header;

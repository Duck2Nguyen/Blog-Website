import { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import MainScreen from "../../components/MainScreen";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../actions/useraction";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Link } from "react-router-dom";

import LoginGG from "./LoginGG";

const LoginPages2 = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userLogin = useSelector((state) => state.userLogin);
    const { loading, error, userInfo } = userLogin;

    useEffect(() => {
        if (userInfo) navigate("/" + userInfo._id + "/myblogs");
    }, [navigate, userInfo]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        dispatch(login(data.get("username"), data.get("password")));
    };
    return (
        <MainScreen>
            <Container>
                <Row>
                    {loading && <Loading />}
                    {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
                    <Container component="main" maxWidth="xs">
                        <Box
                            sx={{
                                marginTop: 8,
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                            }}
                        >
                            <Typography component="h1" variant="h5">
                                Sign in
                            </Typography>
                            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="username"
                                    label="Username"
                                    name="username"
                                    autoComplete="username"
                                    autoFocus
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                />
                                <FormControlLabel
                                    control={<Checkbox value="remember" color="primary" />}
                                    label="Remember me"
                                />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Sign In
                                </Button>
                                <Grid container>
                                    {/* <Grid item xs>
                                        <Link to="#">
                                            Forgot password?
                                        </Link>
                                    </Grid> */}
                                    <Grid item>
                                        <Link to="/register">
                                            {"Don't have an account? Sign Up"}
                                        </Link>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Box>
                    </Container>
                </Row>
            </Container>
        </MainScreen>
    );
};

export default LoginPages2;

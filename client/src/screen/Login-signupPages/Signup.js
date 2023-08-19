import { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import MainScreen from "../../components/MainScreen";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signup } from "../../actions/useraction";
import Loading from "../../components/Loading";
import validator from "validator";
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
import { toast } from "react-toastify";

const Signup2 = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userSignup = useSelector((state) => state.userSignup);
    const { loading, error, userInfo } = userSignup;
    useEffect(() => {
        if (userInfo) {
            // alert("Registered Successfully!! Log in to explore more!");
            toast.success("Registered Successfully!!")
            navigate("/login");
        }
    }, [navigate, userInfo]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const username = data.get("username")
        const email = data.get("email")
        const password = data.get("password")
        const cpassword = data.get("cpassword")
        if (
            validator.isStrongPassword(password, {
                minLength: 6,
                minLowercase: 1,
                minUppercase: 1,
                minNumbers: 1,
                minSymbols: 1,
            }) &&
            password === cpassword
        ) {
            dispatch(signup(username, email, password));
        }
        else {
            toast.error("Registered faild !! Password must include symbol, lowercase, uppercase,number and length >6")
        }

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
                                Sign up
                            </Typography>
                            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email address"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                />
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
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="cpassword"
                                    label="Confirm-Password"
                                    type="password"
                                    id="cpassword"
                                    autoComplete="comfirm password"
                                />
                                <FormControlLabel
                                    control={<Checkbox value="remember" color="primary" />}
                                    label="I want to receive inspiration, marketing promotions and updates via email."
                                />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Sign Up
                                </Button>
                                <Grid container>
                                    <Grid item>
                                        <Link to="/login">
                                            Already have account? |  Login
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

export default Signup2;

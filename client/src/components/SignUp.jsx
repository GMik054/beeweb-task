import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {createUserWithEmailAndPassword} from "firebase/auth";
import {auth} from "../config/firebase-config";
import {Route, Routes, Link} from "react-router-dom";
import SignIn from "./SignIn";
import {selectItem, setEmail, setPassword} from "../redux/loginRegister";
import {useDispatch, useSelector} from "react-redux";
import * as Yup from "yup";
import {useFormik} from "formik";
import {useEffect, useState} from "react";

const theme = createTheme();
export default function SignUp() {

    const items = useSelector(selectItem)
    const dispatch = useDispatch()

    let [error, setError] = useState(false);


    const register = async (e) => {
        e.preventDefault()
        try {
            setError(false)
            const us = await createUserWithEmailAndPassword(auth, items.email, items.password)
            console.log(us, "US")
        } catch (error) {
            console.log(error.message)
            setError(true)
        }
    }


    const initialValues = {
        email: "",
        password: ""
    }

    const validationSchema = Yup.object({
        email: Yup.string().email("Invalid format").required("Required"),
        password: Yup.string()
            .required('No password provided.')
            .min(6, 'Password is too short - should be 6 chars minimum.')
    })

    const formik = useFormik({
        initialValues,
        validationSchema,
    })

    useEffect(() => {
        dispatch(setEmail(formik.values.email))
        dispatch(setPassword(formik.values.password))
    }, [formik.values])

    return (


        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign Up
                    </Typography>
                    <Box noValidate sx={{mt: 1}}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label={`${formik.touched.email && formik.errors.email ? `${formik.errors.email} Email` : "Email Address"}`}
                            name="email"
                            autoComplete="email"
                            autoFocus
                            // onChange={(e) => dispatch(setEmail(e.target.value))}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label={`${formik.touched.password && formik.errors.password ? formik.errors.password : "Password"}`}
                            type="password"
                            autoComplete="current-password"
                            // onChange={(e) => dispatch(setPassword(e.target.value))}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                        />
                        <div style={{color: "red"}}>{error ? "This email is already taken" : ""}</div>

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                            onClick={Object.keys(formik.errors).length === 0 ? register : null}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="center">
                            <Grid item >
                                <Link to="/sign-in">
                                    {"You have account ? Sign In"}
                                </Link>
                                <Routes>
                                    <Route path="/sign-in" element={<SignIn/>}/>
                                </Routes>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>


    );
}
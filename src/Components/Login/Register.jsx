import React, { useState } from "react";
import "./Login.css";
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import TextsmsIcon from '@mui/icons-material/Textsms';
import { Form, Formik, Field, ErrorMessage } from "formik";
import EmailIcon from "@mui/icons-material/Email";
import PinIcon from '@mui/icons-material/Pin';
import PersonIcon from '@mui/icons-material/Person';
import * as Yup from "yup";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { login } from "../../redux/reducers/user";
import { notification } from 'antd';

import { useDispatch, useSelector } from "react-redux";

const Register = ({ setRegister }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isEmailValid = (email) => {
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        return emailRegex.test(email);
    };

    const [showPassword, setShowPassword] = useState(false);
    const [branch, setBranch] = useState('');
    const [year, setYear] = useState('');
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const initialValues = {
        name: '',
        rollNumber: '',
        phoneNumber: '',
        email: '',
        password: '',
        confirmPassword: ''
    };

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .test("is-valid-email", "Please enter a valid email address", (value) => {
                return isEmailValid(value);
            })
            .required("Email is required"),
        password: Yup.string().required("Password is Required"),
    });

    const handleLogin = async (values, { setSubmitting }) => {
        console.log("63::", values);
        const { name,
            phoneNumber,
            rollNumber,
            email,
            password,
            confirmPassword } = values
        if (name && rollNumber && email && password && confirmPassword && phoneNumber && branch && year) {
            if (password === confirmPassword) {
                try {
                    // const response = await axios.post("http://localhost:3000/auth/update-password", {
                    //     email: values.email,
                    //     otp: values.verificationCode,
                    //     newpassword: values.password,
                    // });
                    const response = await axios.post("http://localhost:3000/auth/register", {
                            name: values.name,
                            email: values.email,
                            rollnumber: values.rollNumber,
                            password: values.password,
                            phone: values.phoneNumber,
                            gender: "male",
                            year: "2",
                            semister: "5",
                            role:"student", //admin or student
                            token:""
                    });
                    if (response?.status === 200) {
                        // console.log('82::', response)
                        setRegister(false);
                        dispatch(login(response.data));
                        navigate("/login");
                    }
                } catch (error) {
                    console.error("Login failed::", error);
                    const key = `open${Date.now()}`;
                    notification.error({
                        message: "",
                        description: error?.response?.data?.message || 'Something went wrong',
                        key,
                        duration: 4,
                    });
                }
            } else {
                const key = `open${Date.now()}`;
                notification.error({
                    message: "Error",
                    description: "Password and confirm password are not equal.",
                    key,
                    duration: 4,
                });
            }
        } else {
            const key = `open${Date.now()}`;
            notification.error({
                message: "Error",
                description: "Please fill all the required fields",
                key,
                duration: 4,
            });
        }
    };

    return (
        <Grid className="Background">
            <div className={`container`}>
                <div className="head">
                    <div className="main">Register</div>
                    <div className="underline"></div>
                </div>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleLogin}
                >
                    {(props) => (
                        <Form>
                            <div className="inputs">
                                <div className="two-feilds">
                                    <div className="input">
                                        <Field
                                            as={TextField}
                                            fullWidth
                                            label="Name"
                                            name="name"
                                            variant="outlined"
                                            className="text"
                                            type={"text"}
                                            required
                                        />
                                    </div>
                                    <div className="input">
                                        <Field
                                            as={TextField}
                                            fullWidth
                                            label="Roll Number"
                                            name="rollNumber"
                                            variant="outlined"
                                            className="text"
                                            type={"text"}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="two-feilds">
                                    <div className="input">
                                        <FormControl style={{ minWidth: 240, marginRight: 16 }}>
                                            <InputLabel id="subject-select-label">Branch</InputLabel>
                                            <Select
                                                labelId="subject-select-label"
                                                id="subject-select"
                                                value={branch}
                                                label="Branch"
                                                onChange={(e) => setBranch(e.target.value)}
                                            >
                                                <MenuItem value="CSE">CSE</MenuItem>
                                                <MenuItem value="MEC">MEC</MenuItem>
                                                <MenuItem value="EEE">EEE</MenuItem>
                                                <MenuItem value="ECE">ECE</MenuItem>
                                                <MenuItem value="CIVIL">CIVIL</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </div>
                                    <div className="input">
                                        <FormControl style={{ minWidth: 240, marginRight: 16 }}>
                                            <InputLabel id="subject-select-label">Year-Semester</InputLabel>
                                            <Select
                                                labelId="subject-select-label"
                                                id="subject-select"
                                                value={year}
                                                label="year"
                                                onChange={(e) => setYear(e.target.value)}
                                            >
                                                <MenuItem value="1-1">1 Year - 1 semester</MenuItem>
                                                <MenuItem value="1-2">1 Year - 2 semester</MenuItem>
                                                <MenuItem value="2-1">2 Year - 1 semester</MenuItem>
                                                <MenuItem value="2-2">2 Year - 2 semester</MenuItem>
                                                <MenuItem value="3-1">3 Year - 1 semester</MenuItem>
                                                <MenuItem value="3-2">3 Year - 2 semester</MenuItem>
                                                <MenuItem value="4-1">4 Year - 1 semester</MenuItem>
                                                <MenuItem value="4-2">4 Year - 2 semester</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </div>
                                </div>
                                <div className="two-feilds">
                                    <div className="input">
                                        <Field
                                            as={TextField}
                                            fullWidth
                                            label="Phone Number"
                                            name="phoneNumber"
                                            variant="outlined"
                                            className="text"
                                            type={"text"}
                                            required
                                        />
                                    </div>
                                    <div className="input">
                                        <Field
                                            as={TextField}
                                            fullWidth
                                            label="Email"
                                            name="email"
                                            variant="outlined"
                                            className="text"
                                            type={"text"}
                                            required
                                            helperText={<ErrorMessage name="email" />}
                                        />
                                    </div>
                                </div>
                                <div className="two-feilds">
                                    <div className="input">
                                        <Field
                                            as={TextField}
                                            fullWidth
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton onClick={() => {
                                                            setShowPassword((prev) => !prev);
                                                        }}>
                                                            {showPassword ? (
                                                                <VisibilityIcon />
                                                            ) : (
                                                                <VisibilityOffIcon />
                                                            )}
                                                        </IconButton>
                                                    </InputAdornment>
                                                ),
                                            }}
                                            label="New Password"
                                            name="password"
                                            variant="outlined"
                                            className="text"
                                            type={showPassword ? "text" : "password"}
                                            required
                                        />
                                    </div>
                                    <div className="input">
                                        <Field
                                            as={TextField}
                                            fullWidth
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton onClick={() => {
                                                            setShowConfirmPassword((prev) => !prev);
                                                        }}>
                                                            {showConfirmPassword ? (
                                                                <VisibilityIcon />
                                                            ) : (
                                                                <VisibilityOffIcon />
                                                            )}
                                                        </IconButton>
                                                    </InputAdornment>
                                                ),
                                            }}
                                            label="Confirm Password"
                                            name="confirmPassword"
                                            variant="outlined"
                                            className="text"
                                            type={showConfirmPassword ? "text" : "password"}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="submit-container">
                                <Button
                                    onClick={() => {
                                        handleLogin(props.values, props);
                                    }}
                                    className="custom-button"
                                    variant="contained"
                                    disabled={props.isSubmitting}
                                    style={{
                                        width: "220px",
                                        height: "59px",
                                        color: "#fff",
                                        backgroundColor: props.isSubmitting ? "#aaa" : "#63cb77",
                                        borderRadius: "50px",
                                        fontSize: "19px",
                                        fontWeight: 700,
                                        cursor: "pointer",
                                        outline: "none",
                                        border: "none",
                                    }}
                                >
                                    {props.isSubmitting ? "Loading" : "Submit"}
                                </Button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </Grid>
    );
};
export default Register;

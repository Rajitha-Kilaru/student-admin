import React, { useState } from "react";
import "./Login.css";
import { Button, Grid, TextField } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import { Form, Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import axios from "../../api";
import { useNavigate } from "react-router-dom";
import { login } from "../../redux/reducers/user";
import { useDispatch, useSelector } from "react-redux";
import { notification } from 'antd';
import Register from "./Register";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.user?.data?.user);
  // console.log('20:: login', user)
  const isEmailValid = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const [showPassword, setShowPassword] = useState(false);
  const [register, setRegister] = useState(false);
  const handlePasswordVisibilityToggle = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const initialValues = {
    email: "",
    password: "",
  };
  // const PasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/;
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .test("is-valid-email", "Please enter a valid email address", (value) => {
        return isEmailValid(value);
      })
      .required("Email is required"),
    password: Yup.string().required('Password is required')
    // .matches(PasswordRegex,"Invalid Password")
  });

  const handleLogin = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post("/auth/login", {
        email: values.email,
        password: values.password,
      });
      if (response.status === 200) {
        dispatch(login(response.data));
                navigate("/");
      }
    } catch (error) {
      console.error("Login failed:", error);
      const key = `open${Date.now()}`;
      notification.error({
        message: "Login failed",
        description: error?.response?.data?.message || 'Something went wrong',
        key,
        duration: 4,
      });
    }
  };
  return (
    <Grid className="Background">
      {!register ? <div className={`container`}>
        <div className="head">
          <div className="main">Login</div>
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
                  <div className="input">
                    <Field
                      as={TextField}
                      fullWidth
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <IconButton className="icon-button">
                              <EmailIcon />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      label="Email"
                      name="email"
                      variant="outlined"
                      className="text "
                      required
                      helperText={<ErrorMessage name="email" />}
                    />
                  </div>
                  <div className="input">
                    <Field
                      as={TextField}
                      fullWidth
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <IconButton className="icon-button">
                              <LockIcon />
                            </IconButton>
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={handlePasswordVisibilityToggle}>
                              {showPassword ? (
                                <VisibilityIcon />
                              ) : (
                                <VisibilityOffIcon />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      label="Password"
                      name="password"
                      variant="outlined"
                      className="text"
                      type={showPassword ? "text" : "password"}
                      required
                      helperText={<ErrorMessage name="password" />}
                    />
                  </div>
              </div>
              <div className="forgot-password">
                Don't have an account ?<Button variant="text" onClick={() => setRegister(true)}>Register Here!</Button>
              </div>
              <div className="submit-container">
                <Button
                  type="submit"
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
                  {props.isSubmitting ? "Loading" : "Login"}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div> : <Register setRegister={setRegister} />}
    </Grid>
  );
};
export default Login;

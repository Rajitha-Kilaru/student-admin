import React, { useState } from "react";
import "./Login.css";
import { Button, TextField } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import { Form, Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const ChangePassword = () => {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);


  const initialValues = {
    oldpassword: "",
    password: "",
    confirmPassword: "",
  };
  const validationSchema = Yup.object().shape({
    oldpassword: Yup.string().required("old Password is Required"),
    password: Yup.string().required("Password is Required"),
    confirmPassword: Yup.string().required("Confirm Password is Required").oneOf([Yup.ref('password'), null], 'Passwords must match'),
  });

  const handleLogin = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post("http://localhost:5056/auth/change-password", {
        oldPassword: values['old-password'],
        password: values.password,
      }, {
        headers: {
          'x-auth-token': (new URLSearchParams(window.location.search)).get('token')
        }
      });

    } catch (error) {
      console.error("Login failed:", error);
    }
  };
  return (
    <main className="main-container">
      <div className={`container change-password`}>
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
                            <LockIcon />
                          </IconButton>
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={() => {
                            setShowOldPassword((prev) => !prev);
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
                    label="Old Password"
                    name="oldpassword"
                    variant="outlined"
                    className="text"
                    type={showOldPassword ? "text" : "password"}
                    required
                    helperText={<ErrorMessage name="oldpassword" />}
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
                    helperText={<ErrorMessage name="password" />}
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
                          <IconButton onClick={() => {
                            setShowConfirmPassword((prev) => !prev);
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
                    label="Confirm Password"
                    name="confirmPassword"
                    variant="outlined"
                    className="text"
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    helperText={<ErrorMessage name="confirmPassword" />}
                  />
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
    </main>
  );
};
export default ChangePassword;
